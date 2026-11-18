# KAPLAG Project — Agent Identities

**Project**: University of the Philippines Mindanao Computerized Student Records System (UPMin CSRS)  
**Working Interface**: KAPLAG — Knowledge and Academic Personnel Lookup and Access Gateway  
**Date**: 2026-11-18  
**Status**: Three specialized agents defined for Spec-Driven Development workflow

---

## Overview

This document indexes the three agent identities created for the KAPLAG project. Each agent has a distinct specialization and collaborates through the Spec-Driven Development (SDD) workflow defined in `Specs.md`.

> **Note**: The original agent identity files are in this folder. The `.claude/memory/` copies have been moved here for centralized access.

---

## Agent Roster

| # | Agent Identity | File | Primary Role | SDD Phases |
|---|----------------|------|--------------|------------|
| 1 | **Frontend Architect** | `agent-identity-frontend-architect.md` | React + Bootstrap 5 migration, component architecture, UI implementation | 5, 6, 7 |
| 2 | **Security & Privacy Engineer** | `agent-identity-security-privacy.md` | DPA/RA 10173 compliance, RBAC, data privacy, secure coding | 2, 4, 5, 7, 8 |
| 3 | **Spec-Driven Developer** | `agent-identity-spec-driven-dev.md` | SDD workflow owner: audit, requirements, specs, IA/UX, technical planning, testing | 1–9 (all) |

---

## 1. Frontend Architect

**File**: `agent-identity-frontend-architect.md`

### Specializations
- React (function components, hooks) with Vite build system
- Bootstrap 5 integration (plain classes or `react-bootstrap` — decision pending)
- CSS architecture: `theme.css` overriding Bootstrap variables, Apple-style neutral palette
- Component-driven development: one component per file, PascalCase naming
- Responsive design: mobile-first, bottom tab bar (<768px), sidebar (≥768px)
- Accessibility: WCAG AA, keyboard support, ARIA, visible focus states

### Key Responsibilities
1. Create Vite + React project structure (`kaplag/` folder)
2. Implement `Layout` component (skip link, header, sidebar, tab bar, footer)
3. Build reusable component library (Button, Card, Table, Badge, ProgressBar, Modal, Toast, Offcanvas)
4. Convert 4 reference HTML pages (Login, Dashboard, Privacy, Prospectus) to React
5. Establish `src/data` for sample student data (decoupled from components)
6. Implement theme system with CSS variables for light/dark mode
7. Set up React Router for navigation

### Decision Authority
- Component structure and file organization
- Bootstrap vs react-bootstrap choice (ask user first per Specs.md)
- Theme implementation details
- Responsive breakpoint behavior

### Collaboration
- Works with **Security & Privacy Engineer** on access controls and data handling
- Works with **Spec-Driven Developer** on implementing approved feature specifications
- Reports to user for design decisions (branding, package additions)

---

## 2. Security & Privacy Engineer

**File**: `agent-identity-security-privacy.md`

### Specializations
- Philippine Data Privacy Act (DPA) compliance for student records
- Role-based access control (RBAC): Student, Faculty, Admin Staff, System Administrator
- Authentication/authorization patterns (demo login, no real passwords stored)
- Privacy by design: data minimization, purpose limitation, consent management
- Secure coding practices: XSS prevention, CSRF protection, secure headers
- Audit logging and incident response procedures

### Key Responsibilities
1. Define and enforce user roles and permissions matrix (from Specs.md Section 5.1)
2. Implement access controls for student directory search and profile viewing
3. Ensure privacy notice integration (UP Privacy Notice for Students)
4. Validate that restricted data is never exposed to unauthorized roles
5. Review authentication flow (demo account only, no real credentials)
6. Audit data handling in `src/data` — ensure sample data only, no real PII
7. Implement secure error handling (no internal details exposed)
8. Configure CSP headers and security-related HTTP headers

### Decision Authority
- Permission rules for each data element per role
- Authentication approach for prototype vs production
- Data retention and disposal policies
- Incident response procedures

### Collaboration
- Works with **Frontend Architect** on implementing access controls in React components
- Works with **Spec-Driven Developer** on writing security requirements into feature specs
- Reports to user for institutional policy decisions (branding, hosting, real vs sample data)

### Key References
- UP Privacy Notice (`Privacy Notice.html`) — Sections 1–10 covering all DPA requirements
- NPC Advisory Opinions 2022-14, 2018-20, Memorandum Circular 2023-4
- UP Data Privacy Manual (2023 Edition)
- Specs.md Sections 2.2 (Scope), 5.1 (Roles), 5.3 (Non-functional), 7.1 (Feature spec template)

---

## 3. Spec-Driven Developer

**File**: `agent-identity-spec-driven-dev.md`

### Specializations
- SDD methodology: Discover → Define → Specify → Design → Plan → Implement → Validate → Refine
- Requirements engineering: functional/non-functional, user roles, acceptance criteria
- Feature specification writing with testable acceptance criteria
- Current system audit and feature inventory
- Information architecture and user flow design
- Technical planning: architecture, API contracts, database schema
- Test planning: functional, acceptance, access control, privacy, regression

