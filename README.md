# Engineer Ethan - Portfolio Website

A portfolio website showcasing software engineering projects and experience, built with React 19, TypeScript, and TailwindCSS.

## Live Site

🌐 **https://engineerethan.github.io/**

## Features

- **Portfolio**: Showcases software engineering projects from BitcoinIRA, Choice App, Syngenta CropWise, and personal ventures
- **Modern Tech Stack**: React 19 with TypeScript, TailwindCSS, and Vite for optimal performance
- **Responsive Design**: Mobile-first approach with custom animations and transitions
- **Performance Optimized**: Lazy loading, code splitting, and error boundaries
- **Contact Form**: Integrated contact form and social media links

## Development

```bash
# Install dependencies
pnpm install

# Start development server
pnpm run dev

# Build for production
pnpm run build

# Preview production build
pnpm run preview

# Code quality
pnpm run lint        # Run Biome linting
pnpm run format      # Format code
pnpm run test        # Run tests with Vitest
```

## Deployment

This site is automatically deployed to GitHub Pages using GitHub Actions when you push to the main branch.

### Manual Deployment

If you need to deploy manually:

```bash
# Build the project
pnpm run build

# Deploy to GitHub Pages
pnpm run deploy
```

## Tech Stack

- **Frontend**: React 19, TypeScript, TailwindCSS
- **Build Tool**: Vite with optimized chunking
- **Testing**: Vitest with React Testing Library
- **Code Quality**: Biome for linting and formatting
- **Icons**: Heroicons for consistent iconography
- **Deployment**: GitHub Actions → GitHub Pages

## Project Structure

```
src/
├── components/          # React components
│   ├── Layout.tsx      # Main layout with header/footer
│   ├── Hero.tsx        # Landing section
│   ├── About.tsx       # About section
│   ├── ProjectGrid.tsx # Portfolio projects display
│   ├── Contact.tsx     # Contact form and social links
│   └── ErrorBoundary.tsx # Error handling
├── constants/          # Configuration and data
│   ├── data.ts        # Project portfolio data
│   └── featureFlags.ts # Feature toggles
├── hooks/             # Custom React hooks
│   ├── useLocalStorage.ts
│   ├── useVisitorStatus.ts
│   └── usePageTransition.ts
├── types/             # TypeScript type definitions
└── utils/             # Helper utilities
```
