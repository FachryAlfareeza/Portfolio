const escapeHTML = (value = "") => String(value).replace(/[&<>"']/g, (char) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[char]));

function renderLinks(items) {
  return items.map((item) => `<a href="${escapeHTML(item.url)}" target="_blank" rel="noopener noreferrer">${escapeHTML(item.label)} <span aria-hidden="true">↗</span></a>`).join("");
}

function renderSkills(groups) {
  document.getElementById("skills-list").innerHTML = groups.map((group) => `
    <div class="skill-group"><h3>${escapeHTML(group.name)}</h3><div class="skill-tags">${group.items.map((skill) => `<span>${escapeHTML(skill)}</span>`).join("")}</div></div>`).join("");
}

function renderProjects(projects) {
  const filters = ["All", ...new Set(projects.map((project) => project.track))];
  const filterRoot = document.getElementById("project-filters");
  const list = document.getElementById("projects-list");
  let active = "All";

  const drawFilters = () => {
    filterRoot.innerHTML = filters.map((filter) => `<button class="filter-button" type="button" data-filter="${escapeHTML(filter)}" aria-pressed="${filter === active}">${escapeHTML(filter)}</button>`).join("");
  };
  const drawCards = () => {
    const shown = projects.filter((project) => active === "All" || project.track === active);
    list.innerHTML = shown.map((project) => `
      <article class="project-card${project.featured ? " featured" : ""}">
        <div class="project-top"><span class="project-kicker">${escapeHTML(project.track)}</span>${project.featured ? '<span class="project-kicker">Featured</span>' : ""}</div>
        <h3>${escapeHTML(project.name)}</h3><p>${escapeHTML(project.description)}</p>
        <div class="tech">${project.tech.map((item) => `<span>${escapeHTML(item)}</span>`).join("")}</div>
        <div class="card-links">${project.repo ? `<a href="${escapeHTML(project.repo)}" target="_blank" rel="noopener noreferrer">Source code ↗</a>` : ""}${project.demo ? `<a href="${escapeHTML(project.demo)}" target="_blank" rel="noopener noreferrer">Live preview ↗</a>` : ""}</div>
      </article>`).join("");
  };
  drawFilters(); drawCards();
  filterRoot.addEventListener("click", (event) => {
    const button = event.target.closest("button[data-filter]");
    if (!button) return;
    active = button.dataset.filter;
    drawFilters(); drawCards();
  });
}

function renderTimeline(items, targetId) {
  document.getElementById(targetId).innerHTML = items.map((item) => `
    <article class="timeline-item"><div class="timeline-date">${escapeHTML(item.date)}</div><div><h3>${escapeHTML(item.title)}</h3><div class="timeline-org">${escapeHTML(item.organization)}</div><p>${escapeHTML(item.description)}</p></div></article>`).join("");
}

function renderList(items, targetId) {
  document.getElementById(targetId).innerHTML = items.map((item) => `<li>${escapeHTML(item)}</li>`).join("");
}

fetch("data.json")
  .then((response) => { if (!response.ok) throw new Error(`HTTP ${response.status}`); return response.json(); })
  .then((data) => {
    const { profile, social, skillGroups, projects, experience, education, training, awards } = data;
    document.title = `${profile.name} | Software and Data`;
    document.getElementById("availability").textContent = profile.availability;
    document.getElementById("tagline").textContent = profile.tagline;
    document.getElementById("location").textContent = profile.location;
    document.getElementById("about-text").textContent = profile.about;
    document.getElementById("email-hero").href = `mailto:${profile.email}`;
    document.getElementById("contact-email").href = `mailto:${profile.email}`;
    document.getElementById("social").innerHTML = renderLinks(social);
    renderSkills(skillGroups);
    renderProjects(projects);
    renderTimeline(experience, "experience-list");
    renderTimeline(education, "education-list");
    renderList(training, "training-list");
    renderList(awards, "awards-list");
    document.getElementById("year").textContent = new Date().getFullYear();
  })
  .catch((error) => {
    document.getElementById("projects-list").innerHTML = `<p role="status">Portfolio content could not be loaded. Please try again later.</p>`;
    console.error("Portfolio data failed to load", error);
  });
