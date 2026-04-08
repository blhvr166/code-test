# ER CareView Dashboard

A Next.js-based emergency room dashboard focused on clarity, accessibility, and maintainability.

## Overview

This application provides a real-time view of emergency room statistics, including wait times and patient counts across different priority levels.

It is designed to support quick decision-making in a high-pressure environment, with automatic data updates and a responsive interface.

## What It Does

- Shows live emergency room statistics including wait times and patient counts
- Updates data automatically every 2 minutes
- Provides a real-time notification center for wait-time updates with unread states
- Works well on mobile and desktop devices
- Designed with accessibility in mind for screen readers and keyboard navigation
- Built with attention to rendering behaviour and avoiding unnecessary updates
- Fully typed with TypeScript for better code reliability
- Thoroughly tested with 11 test cases

## Current Design and UX

- Dark healthcare-focused visual theme with clear typography and contrast
- Sticky top navigation with active-route highlighting
- Dashboard summary cards with icon-based visual hierarchy
- Triage process timeline section with clear step-by-step guidance
- Notification popover with:
	- unread badges
	- mark-all-read behavior
	- expand-to-view-all behavior
	- maximum height with internal scrolling
- Responsive layouts across desktop, tablet, and mobile breakpoints

## Technology Used

- **Framework**: Next.js with App Router and React
- **Language**: TypeScript 5 with strict type checking
- **Data Management**: TanStack Query for efficient data fetching and caching
- **Styling**: Regular CSS with feature-level and shared style layers
- **Testing**: Jest with React Testing Library
- **Build Tool**: Turbopack (built into Next.js)
- **Package Manager**: npm

## Project Organization

```
src/
├── app/                          # Next.js routing and API endpoints
│   ├── api/wait-times/           # Mock API for wait time data
│   ├── dashboard/                # Main dashboard page
│   ├── patient-search/           # Patient search route shell
│   ├── staff-directory/          # Staff directory route shell
│   ├── reports/                  # Reports route shell
│   ├── globals.css               # Global styles and design tokens
│   ├── layout.tsx                # Main layout with providers and navigation
│   └── page.tsx                  # Homepage that redirects to dashboard
├── features/
│   ├── dashboard/                # Dashboard domain (components, hooks, API, types)
│   ├── navigation/               # Navigation domain
│   └── notifications/            # Notifications domain
├── shared/                       # Reusable cross-feature code
│   ├── components/               # Shared UI components
│   ├── hooks/                    # Shared hooks
│   ├── styles/                   # Shared CSS
│   └── utils/                    # Shared helper functions
└── tests/                        # Feature-oriented tests
```

## Routes

- `/` redirects to `/dashboard`
- `/dashboard` main ER dashboard
- `/patient-search` route shell page
- `/staff-directory` route shell page
- `/reports` route shell page
- `/api/wait-times` mock wait-time API endpoint

## Technical Decisions

The implementation prioritises clarity and separation of concerns over feature breadth, aligning with the time constraints of the assessment while still demonstrating production-ready patterns.

### Feature-Based Organization
The code is organized by feature domain rather than file type. This keeps related UI, hooks, API clients, and types together, which scales well as features grow.

### Regular CSS Instead of CSS-in-JS
We use regular CSS files for predictable runtime performance and easier debugging. Styles are split by feature and shared layers for maintainability.

### TanStack Query for Data
TanStack Query handles caching, polling, loading/error states, and refetch behavior. Wait-time data refreshes every 2 minutes to keep the dashboard current.

### Accessibility Considerations
The app uses semantic HTML, ARIA labels, live regions, keyboard interactions (including Escape to close notifications), and route indication with `aria-current`.

### Performance Focus
We use memoized components, stable external-store time updates (`useNow`), and reducer-driven notification state to minimize unnecessary rerenders and hydration drift.

## Testing Approach

We have comprehensive tests covering:
- Data-fetching hook behavior in loading, success, and error scenarios
- Dashboard rendering and polling-driven updates
- Notification UI interactions including unread badge behavior and keyboard dismissal

We use Jest for running tests and React Testing Library for validating user-visible behavior.

## Submission Checklist

- Feature-based architecture implemented
- Scalable CSS structure implemented
- Basic accessibility coverage included
- Real tests included and passing
- Lint, test, and production build all pass

## Getting Started

### What You Need
- Node.js version 18 or higher
- npm (comes with Node.js)

### Installation
```bash
npm install
```

### Development
```bash
npm run dev
```

Open [http://localhost:3000/dashboard](http://localhost:3000/dashboard)

### Testing
```bash
npm test -- --runInBand
```

### Production Build
```bash
npm run build
```

## API Details

The app includes a mock API endpoint:

**GET /api/wait-times**

Returns data in the shape:
```json
{
	"averageWaitTime": 45,
	"currentPatients": 12,
	"lastUpdated": "2026-04-08T10:00:00.000Z"
}
```

## Assessment Requirements Met

### Clean, Scalable Code
- Feature-based architecture with clear boundaries
- Shared hooks/utilities for cross-feature concerns
- Full TypeScript coverage across app code
- Predictable and maintainable state patterns

### Strong Component Design
- Components have clear responsibilities and small surfaces
- Custom hooks isolate business logic from UI
- Shared shell/components reduce duplication
- Memoization applied where it improves render behavior

### Good Testing Practices
- 11 automated tests covering hooks and components
- Polling/refetch behavior tested with fake timers
- Notification interactions and accessibility behavior tested
- Tests organized by feature area

### Performance and Accessibility
- Stable render patterns to avoid hydration drift
- Efficient server-state handling with caching and polling
- Semantic HTML and ARIA attributes across core UI
- Keyboard interactions supported in critical components

### Clear Documentation
- This README explains architecture and decisions
- Setup, test, and build commands are explicit
- API behavior is documented

## Future Improvements
- Staff lookup and patient search can evolve from route shells to full domains
- Notification persistence/history can be added using server storage
- Observability can be enhanced with telemetry and error tracking integrations
- CI quality gates can enforce lint/test/build on every pull request

---

Built for healthcare technology assessment with modern React patterns.
