import { Suspense, lazy } from 'react'
import ErrorBoundary from './components/ErrorBoundary'
import Hero from './components/Hero'
import Layout from './components/Layout'
import { useFeatureFlags } from './hooks/useFeatureFlags'
import './App.css'

// Lazy load components for better performance
const ProjectGrid = lazy(() => import('./components/ProjectGrid'))
const About = lazy(() => import('./components/About'))
const Contact = lazy(() => import('./components/Contact'))

const LoadingSpinner = () => (
  <div className="flex items-center justify-center py-24">
    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-400" />
  </div>
)

function App() {
  const { showProjects } = useFeatureFlags()

  return (
    <ErrorBoundary>
      <Layout>
        <Hero />
        {showProjects && (
          <Suspense fallback={<LoadingSpinner />}>
            <ProjectGrid />
          </Suspense>
        )}
        <Suspense fallback={<LoadingSpinner />}>
          <About />
        </Suspense>
        <Suspense fallback={<LoadingSpinner />}>
          <Contact />
        </Suspense>
      </Layout>
    </ErrorBoundary>
  )
}

export default App
