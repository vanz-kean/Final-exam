KAPLAG - Computerized Student Directory System (UP Mindanao Student Portal)
REQUIREMENTS (one merged file: project brief, setup, UX, React, Bootstrap)
============================================================

1. PROJECT
------------------------------------------------------------
Owner:     Vanz Kean T. Sazon (BS Computer Science)
Goal:      A simple, student-centered student portal that feels as easy
           to use as a modern mobile banking app (GoTyme-style UX).
Stack:     React + Bootstrap 5, built with Vite. HTML, CSS and JS are all
           allowed. The finished plain-HTML pages (Login, Dashboard,
           Privacy, Prospectus) are the reference design and content to
           convert into React components.

2. PACKAGES AND TOOLS
------------------------------------------------------------
Required:  Node.js (LTS) and npm
Install:   react, react-dom, react-router-dom, bootstrap
Optional:  react-bootstrap (ready-made accessible Bootstrap components)
Dev:       vite, @vitejs/plugin-react
Commands:  npm install | npm run dev (live preview) | npm run build
Not used:  Redux or other state libraries, CSS-in-JS, UI kits besides
           Bootstrap, analytics or tracking packages.
Editor:    VS Code (or any code editor).
Load Bootstrap from npm (import "bootstrap/dist/css/bootstrap.min.css"),
not from a CDN, so the site works offline and stays version-locked.
Ask before adding any other package.

3. WORKING RULES
------------------------------------------------------------
- Keep code simple, readable and well commented (explain the "why").
  This is a learning project.
- Function components and hooks only (useState, useEffect, useMemo).
  No class components.
- One component per file, PascalCase names (Dashboard.jsx, TabBar.jsx).
- Small components. If a component passes about 150 lines, split it.
- Data lives in src/data, never hard-coded inside page components.
- Semantic HTML and accessibility still matter inside JSX.
- Prefer Bootstrap classes and components over custom CSS. Write custom
  CSS only for the Apple-style theme and things Bootstrap can't do.
- No unnecessary features. Ask before adding anything new.

