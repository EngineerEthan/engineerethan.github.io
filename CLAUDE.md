# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Structure

This is a React + TypeScript portfolio website deployed to GitHub Pages. The main application code is in the `portfolio/` directory.

**Key Architecture:**
- **React 19** with **TypeScript** for type safety
- **Vite** for build tooling and development server
- **TailwindCSS** for styling with custom color palette (primary/accent theme)
- **Vitest** for testing with jsdom environment
- **Component-based architecture** with lazy loading for performance
- **Error boundaries** for graceful error handling
- **Custom hooks** for local storage and visitor tracking
- **Mono-repository structure** with portfolio app in subdirectory

## Development Commands

All commands must be run from the `portfolio/` directory:

```bash
# Development
npm install          # Install dependencies
npm run dev         # Start development server
npm run build       # Build for production
npm run preview     # Preview production build

# Code Quality
npm run lint        # Run ESLint
npm run lint:fix    # Auto-fix ESLint issues
npm run format      # Format code with Prettier
npm run format:check # Check formatting

# Testing
npm run test        # Run tests with Vitest
npm run test:ui     # Run tests with UI
npm run test:coverage # Run tests with coverage

# Deployment
npm run deploy      # Deploy to GitHub Pages (manual)
```

## Code Conventions

Based on the Copilot instructions and existing code patterns:

- **Follow existing patterns exactly** - never refactor for style unless explicitly requested
- **Use "Given" instead of "With"** in test names
- **No explanatory test comments** for "Arrange", "Act", or "Assert"
- **Think like a senior engineer** - maintain high code quality standards
- **Format code identically** to other code in the same directory

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
- **Manual deployment** available via `npm run deploy`
- **GitHub Pages** configuration with proper base path setup
- **Build artifacts** deployed from `dist/` directory

## Development Notes

- The app is transitioning from JSX to TypeScript (both .jsx and .tsx files present)
- Custom color palette with primary (blue) and accent (amber) themes
- Heroicons used for consistent iconography
- Error boundary implementation for production stability