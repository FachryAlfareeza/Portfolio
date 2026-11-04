import { writeFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const USERNAME = "FachryAlfareeza";
// Public default-branch contributions (commits + PRs + issues + reviews).
const CALENDAR_URL = `https://github-contributions-api.jogruber.de/v4/${USERNAME}?y=last`;
const API = "https://api.github.com";
const __dirname = dirname(fileURLToPath(import.meta.url));
const OUT_PATH = join(__dirname, "..", "src", "content", "github-contributions.json");

// Optional. With a token the sync also covers private repos:
//   classic token -> "repo" scope; fine-grained -> Contents (read) + Metadata (read).
// Read from the environment only -- never written to disk or logged.
const TOKEN = process.env.GITHUB_TOKEN || process.env.GH_TOKEN || "";

const HEADERS = {
  Accept: "application/vnd.github+json",
  "User-Agent": "portfolio-sync",
  ...(TOKEN ? { Authorization: `Bearer ${TOKEN}` } : {}),
};

async function gh(path) {
  const res = await fetch(`${API}${path}`, { headers: HEADERS });
  if (!res.ok) {
    const hint =
      res.status === 401 || res.status === 403 || res.status === 429
        ? " (check GITHUB_TOKEN / rate limit)"
        : "";
    throw new Error(`GitHub API ${res.status} on ${path}${hint}`);
  }
  return res.json();
}

async function fetchPage(path) {
  const json = await gh(path);
  return Array.isArray(json) ? json : (json.items ?? []);
}

// Authenticated calendar. Unlike the public graph, this includes contributions
// to private repos the token can see.
async function fetchGraphqlCalendar(from, to) {
  const query = `
    query Calendar($login: String!, $from: DateTime!, $to: DateTime!) {
      user(login: $login) {
        contributionsCollection(from: $from, to: $to) {
          contributionCalendar {
            weeks {
              contributionDays {
                date
                contributionCount
              }
            }
          }
        }
      }
    }
  `;

  const res = await fetch(`${API}/graphql`, {
    method: "POST",
    headers: { ...HEADERS, "Content-Type": "application/json" },
    body: JSON.stringify({ query, variables: { login: USERNAME, from: from.toISOString(), to: to.toISOString() } }),
  });
  if (!res.ok) {
    throw new Error(`GitHub GraphQL ${res.status} (check that GITHUB_TOKEN can read the user calendar)`);
  }

  const json = await res.json();
  if (json.errors?.length) {
    throw new Error(`GitHub GraphQL: ${json.errors.map((e) => e.message).join("; ")}`);
  }

  const collection = json.data?.user?.contributionsCollection;
  const fromDay = from.toISOString().slice(0, 10);
  const toDay = to.toISOString().slice(0, 10);
  const contributions = (collection?.contributionCalendar?.weeks ?? [])
    .flatMap((week) => week.contributionDays)
    .filter((day) => day.date >= fromDay && day.date <= toDay)
    .sort((a, b) => a.date.localeCompare(b.date))
    .map((day) => ({ date: day.date, count: day.contributionCount }));

  if (contributions.length === 0) {
    throw new Error("GitHub GraphQL returned an empty calendar");
  }

  return {
    contributions,
    source: "GitHub GraphQL (public + private repos)",
  };
}

async function fetchPublicCalendar() {
  const res = await fetch(CALENDAR_URL);
  if (!res.ok) {
    throw new Error(`Failed to fetch GitHub contributions (${res.status})`);
  }
  const json = await res.json();
  const contributions = (json.contributions ?? []).map((day) => ({ date: day.date, count: day.count }));
  if (contributions.length === 0) {
    throw new Error("Public contributions API returned an empty calendar");
  }
  return { contributions, source: "public contributions API (public repos only)" };
}

// Commits authored by the user on one ref, keyed by sha -> day. The API returns
// the commit date with its original UTC offset, so slicing the date keeps the
// commit attributed to the day the author actually worked in.
async function fetchRefCommits(repo, ref, since) {
  const commits = new Map();
  for (let page = 1; page <= 5; page++) {
    const list = await fetchPage(
      `/repos/${repo}/commits?sha=${encodeURIComponent(ref)}&author=${USERNAME}&since=${since}&per_page=100&page=${page}`
    );
    for (const commit of list) {
      commits.set(commit.sha, commit.commit.author.date.slice(0, 10));
    }
    if (list.length < 100) break;
  }
  return commits;
}

// Commits pushed to branches other than each repo's default branch. The
// calendar above only counts the default branch, so these are what we add.
async function fetchBranchCommits(since) {
  const perDay = new Map(); // date -> Set of shas
  const counted = new Set(); // dedupe across branches and repos

  // Authenticated calls list private repos too.
  const repoPath = TOKEN
    ? "/user/repos?affiliation=owner&visibility=all"
    : `/users/${USERNAME}/repos?type=owner`;

  const repos = [];
  for (let page = 1; page <= 5; page++) {
    const list = await fetchPage(`${repoPath}&per_page=100&page=${page}`);
    repos.push(...list);
    if (list.length < 100) break;
  }

  const visibility = {
    public: repos.filter((repo) => !repo.private).length,
    private: repos.filter((repo) => repo.private).length,
  };

  for (const repo of repos) {
    const branches = await fetchPage(`/repos/${repo.full_name}/branches?per_page=100`);
    if (branches.length === 0) continue;

    // Commits that also live on the default branch are already in the calendar.
    const onDefaultBranch = new Set(
      (await fetchRefCommits(repo.full_name, repo.default_branch, since)).keys()
    );

    for (const branch of branches) {
      if (branch.name === repo.default_branch) continue;
      const commits = await fetchRefCommits(repo.full_name, branch.name, since);
      for (const [sha, date] of commits) {
        if (onDefaultBranch.has(sha) || counted.has(sha)) continue;
        counted.add(sha);
        if (!perDay.has(date)) perDay.set(date, new Set());
        perDay.get(date).add(sha);
      }
    }
  }

  return { perDay, visibility };
}

// GitHub grades each day in quartiles of the year's non-zero daily counts, so
// levels are recomputed here after the branch commits are merged in.
function makeLevelFor(contributions) {
  const nonzero = contributions
    .map((day) => day.count)
    .filter((count) => count > 0)
    .sort((a, b) => a - b);
  if (nonzero.length === 0) return () => 0;

  const percentile = (p) => {
    const index = (nonzero.length - 1) * p;
    const low = Math.floor(index);
    const high = Math.ceil(index);
    return nonzero[low] + (nonzero[high] - nonzero[low]) * (index - low);
  };
  const [q1, q2, q3] = [0.25, 0.5, 0.75].map(percentile);

  return (count) => {
    if (count === 0) return 0;
    if (count <= q1) return 1;
    if (count <= q2) return 2;
    if (count <= q3) return 3;
    return 4;
  };
}

async function main() {
  const to = new Date();
  const from = new Date(to.getTime() - 365 * 24 * 60 * 60 * 1000);

  const calendar = TOKEN ? await fetchGraphqlCalendar(from, to) : await fetchPublicCalendar();
  const counts = new Map(calendar.contributions.map((day) => [day.date, day.count]));

  console.log(
    `Calendar: ${calendar.source} ` +
      `(${calendar.contributions[0].date}..${calendar.contributions[calendar.contributions.length - 1].date})`
  );

  // Fatal on purpose: writing a calendar-only snapshot would silently drop the
  // non-default-branch commits that a previous run managed to collect.
  let branchCommits = 0;
  const since = `${calendar.contributions[0].date}T00:00:00Z`;
  const { perDay, visibility } = await fetchBranchCommits(since);
  for (const [date, shas] of perDay) {
    if (!counts.has(date)) continue; // outside the calendar window
    counts.set(date, counts.get(date) + shas.size);
    branchCommits += shas.size;
  }
  console.log(
    `Repos walked: ${visibility.public} public, ${visibility.private} private` +
      (TOKEN ? "" : " (no GITHUB_TOKEN: private repos skipped)")
  );

  const contributions = calendar.contributions.map((day) => ({
    date: day.date,
    count: counts.get(day.date) ?? 0,
    level: 0,
  }));
  const levelFor = makeLevelFor(contributions);
  for (const day of contributions) {
    day.level = levelFor(day.count);
  }

  const payload = {
    username: USERNAME,
    updatedAt: new Date().toISOString().slice(0, 10),
    total: contributions.reduce((sum, day) => sum + day.count, 0),
    contributions,
  };

  await writeFile(OUT_PATH, JSON.stringify(payload, null, 2) + "\n", "utf8");
  console.log(
    `Synced ${payload.contributions.length} days (${payload.total} contributions, ` +
      `${branchCommits} from non-default branches) -> src/content/github-contributions.json`
  );
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