4. FILES
------------------------------------------------------------
kaplag/
|-- index.html              Single HTML shell (has a <noscript> message)
|-- package.json, vite.config.js
|-- public/img/Logo.png     Tab icon and logo (UP-Min-Admin.png optional)
`-- src/
    |-- main.jsx            Imports Bootstrap, theme.css, renders <App />
    |-- App.jsx             Routes (one route per page)
    |-- styles/theme.css    Apple-style overrides of Bootstrap variables,
    |                       dark mode, tab bar and small custom rules
    |-- components/
    |   |-- Layout.jsx      Header + sidebar + tab bar + footer + <Outlet>
    |   |-- Header.jsx, Sidebar.jsx, TabBar.jsx, Footer.jsx
    |   `-- (shared pieces: PageTitle, EmptyState, SkeletonCard,
    |        ConfirmModal, StatusBadge ...)
    |-- pages/
    |   |-- Login.jsx, Dashboard.jsx, Prospectus.jsx, Privacy.jsx
    |   `-- ClassSchedule, Grades, Fees, Announcements, UPMail,
    |       StudentInformation, Evaluations, CampusFacility,
    |       CollegeFacility, StudentHousing (.jsx, to build)
    `-- data/
        |-- student.js      Name, number, program, curriculum
        |-- prospectus.js   Terms and courses (swap per student)
        `-- sample.js       Schedule, fees, grades, announcements

Routes use the old page names so links stay familiar:
/login, /dashboard, /class-schedule, /grades, /fees, /prospectus,
/announcements, /up-mail, /student-information, /privacy,
/evaluations, /campus-facility, /college-facility, /student-housing.
The default route redirects to /login. Unknown routes show a friendly
"Page not found" with a link home.

5. PAGES
------------------------------------------------------------
Reference HTML done: Login, Dashboard, Privacy, Prospectus.
To convert to React: those four.
To build new: the ten remaining pages.
Pages that aren't built yet show a simple "Coming soon" screen instead
of an error.

6. SHARED LAYOUT (every page except Login)
------------------------------------------------------------
Layout.jsx wraps all pages except /login:
  1. "Skip to main content" link (first focusable element)
  2. Header: menu button, brand (logo + KAPLAG + "UP Mindanao · Student
     Portal"), bell button, profile button (avatar "VK", "Vanz Kean",
     "2026-17196")
  3. Sidebar: Dashboard, Class Schedule, Grades, Fees, Prospectus,
     Announcements, UP Mail, Student Information, then "More"
     (Evaluations, Campus Facility & Safety, College Facility & Safety,
     Student Housing, UP Privacy Notice), then Log out
  4. <main id="main"> with the page (one <h1>)
  5. Tab bar (phones only, section 8)
  6. Footer: Privacy Notice link + Data Privacy Act (RA 10173) + copyright
Use NavLink so the current page gets aria-current="page" automatically.
The old hidden-checkbox menu is retired: the sidebar opens and closes
with React state or Bootstrap Offcanvas.

7. UX PRINCIPLES (inspired by how mobile banking apps like GoTyme work)
------------------------------------------------------------
Mobile first
- Design for phones first, then widen with Bootstrap breakpoints.
- Tap targets at least 44 x 44 px, with space between them.
- No sideways page scrolling (wide tables use .table-responsive).

Main answer first
- Each page opens with what the student came for (next class, amount
  due, latest grade). One primary action per screen.
- Most urgent item first. Red only for urgent items.

Few choices, short paths
- Quick navigation has 5 destinations at most.
- Common tasks take 3 taps or fewer from the dashboard.
- Long tasks are split into steps ("Step 2 of 4") with a Back button.

Plain, friendly words
- Say "You owe ₱1,060.00", not "Outstanding balance".
- Say what happens next. Errors say what went wrong and how to fix it.

Always show the state
- Loading: skeleton placeholders. Success: clear confirmation and next
  step. Empty: friendly message with a hint. Errors: inline by the field.
- Never lose what the student typed. Confirm risky actions (log out).
- Show "last updated" on data that changes (grades, fees).

Comfort
- Body text at least 16 px, WCAG AA contrast.
- Follow the device's dark mode and "reduce motion" settings.
- Consistent formats: ₱1,060.00 / 2026-09-15 / 18 units.

8. NAVIGATION
------------------------------------------------------------
Phone (under 768 px): fixed bottom tab bar with Home (Dashboard),
Schedule, Grades, Fees, More. "More" opens the sidebar offcanvas.
Respect the phone's safe area. Header stays compact.
Tablet and desktop (768 px and up): sidebar visible, tab bar hidden,
content centered with a comfortable maximum width.
Everywhere: current page highlighted, keyboard friendly, focus moves to
the page <h1> after each route change.

9. PAGE-BY-PAGE UX (and the Bootstrap piece to use)
------------------------------------------------------------
Login:          One primary "Sign in" button, show/hide password,
                remember me, forgot password, "Use demo account", inline
                errors. (Form validation states, Alert)
Dashboard:      Greeting, today's classes with day tabs (Nav tabs; today
                selected on load; "Starts in 45 minutes"), needs your
                attention (Badge; urgent in red), announcements (Card),
                completion of degree (ProgressBar).
Class Schedule: Day view with tabs; current and next class highlighted.
Grades:         GWA on top, latest term first, INC and failing flagged.
Fees:           Amount due and due date large at the top, breakdown
                (Table), payment steps in plain words.
Prospectus:     Student details, one table per term (Accordion; current
                term open; Table responsive), filter "Not yet taken",
                search by course code, live unit totals. All content
                comes from data/prospectus.js so it can change per student.
Privacy:        Summary first, collapsible sections (Accordion),
                Expand/Collapse all, read-and-understood checkbox with
                confirmation, copy buttons (Toast).
Announcements:  Newest first, filter by category, unread marked.
Log out:        Confirm in a Modal, then go to /login.

10. DESIGN (Apple-style on top of Bootstrap)
------------------------------------------------------------
Override Bootstrap's CSS variables in theme.css (don't ship its default
look):
  --bs-body-bg #f5f5f7, cards #ffffff, text #1d1d1f, muted #6e6e73
  --bs-primary #0071e3 (dark mode #0a84ff), red for urgent only
Dark mode: automatic via data-bs-theme (set from prefers-color-scheme);
  bg #000000, cards #1c1c1e.
Fonts:  system stack only (-apple-system, SF Pro, Inter, Segoe UI,
        Roboto, Arial, sans-serif). Nothing to download.
Shape:  12 px input corners, 20-24 px cards, soft shadows, blue focus
        ring, one solid blue primary button per screen.
Feel:   big cards, generous spacing, short transitions (150-250 ms).
Superseded: the maroon palette, Segoe UI-first fonts and the faded
UP-Min-Admin.png background on every page.

11. BEHAVIOR (React, no extra libraries)
------------------------------------------------------------
Shared:     Close sidebar on link click and Esc; active tab; log out confirm.
Login:      Check demo account (2022-04821 / UPMin@2026); show/hide
            password; "Use demo account"; inline validation. This is
            front-end only. No real passwords are stored or sent.
Dashboard:  Day tabs; "Up next" countdown; days-left math; time-of-day
            greeting.
Prospectus: Expand/collapse terms and all; filter and search; totals
            calculated from the data.
Privacy:    Expand/collapse all; read-and-understood behavior; copy
            buttons.
Session:    Remember the logged-in demo student in React state (and
            sessionStorage if needed). Protected routes send logged-out
            visitors to /login.
Not allowed unless asked: server calls, real authentication, real student
data in the code, tracking.

12. ACCESSIBILITY AND PERFORMANCE
------------------------------------------------------------
- Landmarks (header, nav, main, footer), one <h1> per page.
- Visible focus ring, labels on all inputs, aria-live for new messages.
- Color is never the only signal. Decorative SVGs are aria-hidden.
- Import only the Bootstrap CSS (and JS only if a component needs it).
- Lazy-load pages with React.lazy only if the build gets large.

13. BROWSER REQUIREMENTS
------------------------------------------------------------
Any up-to-date browser (Chrome, Edge, Firefox, Safari), about 2022 or newer.
JavaScript must be on (it is a React app). The <noscript> message says so.

14. RULES THAT MUST STAY TRUE
------------------------------------------------------------
- One <h1> per page and one aria-current="page" per nav.
- Student data comes from src/data, so a different student only needs
  new data, not new components.
- Keep file and folder names exactly as listed.

15. CUT FROM THE DESIGN (do not bring back)
------------------------------------------------------------
Big welcome banner, the four decorative stat cards, repeated progress
displays, decorative gradients and colored borders. Rarely used sidebar
items stay under "More".

16. KNOWN ISSUES
------------------------------------------------------------
- Prospectus HTML totals 159 units; Dashboard shows 144 total units.
- Dashboard footer privacy link still points to "#".
- Dashboard "UP Privacy Notice" link has a stray aria-current="page".
- Dashboard greeting says Year 1 · 2nd Semester; check it fits the student.
- The four finished pages are plain HTML and must be converted to React.

17. TO BE DECIDED
------------------------------------------------------------
- Which page to convert or build first
- Sample data or real data
- What the site is for (school requirement, portfolio, practice)
- Where it will be hosted or submitted
- Whether to use react-bootstrap or plain Bootstrap classes
- Content of the pages still to build