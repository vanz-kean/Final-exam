# Spec-Driven Development (SDD) Project Plan

**Project:** University of the Philippines Mindanao Computerized Student Records System (UPMin CSRS)
**Project Direction:** Redesign and refine the existing system
**Working Interface Identity:** KAPLAG — Knowledge and Academic Personnel Lookup and Access Gateway
**Working Tagline:** Discover. Connect. Access.
**Document Status:** Living plan (formerly `plan.md`). Decisions recorded in section 2.3 are confirmed. Everything else remains subject to validation through an audit of the existing system.

**Related documents**

| File | Role |
|------|------|
| `specs.md` (this file) | Master plan: process, phases, decisions, status |
| `requirements.txt` | Working requirements for the KAPLAG front end: stack, files, UX, design, behavior |
| `README.md` | How the KAPLAG project is organized and run |

---

## 1. Project Purpose

The project aims to redesign and refine the existing UPMin Computerized Student Records System (CSRS) to make it easier for students and other authorized users to find and use relevant student information.

The objective is not to rebuild everything or add features simply for the sake of having more features. Instead, the project will first examine the existing CSRS, identify confusing or inefficient elements, preserve useful functionality, and improve the system through clearly defined requirements and controlled implementation.

The proposed user experience takes inspiration from the simplicity and task-focused organization of mobile applications such as GoTyme. This serves as a reference for usability principles, not a request to copy its branding or interface.

### Main goal

Create a more organized, consistent, accessible, and student-centered CSRS in which common tasks are easy to understand and complete.

### Supporting objectives

- Simplify the overall interface and navigation.
- Organize pages and information according to student needs.
- Improve the presentation and readability of student records.
- Reduce redundant content, unnecessary sections, and confusing interactions.
- Improve responsiveness across desktop, tablet, and mobile devices, designing for phones first.
- Preserve important existing features and data relationships.
- Define and enforce appropriate access permissions for each user role.
- Use written specifications and acceptance criteria to guide development.

---

## 2. Project Principles, Boundaries, and Decisions

### 2.1 Design and development principles

| Principle | Project application |
|-----------|---------------------|
| Student-centered | Organize the experience around what students need to find or do. |
| Simple by default | Prioritize essential information and actions. One primary action per screen. |
| Consistent | Reuse navigation patterns, typography, spacing, buttons, forms, and tables. |
| Relevant | Keep features that serve a clear user need or institutional requirement. |
| Accessible | Use readable content, clear labels, keyboard support, and sufficient contrast. |
| Responsive | Design mobile first, then widen for tablet and desktop. |
| Secure and private | Enforce access permissions and minimize unnecessary exposure of personal information. |
| Incremental | Improve the existing system through small, testable changes. |
| Specification-led | Agree on expected behavior and acceptance criteria before implementation. |
| Plain language | Use short sentences and everyday words. Errors explain what went wrong and how to fix it. |
| Honest about state | Always show loading, empty, success, and error states. |

### 2.2 Scope boundaries

The project focuses on redesigning and refining the existing UPMin CSRS.

The following are not automatically included:

- Replacing the entire backend or database.
- Changing official university processes.
- Adding new integrations without an identified need.
- Making private student records publicly searchable.
- Rewriting working features solely to use a different technology.
- Adding npm packages beyond those listed in `requirements.txt` without asking first.

Any major change to the current architecture, database, authentication, or institutional workflow must be justified during discovery and documented before implementation.

### 2.3 Confirmed decisions and current status

**Confirmed decisions**