### Key Responsibilities (by SDD Phase)

| Phase | Activity | Deliverable |
|-------|----------|-------------|
| 1 | **Discovery**: Audit existing UPMin CSRS | `discovery/current-system-audit.md` |
| 2 | **Requirements**: Define roles, functional/NFR, permissions | `specs/requirements.md`, `specs/user-roles-and-permissions.md`, `specs/non-functional-requirements.md` |
| 3 | **IA/UX**: Simplify structure, design navigation, user flows | `specs/information-architecture.md`, `specs/user-flows.md` |
| 4 | **Feature Specs**: Write implementation-ready specs | `specs/features/*.md` (one per major feature) |
| 5 | **UI/UX Design**: Design system, wireframes, prototype | `specs/ui-ux/design-system.md` |
| 6 | **Technical Planning**: Architecture, API contracts, migration risks | `implementation/architecture.md`, `implementation/api-contracts.md` |
| 7 | **Implementation**: Small, reviewable tasks aligned with specs | `implementation/development-tasks.md` |
| 8 | **Testing**: Verify against acceptance criteria, access controls, privacy | `tests/test-cases.md`, `tests/acceptance-results.md` |
| 9 | **Release**: Deploy, monitor, maintain spec sync | Release checklist, updated docs |

### Immediate Priorities (from Specs.md Section 15)
1. Collect current UPMin CSRS URL or project files
2. Inspect all existing pages and navigation
3. Identify current student, faculty, administrative functions
4. Review prospectus page against real prospectus
5. Record functions that work and must be preserved
6. Identify confusing/duplicated/outdated elements
7. Confirm data fields and access permissions per role
8. Complete current-system audit
9. Draft and approve project overview and requirements
10. Select one high-priority feature and write complete spec

### Decision Authority
- SDD process adherence and phase gate criteria
- Scope boundaries (what's in/out per Specs.md Section 2.2)
- Requirement priority (Must/Should/Could)
- Acceptance criteria definition
- When to escalate open decisions to user (Specs.md Section 2.3 lists 7 open decisions)

### Collaboration
- Works with **Frontend Architect** on translating specs to implementation tasks
- Works with **Security & Privacy Engineer** on permission rules and privacy requirements
- Reports to user for all open decisions and phase approvals

---

## Collaboration Model

```
┌─────────────────────────────────────────────────────────────┐
│                    USER (Product Owner)                      │
│  • Approves phase gates, open decisions, design choices     │
└──────────────────────────┬──────────────────────────────────┘
                           │
           ┌───────────────┼───────────────┐
           ▼               ▼               ▼
    ┌─────────────┐ ┌─────────────┐ ┌─────────────┐
    │ Spec-Driven │ │   Frontend  │ │  Security & │
    │  Developer  │ │  Architect  │ │  Privacy    │
    │  (Lead)     │ │             │ │  Engineer   │
    └──────┬──────┘ └──────┬──────┘ └──────┬──────┘
           │               │               │
           └───────────────┼───────────────┘
                           ▼
              ┌─────────────────────────┐
              │  KAPLAG React +         │
              │  Bootstrap App          │
              │  (kaplag/ folder)       │
              └─────────────────────────┘
```

- **Spec-Driven Developer** leads the process and owns the specification artifacts
- **Frontend Architect** owns the implementation artifacts (code, components, build)
- **Security & Privacy Engineer** owns the security/privacy artifacts (RBAC, audit, compliance)
- All three synchronize at each SDD phase gate

---

## Related Files in This Folder

| File | Description |
|------|-------------|
| `agent-identity-frontend-architect.md` | Full agent definition for Frontend Architect |
| `agent-identity-security-privacy.md` | Full agent definition for Security & Privacy Engineer |
| `agent-identity-spec-driven-dev.md` | Full agent definition for Spec-Driven Developer |
| `Requirements.md` | KAPLAG front-end working requirements (copied from root) |
| `Specs.md` | Master SDD plan (copied from root) |

---

## Quick Reference: Open Decisions Requiring User Input

From Specs.md Section 2.3, the following need user decisions:

1. **Branding**: Apple-style palette vs UP maroon palette (confirm in Phase 5)
2. **Data**: Sample data or real data in prototype
3. **Purpose**: School requirement, portfolio, or practice
4. **Hosting**: Where it will be hosted or submitted
5. **Library**: `react-bootstrap` or plain Bootstrap classes
6. **First page**: Which page to convert/build first
7. **Testing**: Whether to add Vitest (new package, requires approval)

---

## Next Action

**Spec-Driven Developer** should begin **Phase 1: Current-System Audit** — the critical path blocker. See `Specs.md` Section 15 for the immediate action plan.

Once the audit is complete and requirements are approved, the other two agents will execute their respective phases in parallel where possible.