import { writeFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const USERNAME = "FachryAlfareeza";
const API_URL = `https://github-contributions-api.jogruber.de/v4/${USERNAME}?y=last`;
const __dirname = dirname(fileURLToPath(import.meta.url));
const OUT_PATH = join(__dirname, "..", "src", "content", "github-contributions.json");

async function main() {
  const res = await fetch(API_URL);
  if (!res.ok) {
    throw new Error(`Failed to fetch GitHub contributions (${res.status})`);
  }
  const json = await res.json();
  const payload = {
    username: USERNAME,
    updatedAt: new Date().toISOString().slice(0, 10),
    total: json.total?.lastYear ?? 0,
    contributions: json.contributions ?? [],
  };
  await writeFile(OUT_PATH, JSON.stringify(payload, null, 2) + "\n", "utf8");
  console.log(`Synced ${payload.contributions.length} days (${payload.total} contributions) -> src/content/github-contributions.json`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