| Area | Decision |
|------|----------|
| Front-end stack | React (function components and hooks), Bootstrap 5 from npm, React Router, built with Vite. HTML, CSS, and JavaScript are all allowed. `react-bootstrap` is optional. |
| Backend and database | Unchanged. The KAPLAG front end uses sample data from `src/data` until the audit confirms how it connects to the existing CSRS. |
| Visual design | Apple-style neutral palette on top of Bootstrap (light gray background, white cards, one blue accent, automatic dark mode, system fonts). This replaces the earlier maroon-and-green direction. |
| UX reference | GoTyme-style, task-focused patterns: main answer first, few choices, plain language, visible state. On phones, a bottom tab bar with Home, Schedule, Grades, Fees, and More. On tablet and desktop, a visible sidebar. |
| Code style | Simple, readable, well-commented code. One component per file, PascalCase names. Student data lives in `src/data`, so a different student needs new data, not new components. |
| Login | Front-end demo only (demo account in `requirements.txt`). No real passwords are stored or sent. |

**Current status**

| Item | Status |
|------|--------|
| Login, Dashboard, Privacy, Prospectus | Finished as plain HTML. They are the reference design and content for the React components. |
| `Css/Prospectus.css` and other page styles | Not yet written. They will be replaced by `src/styles/theme.css` and Bootstrap classes in the React version. |
| React project (Vite) | Not yet created. Conversion of the four finished pages is next. |
| Ten remaining pages (ClassSchedule, Grades, Fees, Announcements, UPMail, StudentInformation, Evaluations, CampusFacility, CollegeFacility, StudentHousing) | Not built. They will show a "Coming soon" screen until specified. |
| Current-system audit | Not started. |

**Open decisions**

- Whether the Apple-style palette satisfies the university's branding requirements (confirm in Phase 5).
- Sample data or real data in the prototype.
- What the site is for (school requirement, portfolio, or practice).
- Where it will be hosted or submitted.
- `react-bootstrap` or plain Bootstrap classes.
- Which page to convert or build first.
- Whether to add a test tool such as Vitest (a new package, so ask first).

---

## 3. Spec-Driven Development Approach

The project follows a specification-first workflow. Each major feature must have a clear purpose, requirements, expected behavior, permissions, and acceptance criteria before implementation.

### 3.1 Core workflow

1. **Discover.** Inspect the existing CSRS, source code, features, users, and constraints.
2. **Define.** Establish project requirements, user roles, and system boundaries.
3. **Specify.** Write feature-level specifications with testable acceptance criteria.
4. **Design.** Create the information architecture, user flows, wireframes, and UI guidelines.
5. **Plan implementation.** Identify technical dependencies and manageable development tasks.
6. **Implement.** Build according to the approved specifications.
7. **Validate.** Test the implementation against the specifications.
8. **Refine.** Fix issues and update specifications when requirements change.

### 3.2 Rule for implementation

Avoid asking a developer or AI coding assistant to redesign or rewrite the entire system using a broad prompt.

Instead, provide a specific development task containing:

- Relevant existing files and code context.
- The approved feature specification.
- Explicit requirements and exclusions.
- Acceptance criteria.
- Instructions about which files or functionality must not be changed.

After each task, review the changes and run the relevant tests before proceeding.

---

## 4. Phase 1: Existing System Discovery and Audit

**Purpose:** Understand the current UPMin CSRS before deciding what to change.

### Activities

- Review the live website or current local version.
- Inspect the source code, project folders, assets, and existing page structure.
- List all pages, navigation items, forms, tables, and available features.
- Identify intended users and what each user can currently do.
- Trace common student tasks from entry point to completion.
- Identify repeated information, outdated content, confusing labels, and unnecessary steps.
- Check desktop, tablet, and mobile behavior.
- Identify existing backend, database, authentication, and hosting dependencies.
- Record features that work correctly and must be preserved.
- Identify security, privacy, accessibility, and usability concerns.
- Compare the audit findings with the finished KAPLAG HTML pages and record any differences.

### Audit output

Create an inventory with the following structure:

| Page / Feature | Purpose | Current issue | User role | Decision |
|----------------|---------|---------------|-----------|----------|
| To be audited | To be established | To be observed | To be confirmed | Retain / Revise / Merge / Remove / Add |

### Deliverables

- `discovery/current-system-audit.md`
- Existing page and feature inventory
- Known technical constraints
- Initial list of usability problems
- List of functionality and content to preserve

**Exit condition:** The current system is sufficiently understood to define requirements without guessing.

