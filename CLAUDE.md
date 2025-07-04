# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Structure

This is a React + TypeScript portfolio website deployed to GitHub Pages. The main application code is in the root directory.

**Key Architecture:**
- **React 19** with **TypeScript** for type safety
- **Vite** for build tooling and development server
- **TailwindCSS** for styling with custom color palette (primary/accent theme)
- **Vitest** for testing with jsdom environment
- **Component-based architecture** with lazy loading for performance
- **Error boundaries** for graceful error handling
- **Custom hooks** for local storage and visitor tracking
- **pnpm** for package management with faster installs

## Development Commands

All commands must be run from the root directory:

```bash
# Development
pnpm install          # Install dependencies
pnpm run dev         # Start development server
pnpm run build       # Build for production
pnpm run preview     # Preview production build

# Code Quality
pnpm run lint        # Run ESLint
pnpm run lint:fix    # Auto-fix ESLint issues
pnpm run format      # Format code with Prettier
pnpm run format:check # Check formatting

# Testing
pnpm run test        # Run tests with Vitest
pnpm run test:ui     # Run tests with UI
pnpm run test:coverage # Run tests with coverage

# Deployment
pnpm run deploy      # Deploy to GitHub Pages (manual)
```

## Code Conventions

Based on the Copilot instructions and existing code patterns:

- **Follow existing patterns exactly** - never refactor for style unless explicitly requested
- **Use "Given" instead of "With"** in test names
- **No explanatory test comments** for "Arrange", "Act", or "Assert"
- **Think like a senior engineer** - maintain high code quality standards
- **Format code identically** to other code in the same directory
- **Commit messages** - use Commitizen conventional commit format: `type(scope): description`

## Component Architecture

- **Layout.tsx**: Main application layout with header/footer and navigation
- **Hero.tsx**: Landing section with introduction
- **ProjectGrid.tsx**: Lazy-loaded grid of portfolio projects
- **ProjectTile.tsx**: Individual project display component
- **ErrorBoundary.tsx**: Error handling wrapper
- **TypeScript interfaces** defined in `src/types/index.ts`
- **Project data** configured in `src/constants/data.ts`

## Key Features

- **Lazy loading** for performance optimization
- **Local storage** for visitor tracking
- **Responsive design** with mobile-first approach
- **Custom animations** using Tailwind keyframes
- **Manual chunk splitting** for vendor/heroicons bundles
- **Path aliasing** with `@/` pointing to `src/`

## Testing Setup

- **Vitest** configured with jsdom environment
- **Testing Library** for React component testing
- **Setup file** at `src/test/setup.ts` with jest-dom matchers
- **Global test configuration** in vite.config.js

## Deployment

- **Automatic deployment** via GitHub Actions on pushes to main branch
- **Manual deployment** available via `pnpm run deploy`
- **GitHub Pages** configuration with GitHub Actions as source
- **Build artifacts** deployed from `dist/` directory

## Development Notes

- Fully converted to TypeScript (.tsx files only, no .jsx files)
- Custom color palette with primary (blue) and accent (amber) themes
- Heroicons used for consistent iconography
- Error boundary implementation for production stability
- Image fallback handling in ProjectTile component for missing project images