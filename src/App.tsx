import { Suspense, lazy } from 'react'
import ErrorBoundary from './components/ErrorBoundary'
import Layout from './components/Layout'
import Hero from './components/Hero'
import About from './components/About'
import Contact from './components/Contact'
import './App.css'

// Lazy load components for better performance
const ProjectGrid = lazy(() => import('./components/ProjectGrid'))

function App() {
  return (
    <ErrorBoundary>
      <Layout>
        <Hero />
        <Suspense fallback={
          <div className="flex items-center justify-center py-24">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-400" />
          </div>
        }>
          <ProjectGrid />
        </Suspense>
        <About />
        <Contact />
      </Layout>
    </ErrorBoundary>
  )
}

export default App