---

## 5. Phase 2: Requirements and System Definition

**Purpose:** Define what the refined CSRS must accomplish and who it serves.

### 5.1 Identify user roles

Start with roles confirmed by the existing system and institutional requirements.

| Potential role | Possible needs |
|----------------|----------------|
| Student | View permitted personal and academic information; use student lookup features allowed by policy. |
| Faculty | Access student information needed for authorized academic responsibilities. |
| Administrative Staff | Review or manage records within assigned responsibilities. |
| System Administrator | Manage accounts, permissions, configuration, and system operations. |

These roles are provisional. Do not implement a role or grant access until its responsibilities and permissions have been confirmed. The current prototype serves the student role only.

### 5.2 Define functional requirements

Functional requirements describe what the system must do.

Organize them by feature:

- Authentication and account access.
- Dashboard and navigation.
- Student directory and search.
- Student profile and records display.
- Academic information, including the prospectus.
- Announcements, if supported or required.
- Account settings.
- Administrative record management, if part of the existing CSRS scope.

For every requirement, record:

1. Unique requirement ID.
2. Description of expected behavior.
3. Intended user role.
4. Preconditions and relevant data.
5. Permission rules.
6. Expected result.
7. Priority: Must, Should, or Could.
8. Acceptance criteria.

### 5.3 Define non-functional requirements

Specify expectations for:

- Usability and learnability.
- Performance and search responsiveness.
- Accessibility (WCAG AA contrast, keyboard support, visible focus, labels, `aria-live` messages).
- Responsive behavior (mobile first, 44 × 44 px tap targets, no sideways page scrolling).
- Privacy and security.
- Reliability and error handling.
- Browser support (any up-to-date browser, about 2022 or newer, with JavaScript on) and maintainability.

### Deliverables

- `specs/project-overview.md`
- `specs/requirements.md` (starting from `requirements.txt`)
- `specs/user-roles-and-permissions.md`
- `specs/non-functional-requirements.md`

**Exit condition:** Project scope, users, priorities, and expected system behavior are agreed upon.

---

## 6. Phase 3: Information Architecture and User Experience

**Purpose:** Simplify the structure of the website before finalizing its visual design.

### 6.1 Proposed high-level structure

This is a starting proposal, not a final sitemap. Retain only sections supported by the audit and approved requirements.

1. **Home / Dashboard**
   - Welcome and account context.
   - Today's classes and frequently used actions.
   - Items that need the student's attention, most urgent first.
   - Relevant announcements or notices, if needed.
   - Concise summary of permitted student information.
2. **Student Directory**
   - Student search.
   - Useful filters based on authorized fields.
   - Search results.
   - Links to permitted student profiles.
3. **Student Profile**
   - Clearly grouped student information.
   - Academic details relevant to the user's permissions.
   - Clear labels and readable presentation.
4. **Academic Information**
   - Class schedule, grades, fees, and prospectus.
   - Programs, departments, and courses.
   - Other academic references within the CSRS scope.
5. **Announcements / Notices**
   - Relevant university or academic updates, if this is an existing or approved system function.
6. **Account and Support**
   - Account details and settings.
   - Help or contact information.
   - Privacy information (UP Privacy Notice).
   - Sign out, with a confirmation step.

Administrative functions should be separated from the student-facing experience and shown only to authorized roles.

### 6.2 Navigation

The prototype navigation is already drafted and must be validated by the audit:

| Screen size | Navigation |
|-------------|------------|
| Under 768 px | Bottom tab bar: Home, Schedule, Grades, Fees, More. "More" opens the sidebar. |
| 768 px and up | Sidebar with Dashboard, Class Schedule, Grades, Fees, Prospectus, Announcements, UP Mail, Student Information, and a "More" group (Evaluations, Campus Facility & Safety, College Facility & Safety, Student Housing, UP Privacy Notice), plus Log out. |

The final navigation may use fewer or different sections after the audit. Quick navigation never exceeds five destinations, and common tasks should take three taps or fewer from the dashboard.

