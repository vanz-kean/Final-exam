# KAPLAG Student Dashboard

The dashboard page of the UP Mindanao Student Portal. It is built with plain HTML and CSS only (no JavaScript) and shares its maroon color palette and card-based design with the login page.

## Project structure

```
project/
├── Login.html
├── Dashboard.html
├── Css/
│   ├── Login.css
│   └── Dashboard.css
└── img/
    ├── Logo.png
    └── UP-Min-Admin.png
```

**Path rule:** paths written in HTML are relative to the HTML file (`img/Logo.png`). Paths written in CSS are relative to the CSS file, so the background image in `Css/Dashboard.css` uses `../img/UP-Min-Admin.png`.

## Getting started

1. Keep the folder structure above.
2. Open `Dashboard.html` in a browser.
3. Link pages (`ClassSchedule.html`, `Grades.html`, and so on) will show a 404 until those files exist.
4. The "Log out" link points to `Login.html`. Change it if your login page uses a different file name.

---

## HTML structure

The page uses semantic elements, so each block says what it is. The order matters because the sidebar toggle depends on it.

| Order | Element | Purpose |
|-------|---------|---------|
| 1 | `<input type="checkbox" id="nav-toggle">` | Hidden checkbox that stores whether the sidebar is open or closed |
| 2 | `<header>` | Top bar: hamburger, logo and name, notifications, student profile |
| 3 | `<nav id="sidebar">` | Sidebar navigation with a "More" dropdown and a log out link |
| 4 | `<main>` | Dashboard cards (five `<section>` elements) |
| 5 | `<footer>` | Privacy notice and copyright |

### Top bar (`<header>`)

- **Hamburger** (`<label for="nav-toggle" class="menu-toggle">`): clicking it ticks the hidden checkbox.
- **Brand** (`.brand`): logo (`.brand-logo`) and portal name (`.brand-text`), linking to the dashboard.
- **Right side** (`.header-actions`): notification button (`.icon-btn` with an inline SVG bell and `.notif-dot`) and the profile pill (`.profile-btn` with `.avatar`, `.profile-name` and `.profile-id`).

### Sidebar (`<nav>`)

- A `<ul>` of links. The current page has `aria-current="page"`, which the CSS uses for the highlighted style.
- Less-used pages sit in a `<details>` / `<summary>` dropdown, which works without JavaScript.
- The log out link is a separate `<p>` at the bottom.

### Main content (`<main>`)

Each card is a `<section>` labelled by its heading through `aria-labelledby`. The CSS also uses these labels to place the cards.

| Section (`aria-labelledby`) | Content |
|-----------------------------|---------|
| `greeting` | Welcome message, program, and term |
| `classes` | Day tabs, "Up next" box, and the list of today's classes |
| `attention` | Balance and deadlines, most urgent first |
| `announcements` | Latest posts as `<article>` elements, each with a `<time>` tag |
| `summary` | GWA, units, and degree progress (`<dl>` and `<progress>`) |

### Accessibility notes

- Headings follow a logical order (`h1` greeting, `h2` card titles, `h3` announcement titles).
- The checkbox has an `aria-label`, and the notification button has an `aria-label` because it shows only an icon.
- The day tabs use `role="tablist"`, `role="tab"` and `aria-selected`.
- Decorative items (the bell SVG and avatar initials) are hidden from screen readers with `aria-hidden="true"`.

---

## CSS structure (`Css/Dashboard.css`)

The file is divided into numbered sections that follow the page from top to bottom.

| # | Section | What it styles |
|---|---------|----------------|
| 1 | Variables | Color palette in `:root` |
| 2 | Base and page layout | Grid layout, background, links, hidden checkbox |
| 3 | Top bar | Header, hamburger, brand, notification button, profile pill |
| 4 | Sidebar | Navigation card, links, current page, dropdown, collapse behavior |
| 5 | Main | Card grid and shared card, heading, and list styles |
| 6 | Today's classes | Day tabs and "Up next" box |
| 7 | Needs your attention | Urgent item emphasis and action links |
| 8 | Announcements | Article cards |
| 9 | At a glance | Label and value layout, progress bar |
| 10 | Greeting | Tinted greeting card (placed late so it overrides the shared card style) |
| 11 | Footer | Footer text |
| 12 | Responsive | Tablet and phone layouts |

