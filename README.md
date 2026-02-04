# DevHive Users

User management dashboard built with Next.js, React, and TypeScript.

## How to Run

```bash
# Install dependencies
npm install

# Run the development server
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Architecture

### Tech Stack

- **Next.js 16** (App Router)
- **React 19**
- **TypeScript** (strict mode)
- **Tailwind CSS 4** for styling

### Project Structure

```
src/
  app/
    layout.tsx        # Root layout (Server Component) — fonts, metadata, global CSS
    page.tsx          # Home page (Server Component) — fetches users on the server
    globals.css       # Tailwind imports + CSS custom properties
  components/
    UserList.tsx      # Client component — orchestrates search, filter, edit
    UserCard.tsx      # Displays a single user row (memoized)
    UserEditForm.tsx  # Modal form for editing user details
    SearchFilter.tsx  # Search input + city dropdown (memoized)
  hooks/
    useUsers.ts       # Custom hook — user state, filtering, CRUD
    useDebounce.ts    # Generic debounce hook for search input
  types/
    user.ts           # TypeScript interfaces (User, UserFormData)
  lib/
    api.ts            # API fetch function with AbortSignal support
```

### Data Flow

1. **Server Component** (`page.tsx`) fetches users from JSONPlaceholder at build/request time.
2. Users are passed as `initialUsers` to the **Client Component** (`UserList`).
3. `UserList` delegates state management to the `useUsers` custom hook.
4. Filtering (search by name, filter by city) is computed inside the hook via `useMemo` — not in JSX.
5. Editing opens a modal (`UserEditForm`) that updates state locally via `updateUser`.

### Key Decisions

| Decision | Reasoning |
|---|---|
| Server Component for data fetching | Eliminates client-side loading spinner on first visit; HTML contains the full user list |
| `"use client"` only on interactive components | Minimises the client JS bundle |
| Custom `useUsers` hook | Separates business logic from presentation; testable in isolation |
| `useDebounce` for search | Prevents filtering on every keystroke (300ms delay) |
| `React.memo` on UserCard & SearchFilter | Avoids unnecessary re-renders when sibling state changes |
| `useCallback` for event handlers | Stable references prevent memoized children from re-rendering |
| `AbortController` in fetch | Cancels in-flight requests on unmount; prevents state updates on dead components |
| Controlled inputs in edit form | React owns form state; validation on submit with per-field error clearing |

## What I Would Improve in Production

- **Server-side persistence** — currently edits are local-only; add API mutations (PATCH/PUT)
- **Optimistic updates** — update UI immediately, roll back on server error
- **Pagination / virtualisation** — for large user lists (react-window or similar)
- **Form library** — React Hook Form for complex forms with schema validation (Zod)
- **Global state** — Zustand or React Query for cross-page cache and background refetching
- **Error boundary** — catch rendering errors gracefully with a fallback UI
- **Accessibility** — focus trapping in the modal, keyboard navigation, ARIA attributes
- **E2E tests** — Playwright or Cypress for critical user flows
- **Unit tests** — Jest + React Testing Library for hooks and components