### 6.3 User flows

Document the most common tasks, such as:

- Signing in and reaching the appropriate landing page.
- Checking today's classes and the next class.
- Checking the amount due and the due date.
- Finding a student through the directory.
- Opening and understanding a permitted student profile.
- Finding a particular academic detail, such as a course prerequisite in the prospectus.
- Updating account information, if supported.
- Performing an authorized administrative record task, if in scope.

For each flow, identify:

- Starting point.
- User action.
- System response.
- Possible errors.
- Completion state.

### Deliverables

- `specs/information-architecture.md`
- `specs/user-flows.md`
- Revised sitemap and navigation labels.
- Feature prioritization list.

**Exit condition:** Users can reach important features through clear and predictable paths.

---

## 7. Phase 4: Feature Specifications

**Purpose:** Convert broad requirements into implementation-ready specifications.

Create one specification for each major feature.

### Suggested structure

```
specs/
├── project-overview.md
├── requirements.md
├── user-roles-and-permissions.md
├── non-functional-requirements.md
├── information-architecture.md
├── user-flows.md
└── features/
    ├── dashboard.md
    ├── student-directory.md
    ├── student-profile.md
    ├── academic-information.md
    ├── prospectus.md
    ├── announcements.md
    └── account-and-support.md
```

Only create feature specifications for features confirmed to be in scope.

### 7.1 Feature specification template

Each feature specification should include:

1. **Feature name and ID**
2. **Purpose:** What problem does this feature solve?
3. **Users:** Which roles can use it?
4. **Scope:** What is included and excluded?
5. **Preconditions:** What must be true before use?
6. **Functional requirements:** What must the system do?
7. **Business rules:** What institutional rules apply?
8. **Data requirements:** What information is read, displayed, or changed? (For the prototype, name the file in `src/data`.)
9. **Permissions and privacy:** Who can access each data element?
10. **User interaction:** What does the user do and what does the system display?
11. **Error and empty states:** What happens when data is missing or an action fails?
12. **Acceptance criteria:** How will completion be verified?
13. **Dependencies:** Which other features or services are required?
14. **Open questions:** What decisions still need confirmation?

### 7.2 Example: Student Directory specification

**Purpose:** Allow authorized users to find student records efficiently.

Illustrative requirements:

- An authorized user can search using supported student identifiers or name fields.
- The system displays only fields permitted for that user's role.
- The user can apply approved filters when useful.
- Selecting a result opens the corresponding profile only when the user has permission.
- An empty search result displays a clear message.
- Search failures display a useful error and do not expose internal system details.

Illustrative acceptance criteria:

- A valid search returns matching authorized records.
- A search with no matches displays a no-results state.
- Restricted profile data is not returned to an unauthorized user, even if they manually access a URL or API endpoint.
- Search results remain usable on supported mobile and desktop layouts.

These examples must be reconciled with actual institutional policy and current system behavior before approval.

### 7.3 Example: Prospectus specification

**Purpose:** Let a student see every course in their curriculum, term by term, and what remains to be taken.

Illustrative requirements:

- The page shows the student's details (number, name, program, curriculum) from `src/data/student.js`.
- Each term appears as its own table with course, prerequisite, units, grade, removal, year, and semester.
- Terms can be expanded and collapsed; the current term is open on load.
- The student can filter to "Not yet taken" courses and search by course code.
- Unit totals are calculated from the data, not typed by hand.
- Changing the student's data changes the page without changing any component.

Illustrative acceptance criteria:

- Each term's total equals the sum of its course units.
- The program total matches the approved curriculum total (currently unresolved: the sample prospectus sums to 159 units while the dashboard shows 144).
- Tables scroll inside their own container on small screens, with no sideways page scrolling.
- A course with no grade shows as not yet taken.

**Exit condition:** Every feature selected for implementation has an approved specification and testable acceptance criteria.

---

## 8. Phase 5: UI/UX Design and Prototype

**Purpose:** Translate approved requirements and user flows into a coherent interface.

### 8.1 Design direction