### Color variables

| Variable | Value | Used for |
|----------|-------|----------|
| `--maroon` | `#7b1113` | Main brand color, borders, headings |
| `--maroon-dark` | `#5a0c0e` | Hover states, top bar gradient |
| `--maroon-light` | `#f7eaea` | Tinted backgrounds (current page, greeting, "Up next") |
| `--text` | `#2b2b2b` | Body text |
| `--muted` | `#6b6b6b` | Secondary text |
| `--border` | `#d9d9d9` | Dividers and outlines |
| `--bg` | `#f3f4f6` | Background overlay color |
| `--surface` | `#ffffff` | Card and input background |
| `--on-maroon` | `#f1e9e6` | Soft white text on maroon |

Change a color once in `:root` and it updates everywhere. These are the same values as the login page, so both pages stay in sync.

### Page layout

`body` is a CSS grid with named areas:

```
"top  top"
"nav  main"
"nav  foot"
```

The first column is `auto`, so it follows the sidebar's width. The `<main>` area is its own two-column grid of cards. The greeting, announcements, and summary cards span both columns, and the classes and attention cards sit side by side.

### Sidebar toggle (CSS only)

1. The hidden checkbox (`#nav-toggle`) comes first in `<body>`.
2. The hamburger is a `<label for="nav-toggle">`, so clicking it ticks or unticks the checkbox.
3. The selector `.nav-toggle:checked ~ nav` matches the `nav` that follows a ticked checkbox.
4. On desktop, the checked state collapses the sidebar (width, margin, and padding go to 0), and the content expands to fill the space.
5. On phones the logic is reversed: the sidebar starts hidden, and the checked state shows it.

**Important:** the checkbox must stay before `<header>` and `<nav>` in the HTML. The `~` selector only reaches elements that come after it.

### Responsive breakpoints

| Width | Behavior |
|-------|----------|
| 1000px and below | Cards stack into one column |
| 800px and below | Sidebar moves above the content and is hidden until toggled; links wrap in rows |
| 600px and below | Top bar hides the subtitle and the student's name, keeping the avatar |

### Selector conventions

- Page-level blocks are scoped with child selectors (`body > header`, `body > nav`, `main > section`) so styles do not leak into other parts of the page.
- Cards are targeted by their `aria-labelledby` value (for example `main > section[aria-labelledby="attention"]`) instead of by position.

---

## Common customizations

| To change | Edit |
|-----------|------|
| Brand colors | Variables in `:root` |
| Sidebar width | `width: 226px` in `body > nav` (the grid column is that width plus the 24px left margin) |
| Background fade | The `0.7` values in the `body` gradient (higher is fainter, lower shows more of the image) |
| Which cards are full width | The grid-column rule listing `greeting`, `announcements`, and `summary` in section 5 |
| Card top border thickness | `border-top: 4px solid` in `main > section` (the login card uses 6px) |
| Logo background | `.brand-logo` (remove the background, padding, and radius to show the logo directly on maroon) |

---

## Known limitations and next steps

- The **day tabs** only look interactive. Switching days needs JavaScript.
- The **notification dot** is always visible, and the notification and profile buttons do nothing yet.
- The **sidebar state** resets on every page load.
- All **data** (name, schedule, balance, announcements) is written directly in the HTML. A future version could load it from a database or API.
- **Link targets** other than `Dashboard.html` and `Login.html` still need to be created.
- The `Announcements (5)` heading says five, but three announcements are shown. Update either the count or the list.
- A **"Privacy Notice"** link currently points to `#`.