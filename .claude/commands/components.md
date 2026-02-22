---
description: Create a UI component using TDD (test-driven development)
allowed-tools: Read, Write, Edit, Glob, Bash(npm test:*), Bash(npx vitest:*)
argument-hint: "[Brief component description]"
---

## User Input

The user has provided information about the component to make: **$ARGUMENTS**

## Do This First:

From the component information above, determine a PascalCase component name (e.g., "a card showing user stats" - `UserStatsCard`).

## Your Task

1. Generate **tests first** using Vitest (`npx vitest`) for all expected functionality.

- Create `tests/components/[ComponentName].test.tsx` with 2-3 simple tests:
  - Test that the component renders
  - Test key elements are present (roles, text)

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

### 2. Run Tests (expect failure)

```bash
npm test tests/components/[ComponentName].test.tsx
```

### 3. Create a **React functional component** in TypeScript inside the Next.js app

    - `components/[ComponentName]/[ComponentName].tsx`
    - `components/[ComponentName]/index.ts` → `export { default } from './[ComponentName]'`

### 4. Run Tests (expect pass)

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

User input: `[Button component that toggles a dark mode]`

Generated output:

```ts
// Button.tsx
import React from 'react';

interface ButtonProps {
  onClick: () => void;
  label: string;
}

export const Button: React.FC<ButtonProps> = ({ onClick, label }) => {
  return (
    <button onClick={onClick} className="px-4 py-2 bg-primary text-white rounded-md">
      {label}
    </button>
  );
};
```

Conventions: theme colors from global.css when needed.

### Add to Preview Page

Update `app/(public)/preview/page.tsx` with a labeled section showing the section.

## Rules

- Keep tests minimal
- Must generate tests BEFORE component implementation.
