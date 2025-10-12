# AGENTS.md

## Build Commands
- `npm run dev` - Start development server on port 3000
- `npm run build` - Build for production
- `npm run preview` - Preview production build

## Testing
- No test framework configured - add vitest/jest for testing
- Use browser testing for component validation

## Code Style Guidelines

### Imports & Types
- Use `import type` for type-only imports
- Import React components with `import React from 'react'`
- Use relative imports (e.g., `./components/PromptCard`)
- Group imports: React, third-party, local types, local components
- Use `@/*` path alias for root imports (configured in vite.config.ts)

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
- Throw Italian error messages for user-facing issues

### Naming & Formatting
- Use camelCase for variables and functions
- Use PascalCase for interfaces and types
- Italian UI strings, English code comments
- Use semantic HTML with proper aria-labels
- Tailwind CSS classes for styling (slate/rose/sky color scheme)

### API Integration
- Store API keys in localStorage with provider prefixes (gemini_api_key, openai_api_key)
- Use provider-specific error messages in Italian
- Implement proper error boundaries for API failures
- Support both Gemini and OpenAI providers with consistent interfaces