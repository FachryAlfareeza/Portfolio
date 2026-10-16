# Portfolio

A single-page portfolio site. All content lives in **`data.json`** — edit that file to update the site. You never need to touch the HTML, CSS, or JS.

## Files

| File | What it is | Edit it? |
|------|-----------|----------|
| `data.json` | Your bio, skills, projects, links | **Yes — this is the one you edit** |
| `index.html` | Page structure | Rarely |
| `styles.css` | Colors, layout, dark/light theme | Only to restyle |
| `app.js` | Reads `data.json` and renders the page | No |

## How to run it locally

The page loads `data.json` with `fetch()`, which browsers block when you open the HTML file directly (`file://`). Run a tiny local server instead:

```powershell
# From inside the portfolio folder
cd d:\Coding\portfolio

# Option A — Python (comes preinstalled on many systems)
python -m http.server 8000

# Option B — Node
npx serve .
```

Then open http://localhost:8000 in your browser.

## How to update your content

Open `data.json` and edit the values.

### Profile
```json
"profile": {
  "name": "Your Name",
  "tagline": "What you do",
  "location": "City, Country",
  "avatar": "https://...jpg",
  "about": "A paragraph about you.",
  "email": "you@example.com",
  "resumeUrl": "https://link-to-resume.pdf"
}
```
Leave `resumeUrl` as `""` to hide the Download Resume button.

### Social links
Each entry needs a `label`, `url`, and `icon`. Available icons: `github`, `linkedin`, `mail`, `twitter`, `globe`, `link`.
```json
"social": [
  { "label": "GitHub", "url": "https://github.com/you", "icon": "github" }
]
```

### Skills
A simple list of strings:
```json
"skills": ["Python", "React", "SQL"]
```

### Projects
```json
"projects": [
  {
    "name": "Project name",
    "description": "What it does.",
    "tech": ["Python", "FastAPI"],
    "repo": "https://github.com/you/project",
    "demo": "https://live-demo.com",
    "featured": true
  }
]
```
- `featured: true` adds a badge and sorts the project to the top.
- Leave `demo` as `""` if there's no live demo (the link is hidden).

Save the file and refresh the browser. That's it.

## Deploying (optional)

This is a static site, so it works anywhere:

- **GitHub Pages** — push these files to a repo, enable Pages on the branch.
- **Vercel / Netlify** — drag the folder in, or connect the repo. No build step needed.
- **Any static host** — upload the four files.

Because everything is driven by `data.json`, updating your deployed site is just editing that one file and re-deploying.
