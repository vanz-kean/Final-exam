# KAPLAG Student Portal

KAPLAG (Computerized Student Directory System) is the UP Mindanao Student Portal: a simple, student-centered portal for class schedules, grades, fees, the prospectus and announcements. It is designed mobile first and should feel as easy to use as a modern mobile banking app.

The full list of rules and decisions lives in [`requirements.txt`](requirements.txt). This README explains how the project is organized and how to run it.

## Status

| Part | State |
|------|-------|
| Login, Dashboard, Privacy, Prospectus | Finished as plain HTML (reference design and content) |
| React + Bootstrap version | In progress: Dashboard, Registration, Class Schedule, Grades, Privacy, and Prospectus |
| Fees, Announcements, UPMail, StudentInformation, Evaluations, CampusFacility, CollegeFacility, StudentHousing | Not built yet (show a "Coming soon" screen) |
| School Calendar | Shows the proposed UP Mindanao AY 2026–2027 dates and official holidays |

## Tech stack

- **React** (function components and hooks only)
- **Bootstrap 5**, installed from npm and themed with an Apple-style palette
- **React Router** for one route per page
- **Vite** for the dev server and build
- Optional: **react-bootstrap** for ready-made accessible components

No other packages (no Redux, CSS-in-JS, UI kits or analytics) without asking first.

## Getting started

