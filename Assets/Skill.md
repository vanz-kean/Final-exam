---
name: kaplag-design
description: Design guidance for the KAPLAG Student Portal (UP Mindanao). Use whenever building or restyling any KAPLAG page, component or stylesheet. Simple, student-centered, in UP's institutional colors (maroon primary, forest green secondary, gold as a tiny accent).
---

# KAPLAG Design Skill

A tailored version of the general frontend-design skill, written for one client and one product: the KAPLAG student portal of the University of the Philippines Mindanao. It replaces the earlier Apple-style palette. Where this file and `requirements.txt` disagree on color or tone, this file wins until the other documents are updated.

## Who and what this is for

- **Subject:** a student portal (class schedule, grades, fees, prospectus, announcements, privacy notice).
- **Audience:** UP Mindanao students, mostly on phones, often in a hurry between classes.
- **Primary job:** answer "what do I need to know or do right now?" in seconds.
- **Personality:** calm, institutional, trustworthy, and simple. It should feel like UP, not like a startup or a bank.

## Design in one sentence

White cards on a light gray page, a maroon top bar, one solid maroon action per screen, forest green only when something is done, and gold only as a thin accent. Nothing decorative.

## Restraint: spend the boldness in one place

The one memorable element is the **maroon top bar with the UP Mindanao logo**. Everything below it stays quiet: white, gray, and plain type. Before finishing any page, remove one more decoration, then check the page again.

## Color

UP's institutional colors are maroon (primary), forest green (complementary) and gold (accent only). The hex values for maroon and forest green are the commonly published ones; confirm them, and pick the final gold, against the official UP Visual Identity Guide before launch.

### Brand colors

| Name | Hex | Role |
|------|-----|------|
| UP Maroon | `#7B1113` | Top bar, primary button, links, current page, focus ring |
| Maroon dark | `#5A0C0E` | Hover and pressed states |
| Maroon tint | `#F7EAEA` | Current page background, selected row, table header, "up next" box |
| Forest Green | `#014421` | Done and success only: completed courses, paid, passed, progress complete |
| Green tint | `#E6F0EA` | Background behind a success message or completed badge |
| Gold (approximate) | `#E3B23C` | One thin accent only: the line under the active tab-bar item |

### Neutrals

| Name | Light | Dark |
|------|-------|------|
| Page background | `#F3F4F6` | `#121212` |
| Card | `#FFFFFF` | `#1E1E1E` |
| Text | `#2B2B2B` | `#EDEDED` |
| Muted text | `#6B6B6B` | `#A3A3A3` |
| Border | `#D9D9D9` | `#3A3A3A` |
| Primary on dark | `#B5393C` | (buttons), `#E59A9C` (links) |
| Success on dark | `#4CAF7A` | |
| Urgent red | `#B3261E` | `#F2766E` |

### What each color means

Color must mean something, so use it only where the student needs to notice or act.

| Color | Means | Never use for |
|-------|-------|---------------|
| Maroon | "This is the main action" or "you are here" | Decoration, big backgrounds below the top bar |
| Forest green | "This is done" | Buttons, links, decoration |
| Urgent red | "Act soon" (due soon, failing, INC) | Anything not time-sensitive |
| Gold | "Active tab" | Text, buttons, borders, backgrounds |
| Gray | Everything else | |

Maroon and urgent red look close, so urgency is never shown by color alone. Pair urgent red with the word "Urgent" or "Due in 3 days" and an icon. Keep the two clearly different: urgent red is a brighter red than maroon.

### Contrast

White text on maroon and maroon text on white both pass WCAG AA comfortably. Gold on white does not, so gold is only ever a decorative line, never text. Check any new combination before using it, including every dark-mode pair.

## Typography

