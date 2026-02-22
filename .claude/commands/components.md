---
description: Create a UI component from a design snapshot using TDD
allowed-tools: Read, Write, Edit, Glob, Bash(npm test:*), Bash(npx vitest:*)
argument-hint: "[Brief component description] [optional: path to snapshot HTML]"
---

## User Input

The user has provided information about the component to make: **$ARGUMENTS**

It may include:

- A brief description (e.g., "Card showing user stats")
- Optional: `snapshotPath` pointing to `./design-snapshots/*.html` file

Example:
UserStatsCard ./design-snapshots/homepage-v1.html

## Do This First:

1. **Determine component name**: Parse description to create a PascalCase name (`UserStatsCard`).
2. **Determine snapshot path**: If provided, validate file exists in `./design-snapshots`.  
   If not, proceed using description only.
3. 3. Detect if component needs:
   - `useState`, `useEffect` → must add `"use client"`
   - Navigation → use `next/link`
   - Images → use `next/image`

### Images

- NEVER use `<img>`
- ALWAYS use:

```tsx
import Image from "next/image";
```

### Links

- NEVER use <a href="">
- ALWAYS use:

```tsx
import Link from "next/link";
```

## Your Task

1. **Extract the relevant HTML from snapshot (if provided)**

- Read the snapshot file
- Locate the DOM portion corresponding to the described component (use comments, `id`, or visual hints)
- Trim unnecessary `<head>` scripts/styles; keep **body content only**
- Identify semantic elements for testing (buttons, headings, text, images)

2. Generate **tests first** using Vitest (`npx vitest`) for all expected functionality.

- Create `tests/components/[ComponentName].test.tsx` with minimal tests:

Pattern:

```tsx
import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import ComponentName from "@/components/ComponentName";

describe("ComponentName", () => {
  it("renders successfully", () => {
    render(<ComponentName />);
    // assertions
  });
});
```

- Include extra assertions based on snapshot (e.g., images, buttons, aria roles)

### 3. Run Tests (expect failure)

```bash
npm test tests/components/[ComponentName].test.tsx
```

### 4. Create a **React functional component** in TypeScript inside the Next.js app

    - `components/[ComponentName]/[ComponentName].tsx`
    - `components/[ComponentName]/index.ts` → `export { default } from './[ComponentName]'`
    - Use extracted HTML as JSX skeleton
    - Convert class → className, inline styles → Tailwind/shadcn classes
    - Ensure semantic HTML and accessibility
    -

### 5. Run Tests (expect pass)

```bash
npm test tests/components/[ComponentName].test.tsx
```

Iterate on component development until all tests pass.

- Name files consistently:
  - Component: `ComponentName.tsx`
  - Test: `ComponentName.test.tsx`

- Ensure **accessibility (WCAG 2.1)** standards are followed (semantic HTML, aria attributes where needed).

- Use **Tailwind CSS / shadcn classes** if styling is required.
- Include **Prop types** using TypeScript interfaces.
- Ensure **reusability and modular design**.
- Return a structured output with:
  - Component code
  - Test code
  - Brief explanation (optional, inline as comments)

## Output Format

- `ComponentName.tsx` → React component
- `ComponentName.test.tsx` → Vitest test file

### Example:

User input: `Homepage Hero Card ./design-snapshots/homepage-v1.html`

Generated output:

```tsx
// HomepageHeroCard.tsx
import React from "react";

interface HomepageHeroCardProps {
  title: string;
  description: string;
}

export const HomepageHeroCard: React.FC<HomepageHeroCardProps> = ({
  title,
  description,
}) => {
  return (
    <section className="bg-white dark:bg-[#111a22] rounded-xl p-6 shadow-lg">
      <h2 className="text-2xl font-bold">{title}</h2>
      <p className="text-slate-600 dark:text-slate-400">{description}</p>
      <button className="bg-primary text-white px-4 py-2 rounded-lg mt-4">
        Submit a Request
      </button>
    </section>
  );
};
```

Conventions: theme colors from global.css when needed.

### Add to Preview Page

Update `app/(public)/preview/page.tsx` with a labeled section showing the section.

## Rules

- Keep tests minimal
- Must generate tests BEFORE component implementation.
