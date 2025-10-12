# AGENTS.md

## Build Commands
- `npm run dev` - Start development server on port 3000
- `npm run build` - Build for production
- `npm run preview` - Preview production build

## Code Style Guidelines

### Imports & Types
- Use `import type` for type-only imports
- Import React components with `import React from 'react'`
- Use relative imports (e.g., `./components/PromptCard`)
- Group imports: React, third-party, local types, local components

### Component Conventions
- Use functional components with TypeScript interfaces for props
- Name components with PascalCase
- Export components as default: `export default ComponentName`
- Use `React.FC<PropsType>` for component typing

### State & Error Handling
- Use `useState` with explicit typing: `useState<string | null>(null)`
- Handle async errors with try-catch blocks
- Use `err.message || "fallback message"` pattern
- Console error for localStorage failures

### Naming & Formatting
- Use camelCase for variables and functions
- Use PascalCase for interfaces and types
- Italian UI strings, English code comments
- Use semantic HTML with proper aria-labels