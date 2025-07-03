import ErrorBoundary from './components/ErrorBoundary'
import Layout from './components/Layout'
import Hero from './components/Hero'
import ProjectGrid from './components/ProjectGrid'
import './App.css'

function App() {
  return (
    <ErrorBoundary>
      <Layout>
        <Hero />
        <ProjectGrid />
      </Layout>
    </ErrorBoundary>
  )
}

export default App