- **Typeface:** system font stack only (`-apple-system`, Segoe UI, Roboto, Inter, Arial, sans-serif). One family, no downloads.
- **Scale (16 px base, about 1.25 ratio):** 14 / 16 / 20 / 25 / 31 px. Page titles 25 px semibold, card titles 20 px semibold, body 16 px, small text 14 px.
- **Weights:** regular and semibold. No light weights.
- **Line length:** under 70 characters for reading text such as the Privacy Notice. Line height 1.5 for body.
- **Case:** sentence case everywhere. No all-caps labels.
- Do not accent a single word in a headline, and do not add small labels above headings that say nothing new.
- Numbers (₱1,060.00, 1.85, 2026-09-15) use tabular figures where tables line up.

## Layout

- **Mobile first.** One column on phones. Cards stack. Content is never wider than the screen.
- **Top bar:** maroon, white text, logo at left, bell and profile at right. Compact on phones.
- **Navigation:** bottom tab bar on phones (Home, Schedule, Grades, Fees, More); white sidebar from 768 px up with the current page in maroon on a maroon tint.
- **Content:** a light gray page, with white cards. Cards have a 1 px border and a very light shadow, or just the border. No colored top borders.
- **Alignment:** left-aligned text and content. Center only the login card.
- **Spacing:** use an 8 px grid (8, 16, 24, 32). Give each card 16 px padding on phones, 24 px on larger screens.
- **Order on every page:** the one thing the student came for first, then the rest by importance.

```
Phone                          Desktop
+----------------------+       +------+---------------------------+
| [maroon top bar]     |       | top bar (maroon)                 |
+----------------------+       +------+---------------------------+
| Good morning, Vanz   |       | side | Good morning, Vanz        |
| [Up next card]       |       | bar  | [Up next] [Needs attention]|
| [Needs attention]    |       |      | [Announcements]           |
| [Announcements]      |       |      | [Completion of degree]    |
+----------------------+       +------+---------------------------+
| Home Sched Grades Fees More |
+----------------------+
```

## Shape

- Cards: 12 px radius. Buttons and inputs: 8 px radius. Two values only.
- Avatar and notification dot are circles. Nothing else is round.
- Shadows: none or one very light level. Never colored shadows.

## Components

| Component | Rule |
|-----------|------|
| Primary button | Solid maroon, white text. **One per screen.** Hover and pressed use maroon dark. |
| Secondary button | White with a maroon outline and maroon text. |
| Links | Maroon, underlined on hover and focus. |
| Cards | White, 12 px radius, 1 px border. One idea per card. |
| Tables | Maroon tint header with dark bold text, thin gray row lines, no zebra stripes. They scroll inside their own container on small screens. |
| Badges | Small, sentence case. Gray (neutral), green tint with green text (done), red tint with red text and an icon (urgent). |
| Forms | Visible labels above inputs, 8 px radius, gray border, maroon focus ring. Errors appear under the field in urgent red with a short fix. |
| Progress bar | Gray track, forest green fill only when the progress is something to celebrate; otherwise maroon. |
| Tab bar | White, gray icons, the active item in maroon with a thin gold line above it. |
| Tabs (day tabs) | The selected tab has a maroon underline. |
| Modal | Used for confirming risky actions (log out). Primary button on the right. |
| Empty state | One friendly sentence and what to do next. No illustrations. |
| Loading | Gray skeleton blocks in the shape of the content. |

### Focus

Every interactive element has a visible focus ring: a 3 px maroon outline with a 2 px offset (a lighter maroon in dark mode). Never remove outlines.

## Motion

- No entrance animations, no hover effects on every card, no looping motion.
- Motion answers a tap: opening a section, switching a tab, confirming an action. Keep it between 150 and 250 ms.
- Respect `prefers-reduced-motion`: turn motion off.

## Writing

- Plain words, short sentences, sentence case, active voice. Say "You owe ₱1,060.00", not "Outstanding balance".
- Buttons say what happens: "Sign in", "Pay fees", "View schedule". Keep the same name through the flow.
- Errors say what went wrong and how to fix it, without apologizing or blaming: "Student number should look like 2026-17196."
- Empty states invite an action: "No announcements yet. New posts from your college will show up here."
- Formats stay consistent: ₱1,060.00, 2026-09-15, 18 units.
- Greeting uses the student's first name and the time of day.

