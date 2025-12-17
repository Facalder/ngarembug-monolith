# Frontend Architecture & User Roles

This project is structured as a **Cafe Repository Aggregator** (inspired by TripAdvisor). It serves two main purposes: looking up information and contributing to the database.

## User Roles (Login Functions)

The "User" in this system has two distinct modes. You can build your Login/Signup flow around these personas:

1.  **The Explorer (Consumption)**:
    -   **Goal**: Find a place to work, study, or meet.
    -   **Features**: Searching, Filtering, Reading Reviews, Viewing Photos.
    -   **Auth**: Optional (can explore without login), but logged-in users get "Saved Places" or "History".

2.  **The Contributor (Production)**:
    -   **Goal**: Share hidden gems and help the community.
    -   **Features**:
        -   **Submit Cafe**: Add new places to the database (Draft -> Admin Review).
        -   **Write Reviews**: Rate places they've visited.
        -   **Upload Photos**: Enrich existing pages.

## Folder Structure (`app/(fe)`)

The frontend is separated into the `(fe)` route group to keep it distinct from `dashboard` (Admin).

| Path | Page | Description | Role |
|---|---|---|---|
| `app/(fe)/page.tsx` | **Home** | Landing page. Features a simplified Hero search and "Top Rated" section. | Everyone |
| `app/(fe)/search/page.tsx` | **Search** | The main engine. Uses `useApiQuery` for fast, client-side filtering (Region, Price, etc). | Explorer |
| `app/(fe)/cafe/[slug]/page.tsx` | **Detail** | Comprehensive info page. Shows layout, facilities, and will show reviews. Server Component for SEO. | Explorer |
| `app/(fe)/submit/page.tsx` | **Submit** | A form for users to suggest new cafes. | Contributor |

## Key Technical Decisions

-   **`useApiQuery`**: The search page uses this custom hook to manage URL state (shareable links) and fetch data efficiently without full page reloads.
-   **Server Components**: The Detail page (`/cafe/[slug]`) is a Server Component to ensure good SEO and initial load performance.
-   **Shared UI**: Cards and Badges are reused from the component library to maintain consistency with the Admin Dashboard.