You need [Node.js](https://nodejs.org/) (LTS) and npm.

```bash
# first time only: create the project, then add the packages
npm create vite@latest kaplag -- --template react
cd kaplag
npm install react-router-dom bootstrap
npm install react-bootstrap        # optional

# every time
npm install
npm run dev        # live preview in the browser
npm run build      # production build in dist/
```

Load Bootstrap's CSS in `src/main.jsx` (`import "bootstrap/dist/css/bootstrap.min.css"`), not from a CDN, so the site works offline and stays version-locked.

## Project structure

```
kaplag/
├── index.html               Single HTML shell (includes a <noscript> message)
├── package.json
├── vite.config.js
├── public/
│   └── img/
│       ├── Logo.png         Tab icon and header logo
│       └── UP-Min-Admin.png Optional background image
└── src/
    ├── main.jsx             Imports Bootstrap and theme.css, renders <App />
    ├── App.jsx              Routes (one per page)
    ├── styles/
    │   └── theme.css        Apple-style Bootstrap overrides, dark mode, tab bar
    ├── components/
    │   ├── Layout.jsx       Header + sidebar + tab bar + footer + page outlet
    │   ├── Header.jsx
    │   ├── Sidebar.jsx
    │   ├── TabBar.jsx
    │   ├── Footer.jsx
    │   └── ...              Shared pieces (PageTitle, EmptyState, SkeletonCard,
    │                        ConfirmModal, StatusBadge)
    ├── pages/
    │   ├── Login.jsx
    │   ├── Dashboard.jsx
    │   ├── Registration.jsx
    │   ├── ClassSchedule.jsx
    │   ├── SchoolCalendar.jsx
    │   ├── Prospectus.jsx
    │   ├── Privacy.jsx
    │   └── ...              The ten pages still to build
    └── data/
        ├── student.js       Name, student number, program, curriculum
        ├── registration.js  Available block, PE, and NSTP sections
        ├── academicCalendar.js  AY 2026–2027 dates and holidays
        ├── prospectus.js    Terms and courses (swap per student)
        └── sample.js        Schedule, fees, grades, announcements
```

**Naming rule:** one component per file, PascalCase names (`Dashboard.jsx`, `TabBar.jsx`). Folder names are case-sensitive on some servers, so keep them exactly as shown.

**Data rule:** student data lives in `src/data`, never inside page components. A different student only needs new data, not new components.

## Routes

| Route | Page |
|-------|------|
| `/login` | Login (default route redirects here) |
| `/dashboard` | Dashboard |
| `/registration` | Registration |
| `/class-schedule` | Class Schedule |
| `/school-calendar` | School Calendar |
| `/grades` | Grades |
| `/fees` | Fees |
| `/prospectus` | Prospectus |
| `/announcements` | Announcements |
| `/up-mail` | UP Mail |
| `/student-information` | Student Information |
| `/privacy` | UP Privacy Notice |
| `/evaluations` | Evaluations |
| `/campus-facility` | Campus Facility & Safety |
| `/college-facility` | College Facility & Safety |
| `/student-housing` | Student Housing |

Unknown routes show a friendly "Page not found" with a link home. Logged-out visitors are sent to `/login`.

## Shared layout

`Layout.jsx` wraps every page except Login, in this order:

| Order | Part | Purpose |
|-------|------|---------|
| 1 | Skip link | "Skip to main content", the first focusable element |
| 2 | Header | Menu button, logo and name, notifications, student profile |
| 3 | Sidebar | Main navigation, a "More" group, and Log out |
| 4 | `<main id="main">` | The page content, with one `<h1>` |
| 5 | Tab bar | Quick navigation on phones only |
| 6 | Footer | Privacy Notice link, Data Privacy Act (RA 10173) and copyright |

- **Header:** brand (logo, **KAPLAG**, "UP Mindanao · Student Portal"), bell button with a notification dot, and a profile button (avatar "VK", "Vanz Kean", "2026-17196").
- **Sidebar:** Dashboard, Class Schedule, Grades, Fees, Prospectus, Announcements, UP Mail, Student Information, then **More** (Evaluations, Campus Facility & Safety, College Facility & Safety, Student Housing, UP Privacy Notice), then Log out.
- **Current page:** `NavLink` adds `aria-current="page"` automatically. Only one link per nav has it.
- **Menu:** opens and closes with React state or a Bootstrap offcanvas. The old hidden-checkbox method is retired in the React version.

### Navigation by screen size

| Width | Behavior |
|-------|----------|
| Under 768px (phone) | Fixed bottom tab bar: Home, Schedule, Grades, Fees, More. "More" opens the sidebar. Compact header. |
| 768px and up | Sidebar visible, tab bar hidden, content centered with a comfortable maximum width |

Focus moves to the page `<h1>` after each route change.

## Pages

| Page | What it shows | Bootstrap pieces |
|------|---------------|------------------|
| Login | Student number, password, show/hide password, remember me, forgot password, sign in, demo account, privacy link | Form validation, Alert |
| Dashboard | Greeting, today's classes with day tabs and "Up next", needs your attention (most urgent first), announcements, completion of degree | Nav tabs, Badge, Card, ProgressBar |
| Class Schedule | Weekly timetable and list view built from saved registration sections | Responsive timetable |
| School Calendar | Search and filter all AY 2026–2027 academic events and holidays by term | Filtered event list |
| Grades | GWA on top, latest term first, INC and failing grades flagged | Table, Badge |
| Fees | Amount due and due date at the top, breakdown, payment steps | Table |
| Prospectus | Student details and one table per term, with filter, search and live unit totals | Accordion, Table (responsive) |
| Privacy | UP Privacy Notice for Students: summary, collapsible sections, DPO contacts, read-and-understood checkbox | Accordion, Toast |
| Announcements | Newest first, filter by category, unread marked | Card, Badge |

Logging out asks for confirmation in a modal, then returns to `/login`.

### Dashboard sections

| Section | Content |
|---------|---------|
| Greeting | Welcome message, program and term |
| Today's classes | Day tabs (today selected on load), "Up next" box, list of classes |
| Needs your attention | Balance and deadlines, most urgent first, urgent items in red |
| Announcements | Latest posts, each with a date |
| Completion of degree | GWA, units enrolled and degree progress |

## Design

KAPLAG uses an Apple-style look on top of Bootstrap. Override Bootstrap's CSS variables in `src/styles/theme.css` instead of shipping its default look.

| Token | Light | Dark | Used for |
|-------|-------|------|----------|
| Background | `#f5f5f7` | `#faf9f6` | Page background |
| Card | `#ffffff` | `#faf9f6` | Cards and surfaces |
| Text | `#1d1d1f` | | Body text |
| Muted | `#6e6e73` | | Secondary text |
| Accent (`--bs-primary`) | `#0071e3` | `#0a84ff` | Primary button, links, focus ring |
| Red | | | Urgent items only |

- **Dark mode:** uses dirty white (`#faf9f6`) for background and cards, set through `data-bs-theme` from `prefers-color-scheme`.
- **Fonts:** system stack only (`-apple-system`, SF Pro, Inter, Segoe UI, Roboto, Arial, sans-serif). Nothing to download.
- **Shape:** 12px input corners, 20–24px cards, soft shadows, a blue focus ring and one solid blue primary button per screen.
- **Motion:** short transitions (150–250 ms), reduced when the device asks for it.
- **Color rule:** color must mean something, so use it only where action is needed.

The earlier maroon palette and the faded background image on every page are retired.

## UX principles

Inspired by how mobile banking apps work:

- **Mobile first.** Tap targets are at least 44 × 44 px, and wide tables scroll inside their own container.
- **Main answer first.** Each page opens with what the student came for, with one primary action per screen.
- **Few choices, short paths.** At most five quick destinations, and common tasks take three taps or fewer.
- **Plain, friendly words.** "You owe ₱1,060.00", not "Outstanding balance". Errors say how to fix the problem.
- **Always show the state.** Skeleton loading, clear success messages, friendly empty states and inline errors. Never lose what the student typed, and confirm risky actions.
- **Comfort.** 16px minimum text, WCAG AA contrast, dark mode and reduced motion respected. Formats stay consistent (₱1,060.00, 2026-09-15, 18 units).

## Accessibility

- Landmarks (`header`, `nav`, `main`, `footer`) and one `<h1>` per page, with a logical heading order.
- A visible focus ring, labels on every input and `aria-live` for messages that appear after an action.
- Icon-only buttons (such as the bell) have an `aria-label`. Decorative SVGs and avatar initials are `aria-hidden`.
- Color is never the only signal.

## Behavior

- **Login:** checks the demo account (`2022-04821` / `UPMin@2026`) in the browser only. No real passwords are stored or sent.
- **Session:** the logged-in demo student is kept in React state (and `sessionStorage` if needed).
- **Dashboard:** day tabs, "Up next" countdown, days-left math and a time-of-day greeting.
- **Prospectus:** expand or collapse terms, filter "Not yet taken", search by course code, and unit totals calculated from the data.
- **Registration and Class Schedule:** the weekly schedule uses the block, PE, and NSTP sections saved during registration in the current browser session.
- **School Calendar:** shows all supplied AY 2026–2027 academic dates and official holidays, with term filters and event search.
- **Privacy:** expand or collapse all sections, read-and-understood behavior and copy buttons.

Not allowed unless asked: server calls, real authentication, real student data in the code and tracking.

## Common customizations

| To change | Edit |
|-----------|------|
| Student name, number, program, curriculum | `src/data/student.js` |
| Registered class offerings | `src/data/registration.js` |
| Academic-year events and holidays | `src/data/academicCalendar.js` |
| Courses and terms in the prospectus | `src/data/prospectus.js` |
| Schedule, fees, grades, announcements | `src/data/sample.js` |
| Brand colors and Bootstrap look | Variables in `src/styles/theme.css` |
| Sidebar links | `src/components/Sidebar.jsx` |
| Tab bar items | `src/components/TabBar.jsx` |
| A page's route | `src/App.jsx` |

## Reference HTML pages

The finished plain-HTML pages are the design and content source for the React components:

```
Login.html   Dashboard.html   Privacy.html   Prospectus.html
```

Paths in those files are relative to the HTML file (`img/Logo.png`). They use a hidden checkbox for the menu and no JavaScript.

## Known issues

- The Prospectus HTML totals 159 units, while the Dashboard shows 144 total units. Confirm the correct program total.
- The Dashboard footer privacy link points to `#`.
- The Dashboard "UP Privacy Notice" link has a stray `aria-current="page"`.
- The Dashboard heading says "Announcements (5)" but shows three announcements. Update the count or the list.
- The Dashboard greeting says Year 1 · 2nd Semester. Check that it fits the student.
- The four finished pages are plain HTML and still need converting to React.

## Still to decide

- Which page to convert or build first
- Sample data or real data
- What the site is for (school requirement, portfolio or practice)
- Where it will be hosted or submitted
- Whether to use react-bootstrap or plain Bootstrap classes