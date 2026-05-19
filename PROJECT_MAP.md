# Learninium — Project Map

> Generated: 2026-05-19
> Last build: ✅ 0 errors, 0 warnings
> Strict Architectural Baseline — Do not deviate without documented justification.

---

## [TECH_STACK]

| Layer          | Technology              | Version      | Notes                                     |
| -------------- | ----------------------- | ------------ | ----------------------------------------- |
| Runtime        | Node.js                 | 22.18.0      | LTS                                       |
| Language       | TypeScript              | 6.0.3        | Strict mode                               |
| Framework      | SvelteKit               | 2.60.1       | Svelte 5.55.8 (runes mode)                |
| Styling        | Tailwind CSS            | 4.3.0        | CSS-first config (`@theme`), no PostCSS   |
| Vite Plugin    | @tailwindcss/vite       | 4.3.0        | Bundled with Tailwind v4                  |
| DB / Auth      | @supabase/supabase-js   | 2.106.0      | Passkey (WebAuthn) support                |
| SSR Auth       | @supabase/ssr           | 0.10.3       | Cookie-based session for SvelteKit        |
| Adapter        | @sveltejs/adapter-auto  | 7.0.1        | Deploys to Vercel / Cloudflare / Node      |
| Code Quality   | svelte-check            | 4.4.8        | Type-checking *.svelte files              |
| Build          | Vite                    | 8.0.13       | Bundled with SvelteKit                    |

**No other dependencies without explicit approval.** No PostCSS, no SCSS, no component library, no state library (Svelte runes + stores are sufficient).

---

## [SYSTEM_FLOW]

### Auth Flow (Passkeys via Supabase WebAuthn)

```
User → [Auth Page] → Create Passkey → Supabase Auth → JWT Cookie → SvelteKit Hook
   ↓
[Session Valid?] → [hooks.server.ts: refresh session] → [route load: guard by role]
   ↓
Redirect to role-based dashboard (/dashboard/{admin|teacher|student})
```

### Data Flow

```
[SvelteKit Load Function / Form Action]
   → hooks.server.ts (inject Supabase server client)
   → $lib/server/db/ (query helpers)
   → Supabase REST / Realtime
   → Return data to page component

[Client-side]
   → $lib/client/db/ (browser Supabase client)
   → Direct queries (real-time subs, mutations)
```

### User Journeys (Verifiable Goals)

| Actor    | Entry          | Key Pages                        | Verifiable Outcome                           |
| -------- | -------------- | -------------------------------- | -------------------------------------------- |
| Student  | `/` → `/auth`  | Dashboard, Course, Search, Profile | Enrolls in course, views content, searches  |
| Teacher  | `/` → `/auth`  | Dashboard, Course management     | Creates/edits courses, sees student list     |
| Admin    | `/` → `/auth`  | Dashboard, User management       | Manages roles, views platform stats          |

---

## [ARCHITECTURE]

### Directory Structure (Domain-Driven, Flat-by-Feature)

```
src/
├── app.html                    # HTML shell
├── app.css                     # Tailwind v4 import + @theme design tokens
├── app.d.ts                    # Global type augmentations
│
├── lib/
│   ├── server/
│   │   ├── db/
│   │   │   └── index.ts        # Supabase server client factory
│   │   ├── auth/
│   │   │   └── guard.ts        # Role-based route guards
│   │   └── logging/
│   │       └── logger.ts       # Async structured logger (file/console)
│   │
│   ├── client/
│   │   ├── db/
│   │   │   └── index.ts        # Supabase browser client singleton
│   │   └── auth/
│   │       └── passkey.ts      # Passkey register/authenticate helpers
│   │
│   ├── components/
│   │   ├── ui/                 # Primitive components (Button, Card, Input, Modal, Skeleton)
│   │   ├── layout/             # AppShell, Header, Sidebar, Footer
│   │   └── features/           # Domain-specific (CourseCard, SearchBar, DashboardStat)
│   │
│   ├── types/
│   │   ├── supabase.ts         # Generated Supabase types (Database interface)
│   │   └── app.ts              # App-specific types (User, Course, Role, etc.)
│   │
│   └── utils/
│       ├── cn.ts               # clsx + tailwind-merge helper
│       └── format.ts           # Date/number formatters
│
├── routes/
│   ├── +layout.svelte          # Root layout (AppShell + auth init)
│   ├── +page.svelte            # Home page
│   │
│   ├── auth/
│   │   ├── login/
│   │   │   └── +page.svelte    # Passkey login
│   │   ├── register/
│   │   │   └── +page.svelte    # Registration + passkey creation
│   │   └── callback/
│   │       └── +page.svelte    # OAuth/SSO callback handler
│   │
│   ├── dashboard/
│   │   ├── +layout.svelte      # Dashboard layout (sidebar nav)
│   │   ├── admin/
│   │   │   └── +page.svelte    # Admin dashboard
│   │   ├── teacher/
│   │   │   └── +page.svelte    # Teacher dashboard
│   │   └── student/
│   │       └── +page.svelte    # Student dashboard
│   │
│   ├── course/
│   │   └── [id]/
│   │       └── +page.svelte    # Course detail page
│   │
│   ├── teacher/
│   │   └── [id]/
│   │       └── +page.svelte    # Teacher profile page
│   │
│   ├── student/
│   │   └── [id]/
│   │       └── +page.svelte    # Student profile page
│   │
│   └── search/
│       └── +page.svelte        # Search with filters
│
└── hooks/
    ├── client.ts               # Supabase browser client init
    └── server.ts               # Session refresh, cookie handling
```

