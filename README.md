# ER CareView Dashboard

## Overview

This project implements a real-time emergency room dashboard that provides visibility into patient wait times across different priority levels.

The goal is to present key operational metrics in a clear, accessible, and responsive interface that supports quick decision-making in a high-pressure environment.

The dashboard automatically refreshes data every 30 seconds and displays:

* Critical patients (high priority)
* Urgent patients (medium priority)
* Standard patients (lower priority)

---

## Why this project

Emergency departments require fast access to accurate, up-to-date information. This dashboard provides a simple, at-a-glance view of wait times to help staff:

* prioritise patient care
* understand current load
* make informed operational decisions

---

## Key Features

### Real-time updates

* Data is refreshed automatically every 30 seconds using TanStack Query
* No manual refresh required
* Includes a "last updated" indicator for data transparency

---

### Responsive and clear UI

* Designed for quick scanning in time-sensitive environments
* Works across desktop, tablet, and mobile
* Consistent visual hierarchy for key metrics

---

### Loading and error handling

* Dedicated loading states for better user feedback
* Clear error states with user-friendly messages
* Graceful handling of failed API requests

---

### Accessibility considerations

* Semantic HTML structure (headings, sections)
* Keyboard-accessible interactions
* ARIA live region for dynamic updates
* Readable contrast and clear content hierarchy

---

## Technology Stack

* **Next.js** – application framework
* **React** – UI components
* **TypeScript** – type safety
* **TanStack Query** – server state management and caching
* **Jest + React Testing Library** – testing

---

## Project Structure

```text
src/
  app/                  # pages and API routes
  features/dashboard/   # dashboard feature logic and components
  shared/               # reusable components and utilities
  tests/                # test suite
```

---

## Running the project

### Install dependencies

```bash
npm install
```

### Start development server

```bash
npm run dev
```

Open:
http://localhost:3000/dashboard

---

## Running tests

```bash
npm test
```

The test suite covers:

* rendering of dashboard data
* loading and error states
* user interaction behaviour

---

## Performance considerations

* Server state is managed via TanStack Query to reduce unnecessary requests
* UI updates are scoped to relevant components
* Simple component structure avoids unnecessary complexity

---

## Notes

This implementation is intentionally scoped to align with the assessment time constraint, focusing on:

* clean architecture
* predictable data flow
* maintainability and clarity

---

Built as part of a technical assessment using modern React and Next.js patterns.