Use the simplicity and clear hierarchy of GoTyme as a usability reference:

- Keep primary actions visible and easy to understand.
- Avoid crowded pages and excessive navigation.
- Group related information.
- Use consistent visual patterns.
- Make important information easy to scan.
- Lead each page with the one thing the student came for.

Do not copy GoTyme's branding or assume its mobile banking patterns are automatically appropriate for a university records system.

### 8.2 Visual language (confirmed for the prototype)

| Token | Light | Dark |
|-------|-------|------|
| Background | `#f5f5f7` | `#faf9f6` |
| Cards | `#ffffff` | `#faf9f6` |
| Text | `#1d1d1f` | |
| Muted text | `#6e6e73` | |
| Accent (`--bs-primary`) | `#0071e3` | `#0a84ff` |
| Red | Urgent items only | |

- System font stack only (`-apple-system`, SF Pro, Inter, Segoe UI, Roboto, Arial, sans-serif).
- 12 px input corners, 20–24 px cards, soft shadows, a blue focus ring, and one solid blue primary button per screen.
- Short transitions (150–250 ms), reduced when the device asks for it.
- Color must mean something: use it only where action is needed.
- Override Bootstrap's CSS variables in `src/styles/theme.css` instead of using its default look.

### 8.3 Design tasks

- Confirm the university's branding requirements, and record whether the Apple-style palette is acceptable or the UP maroon palette must return.
- Design the header, navigation, buttons, cards, tables, forms, and feedback states using Bootstrap components (Nav tabs, Accordion, Table, Badge, ProgressBar, Modal, Toast, Offcanvas).
- Create desktop and mobile wireframes.
- Design the dashboard and highest-priority student tasks first.
- Include loading (skeleton), empty, error, and success states.
- Review the prototype with representative users before implementation.

### 8.4 Existing design assets to inspect

Finished reference pages:

- `Login.html`, `Dashboard.html`, `Privacy.html`, `Prospectus.html`, built with the shared layout (header with logo, notifications, and student profile; sidebar with a "More" group; footer).
- `img/Logo.png` (tab icon and header logo) and `img/UP-Min-Admin.png` (optional background).

Superseded earlier work:

- The UP maroon and white direction, maroon course-table headers, and the faded background on every page. Keep these only if branding requirements demand them.
- The hidden-checkbox menu, replaced in the React version by React state or a Bootstrap offcanvas.

Inspect these files before changing them. Reuse or refine them where appropriate, and preserve existing course information unless the requirements explicitly call for a correction.

### Deliverables

- `specs/ui-ux/design-system.md`
- Wireframes for approved pages.
- Responsive layout specifications.
- Prototype for review.
- Approved interface components.

**Exit condition:** The interface design satisfies the feature specifications and has been reviewed before development.

---

## 9. Phase 6: Technical Planning

**Purpose:** Decide how to implement the approved design without introducing unnecessary technical changes.

### Activities

- Inspect and document the current technology stack of the existing CSRS.
- Understand the existing frontend and backend structure.
- Review the database schema and data relationships.
- Document authentication and authorization mechanisms.
- Identify existing APIs and dependencies.
- Decide how the React front end connects to the existing CSRS, or whether it stays a sample-data prototype.
- Identify migration risks before changing data structures.
- Plan backups and rollback procedures for changes that affect data or deployment.

The front-end stack is decided (section 2.3). Do not select a new backend, database, or authentication method until the existing implementation has been inspected and the need for a change has been established.

### Suggested technical documents

```
implementation/
├── architecture.md
├── database-schema.md
├── api-contracts.md
├── development-tasks.md
└── migration-and-release-plan.md
```

Create only the documents relevant to the actual architecture.

**Exit condition:** Technical decisions, dependencies, and implementation risks are documented and understood.

---

## 10. Phase 7: Incremental Implementation

**Purpose:** Build the refined CSRS in small, reviewable, specification-aligned tasks.

### Suggested implementation order

The final order depends on technical dependencies and the audit.

**Milestone 1: Foundation**

