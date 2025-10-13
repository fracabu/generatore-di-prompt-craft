# AGENTS.md

## Build Commands
- `npm run dev` - Start development server on port 3000
- `npm run build` - Build for production  
- `npm run preview` - Preview production build

## Testing & Linting
- TypeScript compilation: `npx tsc --noEmit` for type checking
- No test framework configured - add vitest/jest for testing
- No linting configured - consider adding ESLint for code quality

## Code Style Guidelines

### Imports & Types
- Use `import type` for type-only imports (e.g., `import type { SavedPrompt }`)
- Import React with `import React from 'react'`
- Use relative imports for local files (e.g., `./components/PromptCard`)
- Group imports: React, third-party libraries, local types, local components
- Use `@/*` path alias for root imports (configured in vite.config.ts)

### Component Conventions
- Use functional components with TypeScript interfaces for props
- Name components with PascalCase, export as default
- Use `React.FC<PropsType>` for component typing
- Use semantic HTML with proper aria-labels for accessibility

### State & Error Handling
- Use `useState` with explicit typing: `useState<string | null>(null)`
- Handle async errors with try-catch blocks
- Use `err.message || "fallback message"` pattern
- Console error for debugging, throw Italian error messages for users
- localStorage operations should handle potential failures gracefully

### Naming & Formatting
- camelCase for variables/functions, PascalCase for interfaces/types
- Italian UI strings, English code comments
- Tailwind CSS classes (slate/rose/sky color scheme)
- Responsive design with mobile-first approach using sm: breakpoints

### API Integration
- Store API keys in localStorage with provider prefixes (gemini_api_key, openai_api_key)
- Support both Gemini and OpenAI providers with consistent interfaces
- Use provider-specific error messages in Italian
- Handle API rate limits and network errors appropriately