## What to avoid

- Maroon-to-green gradients and glassmorphism (the original look this design replaces).
- Maroon and green used together as decoration. Maroon leads, green only means "done".
- Large gold areas, gold text, or gold buttons.
- Colored card borders, decorative stat cards, big welcome banners, repeated progress displays.
- All-caps eyebrow labels, numbered markers on content that is not a sequence, and arrows added to every link.
- A new color, radius, or shadow value for a single component. Reuse the tokens.

## Bootstrap theme

`src/styles/theme.css` turns Bootstrap into this design. Keep every value here and use variables everywhere else.

```css
:root {
  --bs-primary: #7b1113;
  --bs-primary-rgb: 123, 17, 19;
  --bs-success: #014421;
  --bs-success-rgb: 1, 68, 33;
  --bs-danger: #b3261e;
  --bs-danger-rgb: 179, 38, 30;
  --bs-body-bg: #f3f4f6;
  --bs-body-color: #2b2b2b;
  --bs-secondary-color: #6b6b6b;
  --bs-border-color: #d9d9d9;
  --bs-link-color: #7b1113;
  --bs-link-hover-color: #5a0c0e;
  --bs-border-radius: 0.5rem;      /* buttons, inputs */
  --bs-border-radius-lg: 0.75rem;  /* cards */
  --bs-font-sans-serif: -apple-system, "Segoe UI", Roboto, Inter, Arial, sans-serif;
}

/* Bootstrap buttons read their own variables, so set them too */
.btn-primary {
  --bs-btn-bg: #7b1113;
  --bs-btn-border-color: #7b1113;
  --bs-btn-hover-bg: #5a0c0e;
  --bs-btn-hover-border-color: #5a0c0e;
  --bs-btn-active-bg: #5a0c0e;
  --bs-btn-active-border-color: #5a0c0e;
  --bs-btn-disabled-bg: #7b1113;
  --bs-btn-disabled-border-color: #7b1113;
}

/* Dark mode: set data-bs-theme="dark" from prefers-color-scheme */
[data-bs-theme="dark"] {
  --bs-body-bg: #121212;
  --bs-body-color: #ededed;
  --bs-secondary-color: #a3a3a3;
  --bs-border-color: #3a3a3a;
  --bs-primary: #b5393c;
  --bs-primary-rgb: 181, 57, 60;
  --bs-link-color: #e59a9c;
  --bs-link-hover-color: #f0b8ba;
  --bs-danger: #f2766e;
  --bs-success: #4caf7a;
}

:focus-visible { outline: 3px solid var(--bs-primary); outline-offset: 2px; }

@media (prefers-reduced-motion: reduce) {
  * { transition: none !important; animation: none !important; }
}
```

Other rules:

- Prefer Bootstrap components and utilities. Write custom CSS only for the top bar, the tab bar, and the rules above.
- Keep CSS selectors simple and low in specificity so later rules do not cancel earlier ones.

## Process for every page

1. **Plan.** Write a short token list (colors used, type sizes, layout in one sentence or ASCII sketch) for the page.
2. **Check against this file.** Does each color carry a meaning from the table? Is there one primary button? If something is only decoration, cut it.
3. **Build.** Bootstrap first, then the smallest amount of custom CSS.
4. **Critique.** Look at it on a phone width and a desktop width, in light and dark mode. Tab through it with the keyboard. Remove one more decoration.

### Done checklist

- [ ] The one thing the student came for is at the top.
- [ ] One solid maroon button at most.
- [ ] Green appears only for "done"; red only for "act soon", with words as well as color.
- [ ] No gradients, colored borders or decorative cards.
- [ ] Sentence case, plain words, consistent formats.
- [ ] Tap targets are at least 44 × 44 px.
- [ ] Visible focus, labels on inputs, AA contrast in light and dark mode.
- [ ] Loading, empty and error states exist.
- [ ] Works on a phone first, with no sideways page scrolling.