- Create the Vite + React project and install the packages in `requirements.txt`.
- Establish `Layout` (skip link, header, sidebar, tab bar, footer) and routes.
- Implement the theme (`theme.css`), typography, spacing, and reusable components.
- Confirm responsive behavior and dark mode.

**Milestone 2: Core student experience**

- Convert Login and Dashboard to React.
- Implement Prospectus and Privacy from the finished HTML.
- Implement student directory and search, and the student profile presentation, if confirmed in scope.

**Milestone 3: Supporting information**

- Implement Class Schedule, Grades, and Fees.
- Implement announcements if approved.
- Implement account and support pages if in scope.

**Milestone 4: Authorized administrative experience**

- Refine existing administrative features that are confirmed to be in scope.
- Verify role permissions and protected actions.
- Preserve required record-management workflows.

### Rules for each development task

Before coding:

- Read the relevant approved specification.
- Inspect the existing code and related dependencies.
- Define the exact files and behavior in scope.
- Identify what must not be changed.

After coding:

- Review the code changes.
- Run relevant tests.
- Verify each acceptance criterion.
- Check permissions and error states.
- Update documentation if behavior or decisions change.

Avoid implementing several unrelated features in one task. Keep changes small enough to review and revert. Keep components small (split any component that passes about 150 lines).

---

## 11. Phase 8: Testing and Validation

**Purpose:** Verify that the refined system works as specified and does not break existing required functionality.

### Testing categories

| Test category | What to verify |
|---------------|----------------|
| Functional | Each feature behaves according to its specification. |
| Acceptance | All approved acceptance criteria pass. |
| Access control | Users cannot access records or actions outside their permissions, including logged-out visitors reaching protected routes. |
| Privacy | Search, profiles, and responses expose only approved information. |
| Responsive | Layouts work on supported desktop, tablet, and mobile sizes, including the tab bar and sidebar switch at 768 px. |
| Accessibility | Keyboard use, skip link, labels, focus states, contrast, and readability. |
| Regression | Existing required features continue to work after changes. |
| Error handling | Missing data, invalid input, and failed requests are handled clearly. |
| Performance | Common pages and searches respond within agreed expectations. |

### Example acceptance test: Student Directory

1. Sign in as an authorized student or staff user.
2. Search for a known student using an allowed field.
3. Verify that matching results are displayed.
4. Open a profile and verify the displayed fields.
5. Repeat with a user who should not have access.
6. Attempt direct access to a restricted profile route or endpoint.
7. Verify that restricted data remains inaccessible.
8. Test a search with no results.
9. Repeat at mobile and desktop widths.

### Deliverables

- `tests/test-cases.md`
- `tests/acceptance-results.md`
- Defect and refinement list.
- Regression test results.

**Exit condition:** Critical acceptance criteria pass, access controls are verified, and no unresolved critical defects remain.

---

## 12. Phase 9: Release and Maintenance

**Purpose:** Release the refined system safely and keep its specifications useful.

### Activities

- Confirm release approval and deployment requirements.
- Back up relevant data and configuration.
- Build the front end (`npm run build`) and deploy it to a test or staging environment first, where available.
- Run smoke tests after deployment.
- Monitor errors and collect user feedback.
- Document known limitations.
- Keep specifications, implementation notes, and tests synchronized with approved changes.

### Change management rule

When a requirement changes:

1. Record the requested change and its reason.
2. Identify affected specifications, features, data, and tests.
3. Update and review the specification.
4. Approve the revised scope.
5. Implement the change.
6. Validate the updated acceptance criteria.
7. Update related documentation, including `requirements.txt` and `README.md`.

---

## 13. Project Documentation Structure

Suggested project organization:

