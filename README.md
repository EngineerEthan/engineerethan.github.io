# GitHub Pages Site - React + Vite

A simple Hello World site built with React and Vite, deployed to GitHub Pages.

## Live Site

🌐 **https://engineerethan.github.io/**

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

## Project Structure

- `src/App.jsx` - Main React component with Hello World message
- `src/App.css` - Styling for the Hello World page
- `vite.config.js` - Vite configuration with GitHub Pages base path
- `.github/workflows/deploy.yml` - GitHub Actions workflow for automatic deployment