### Key Design Decisions

| Decision | Choice | Rationale |
|----------|--------|-----------|
| Styling approach | Tailwind v4 `@theme` directives | CSS-first, no PostCSS/`tailwind.config.js`, smaller config surface |
| Auth session | Supabase SSR cookies | Server-first auth, no JWT on client, CSRF-safe |
| State management | Svelte runes (`$state`, `$derived`) | Built into Svelte 5, zero deps |
| API surface | SvelteKit form actions + load functions | No Express/Fastify server, stays in framework |
| DB access pattern | Server client in `load` functions | RLS enforced at DB level, no ORM overhead |
| Component granularity | Medium-grained (no micro-files) | Each feature component is 1 file unless >400 lines |

### Design Tokens (Tailwind v4 `@theme`)

```css
@import "tailwindcss";

@theme {
  --color-primary: #4F46E5;     /* Indigo-600 — modern, trusted, universally liked */
  --color-secondary: #F59E0B;   /* Amber-500 — warmth, energy, engagement */
  --color-accent: #10B981;      /* Emerald-500 — fresh, growth, learning */
  --color-surface: #FAFAF9;     /* Stone-50 — warm off-white, inviting */
  --color-surface-alt: #F5F5F4; /* Stone-100 — warm light gray */
  --color-text: #1C1917;        /* Stone-900 — warm dark */
  --color-text-muted: #78716C;  /* Stone-500 — warm medium gray */
  --color-success: #10b981;
  --color-warning: #f59e0b;
  --color-error: #ef4444;
  --radius-button: 0.75rem;
  --radius-card: 1rem;
}
```

---

## [LOGGING]

### Async Logger (`$lib/server/logging/logger.ts`)

```typescript
// Minimal, non-blocking, structured JSON logging
// Levels: error | warn | info | debug
// Always async (fire-and-forget via queue), never blocks request
// Output: stdout (JSON lines) + optional file in production
// No external logging library — built-in only
```

Design:
- Single `log(level, message, context?)` function
- Internal micro-task queue (flushed on `process.beforeExit`)
- No Pino/Winston dependency — prevents bundle bloat
- Structured JSON for log ingestion (CloudWatch, Logtail, etc.)

---

## [COMPLETED]

| Milestone | Status | Key Files |
|-----------|--------|-----------|
| **M1 — Foundation** | ✅ Done | `hooks.server.ts`, `hooks.client.ts`, `vite.config.ts`, `app.css`, `app.html` |
| **M2 — Auth System** | ✅ Done | Auth pages (login/register/logout/callback), Dashboards (admin/teacher/student), Role guards, Session management |
| **Passkey Flow** | ✅ Done | `$lib/client/auth/passkey.ts` — WebAuthn via Supabase `signInWithPasskey()` / `registerPasskey()`. Login page shows passkey-first UI. Register page offers passkey enrollment after account creation. Requires `auth.experimental.passkey: true` in Supabase project. |
| **M3 — Content Pages** | ✅ Done | Course page, Teacher profile, Student profile, Search page (all with Supabase queries) |
| **M4 — UX Polish** | ✅ Done | Page transitions (fly), Error boundary, Skeleton component, Custom scrollbar, Selection styling |

### Build Status: `npm run build` + `npm run check` — 0 errors, 0 warnings

---

## [ORPHANS & PENDING]

| Item | Status | Action |
|------|--------|--------|
| Supabase schema & migration | Pending | Define tables: profiles (roles), courses, enrollments, categories. Run migration. |
| Supabase project setting `auth.experimental.passkey: true` | Pending | Must be enabled in Supabase dashboard for passkey API to work |
| RLS policies | Pending | Row-level security per role per table |
| Seed data | Pending | Dev seed script for courses/teachers/students |
| E2E tests | Pending | Playwright for auth flows |
| Accessibility audit | Pending | Keyboard nav, screen reader, contrast |
| Deployment config | Pending | Vercel + Supabase project link, env vars |
| Supabase TypeScript types | Pending | Run `supabase gen types typescript --linked` for full type safety |