```
UPMin-CSRS/
│
├── specs.md                    Master plan (this file)
├── requirements.txt            KAPLAG working requirements
├── README.md                   How the project is organized and run
│
├── discovery/
│   ├── current-system-audit.md
│   ├── feature-inventory.md
│   └── technical-constraints.md
│
├── specs/
│   ├── project-overview.md
│   ├── requirements.md
│   ├── user-roles-and-permissions.md
│   ├── non-functional-requirements.md
│   ├── information-architecture.md
│   ├── user-flows.md
│   │
│   ├── features/
│   │   ├── dashboard.md
│   │   ├── student-directory.md
│   │   ├── student-profile.md
│   │   ├── academic-information.md
│   │   ├── prospectus.md
│   │   ├── announcements.md
│   │   └── account-and-support.md
│   │
│   └── ui-ux/
│       ├── design-system.md
│       ├── wireframes.md
│       └── responsive-design.md
│
├── implementation/
│   ├── architecture.md
│   ├── database-schema.md
│   ├── api-contracts.md
│   ├── development-tasks.md
│   └── migration-and-release-plan.md
│
├── tests/
│   ├── test-cases.md
│   ├── acceptance-results.md
│   └── regression-checklist.md
│
└── kaplag/                     The React + Bootstrap app (see README.md)
    ├── index.html
    ├── package.json
    ├── public/img/
    └── src/
        ├── main.jsx, App.jsx
        ├── styles/theme.css
        ├── components/
        ├── pages/
        └── data/
```

This is a suggested layout. Do not create empty files for every item at the start. Add documents as the corresponding phase produces decisions worth recording. The file `specs.md` is the overall plan; the `specs/` folder holds the detailed requirement and feature specifications.

---

## 14. Definition of Done

A feature is not complete merely because its interface looks finished.

A feature is considered complete when:

- Its purpose and scope are documented.
- Its specification has been reviewed and approved.
- Its implementation matches the approved requirements.
- Its acceptance criteria pass.
- Its access permissions have been tested.
- Its empty, loading, and error states are handled where applicable.
- Its responsive behavior has been checked.
- Existing required functionality has not regressed.
- Relevant documentation and tests have been updated.

The overall redesign is ready for release when the agreed project scope is implemented, critical acceptance criteria pass, privacy and access controls are verified, and release checks are complete.

---

## 15. Immediate Action Plan

Do not begin by redesigning every page or rewriting the code. Start with evidence from the existing CSRS.

### Already done

- Finished the plain-HTML reference pages: Login, Dashboard, Privacy, and Prospectus.
- Wrote `requirements.txt` and `README.md` for the KAPLAG front end.
- Confirmed the front-end stack and design direction (section 2.3).

### First tasks

1. Collect the current UPMin CSRS URL or project files.
2. Inspect all existing pages and navigation.
3. Identify current student, faculty, and administrative functions.
4. Review the finished prospectus page and its HTML and image assets against the real prospectus.
5. Record which functions work and must be preserved.
6. Identify confusing, duplicated, outdated, or unnecessary interface elements.
7. Confirm the actual data fields and access permissions for each role.
8. Complete the current-system audit.
9. Draft and approve the project overview and requirements (starting from `requirements.txt`).
10. Select one high-priority feature and write its complete specification before implementation.

### First milestone

**Milestone 1**

Deliverable: A validated current-system audit and an approved initial requirements specification.

Do not finalize the sitemap, remove existing features, or commit to a new backend architecture until the audit has established what the current system contains and what the institution requires.

### Known issues to resolve during the audit

- The prospectus sums to 159 units, while the dashboard shows 144 total units.
- The dashboard footer privacy link points to `#`, and its "UP Privacy Notice" link has a stray `aria-current="page"`.
- The dashboard heading says "Announcements (5)" but shows three announcements.
- The dashboard greeting says Year 1 · 2nd Semester, which may not fit the student.
- The four finished pages are plain HTML and still need converting to React.

---

## 16. Project Success Statement

The success of the UPMin CSRS redesign will be measured not by how many new pages or visual effects it introduces, but by whether students and authorized personnel can understand the system, find the information they need, and complete their tasks with less confusion and fewer unnecessary steps.

**Core direction:** Refine what already works, simplify what causes friction, specify what needs to change, and validate every implementation against an agreed requirement.