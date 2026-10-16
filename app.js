// Portfolio renderer — all content comes from data.json.
// Edit data.json to update the site. No need to touch this file.

const ICONS = {
  github: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 .5A11.5 11.5 0 0 0 .5 12 11.5 11.5 0 0 0 8.5 23c.6.1.8-.3.8-.6v-2c-3.2.7-3.9-1.5-3.9-1.5-.5-1.4-1.3-1.7-1.3-1.7-1-.7.1-.7.1-.7 1.2.1 1.8 1.2 1.8 1.2 1 1.8 2.8 1.3 3.5 1 .1-.8.4-1.3.7-1.6-2.6-.3-5.3-1.3-5.3-5.7 0-1.3.5-2.3 1.2-3.1-.1-.3-.5-1.5.1-3.1 0 0 1-.3 3.3 1.2a11.4 11.4 0 0 1 6 0c2.3-1.5 3.3-1.2 3.3-1.2.6 1.6.2 2.8.1 3.1.8.8 1.2 1.8 1.2 3.1 0 4.4-2.7 5.4-5.3 5.7.4.4.8 1.1.8 2.2v3.3c0 .3.2.7.8.6A11.5 11.5 0 0 0 23.5 12 11.5 11.5 0 0 0 12 .5Z"/></svg>',
  linkedin: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M20.4 20.4h-3.5v-5.6c0-1.3 0-3-1.9-3s-2.1 1.4-2.1 2.9v5.7H9.4V9h3.3v1.6h.1c.5-.9 1.6-1.8 3.2-1.8 3.4 0 4.1 2.3 4.1 5.2v6.4ZM5.3 7.4a2 2 0 1 1 0-4.1 2 2 0 0 1 0 4.1ZM7.1 20.4H3.6V9H7v11.4ZM22.2 0H1.8C.8 0 0 .8 0 1.7v20.6c0 .9.8 1.7 1.8 1.7h20.4c1 0 1.8-.8 1.8-1.7V1.7C24 .8 23.2 0 22.2 0Z"/></svg>',
  mail: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="2" y="4" width="20" height="16" rx="2"/><path d="m22 7-10 6L2 7"/></svg>',
  twitter: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M18.9 1.2h3.7l-8 9.1 9.4 12.5h-7.4l-5.8-7.6-6.6 7.6H.5l8.6-9.8L0 1.2h7.6l5.2 6.9 6.1-6.9Zm-1.3 19.4h2L6.5 3.3H4.4l13.2 17.3Z"/></svg>',
  globe: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><path d="M2 12h20M12 2a15 15 0 0 1 0 20 15 15 0 0 1 0-20"/></svg>',
  link: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M10 13a5 5 0 0 0 7 0l3-3a5 5 0 0 0-7-7l-1 1"/><path d="M14 11a5 5 0 0 0-7 0l-3 3a5 5 0 0 0 7 7l1-1"/></svg>'
};

const esc = (s) =>
  String(s ?? "").replace(/[&<>"']/g, (c) =>
    ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c])
  );

function socialLink(item) {
  const icon = ICONS[item.icon] || ICONS.link;
  return `<a href="${esc(item.url)}" target="_blank" rel="noopener">${icon}<span>${esc(item.label)}</span></a>`;
}

function projectCard(p) {
  const tech = (p.tech || []).map((t) => `<span>${esc(t)}</span>`).join("");
  const links = [];
  if (p.repo) links.push(`<a href="${esc(p.repo)}" target="_blank" rel="noopener">Code →</a>`);
  if (p.demo) links.push(`<a href="${esc(p.demo)}" target="_blank" rel="noopener">Live Demo →</a>`);
  const badge = p.featured ? `<span class="badge">Featured</span>` : "";
  return `
    <article class="card">
      <div class="card-head"><h3>${esc(p.name)}</h3>${badge}</div>
      <p>${esc(p.description)}</p>
      <div class="tech">${tech}</div>
      <div class="card-links">${links.join("")}</div>
    </article>`;
}

function render(data) {
  const { profile = {}, social = [], skills = [], projects = [] } = data;

  // Hero
  const avatar = document.getElementById("avatar");
  if (profile.avatar) { avatar.src = profile.avatar; avatar.alt = profile.name || ""; }
  else { avatar.style.display = "none"; }

  document.getElementById("name").textContent = profile.name || "Your Name";
  document.getElementById("tagline").textContent = profile.tagline || "";
  document.getElementById("location").textContent = profile.location || "";
  document.getElementById("brand").textContent = profile.name || "Portfolio";
  document.title = (profile.name ? profile.name + " — " : "") + "Portfolio";

  document.getElementById("social").innerHTML = social.map(socialLink).join("");
  document.getElementById("social-contact").innerHTML = social.map(socialLink).join("");

  if (profile.resumeUrl) {
    const r = document.getElementById("resumeBtn");
    r.href = profile.resumeUrl;
    r.target = "_blank";
    r.style.display = "inline-block";
  }

  // About
  document.getElementById("about-text").textContent = profile.about || "";

  // Skills
  document.getElementById("skills-list").innerHTML =
    skills.map((s) => `<span class="skill">${esc(s)}</span>`).join("");

  // Projects — featured first
  const sorted = [...projects].sort((a, b) => (b.featured === true) - (a.featured === true));
  document.getElementById("projects-list").innerHTML = sorted.map(projectCard).join("");

  // Contact
  const email = profile.email || "";
  const ce = document.getElementById("contact-email");
  if (email) { ce.textContent = email; ce.href = "mailto:" + email; }
  else { ce.textContent = "N/A"; ce.removeAttribute("href"); }

  // Footer
  document.getElementById("year").textContent = new Date().getFullYear();
  document.getElementById("footer-name").textContent = profile.name || "";
}

// Theme toggle (persisted)
(function initTheme() {
  const saved = localStorage.getItem("theme");
  if (saved) document.documentElement.setAttribute("data-theme", saved);
  const btn = document.getElementById("themeToggle");
  const sync = () => {
    const light = document.documentElement.getAttribute("data-theme") === "light";
    btn.textContent = light ? "☀️" : "🌙";
  };
  sync();
  btn.addEventListener("click", () => {
    const light = document.documentElement.getAttribute("data-theme") === "light";
    const next = light ? "dark" : "light";
    document.documentElement.setAttribute("data-theme", next);
    localStorage.setItem("theme", next);
    sync();
  });
})();

// Load data
fetch("data.json")
  .then((res) => {
    if (!res.ok) throw new Error("HTTP " + res.status);
    return res.json();
  })
  .then(render)
  .catch((err) => {
    document.getElementById("projects-list").innerHTML =
      `<p class="loading">Could not load data.json (${esc(err.message)}).<br>
       If you opened this file directly, run a local server instead — see README.md.</p>`;
    console.error(err);
  });
