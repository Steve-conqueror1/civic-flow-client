# CivicFlow | Frontend (Next.js + Redux)

**CivicFlow Frontend** is a modern, AI-enabled government services portal built with **Next.js**, demonstrating a privacy-first, accessible, and interactive citizen experience.

## 🌟 Project Overview

This frontend is designed to provide:

- A fast, responsive, and accessible web interface.
- Multi-step request flows with persistent state.
- AI-assisted service suggestions and dashboards for citizens.

---

## 🛠 Tech Stack (Frontend)

- **Framework:** Next.js 16 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **UI Components:** shadcn/ui (Radix UI)
- **Forms & Validation:** React Hook Form + Zod
- **State Management:** Redux Toolkit + TanStack Query (React Query)
- **Maps & Visualization:** Mapbox / Leaflet

---

## 💡 Key Frontend Highlights

- **Redux State Management:** Centralized store for citizen request flows, authentication, and dashboard state.
- **Privacy-First UX:** Avoids intrusive GPS tracking; focuses on actionable searches and visual context.
- **AI-Driven Suggestions:** UI components display AI-predicted service categories and confidence scores.
- **Design System:** Custom **shadcn/ui** theme with government-grade "Civic Blue" palette; WCAG 2.1 AA compliant.
- **Interactive Maps:** Integrated Mapbox/Leaflet layers for visual service insights.

---

## 📂 Frontend Architecture

```text
app/
├── (admin)/        # Admin dashboard and insights
├── (auth)/         # Authentication: Login, Register, MFA
├── (citizen)/      # Citizen dashboard, Request Wizard, Messaging
├── (public)/       # Landing page, Services Directory, Search
├── hooks/          # Custom React hooks
├── state/          # Redux store and slices
├── types/          # TypeScript type definitions
├── fonts.ts        # Font configuration
├── globals.css     # Global styles
├── layout.tsx      # Root layout for the app
├── page.tsx        # Main entry page
└── providers.tsx   # Context providers (Redux, QueryClient, etc.)

components/
├── dashboard/      # Domain-specific UI: Timelines, Stats, Charts
├── forms/          # Form components using React Hook Form + Zod
├── layouts/        # Shared layout components
├── maps/           # Mapbox/Leaflet components
├── shared/         # Reusable shared components
├── ui/             # shadcn/ui base components and custom theming
├── component-example.tsx  # Example component
└── example.tsx     # Example page component

lib/
├── utils.ts        # Utility functions
└── validators.ts   # Form validators

public/             # Static assets (images, fonts, icons)
```

---

## 🚦 Local Setup (Frontend Only)

```bash
# Clone the repository
git clone git@github.com:Steve-conqueror1/civic-flow-client.git
cd civic-flow-client/frontend

# Install dependencies
npm install

# Start development server
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev

# Open http://localhost:3000 in your browser
```

Developed with ❤️ by **Stephen Kilonzo**  
[GitHub](https://github.com/Steve-conqueror1) | [LinkedIn](https://www.linkedin.com/in/skilonzo/)
