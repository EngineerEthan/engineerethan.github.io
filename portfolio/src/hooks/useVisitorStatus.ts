import { useLocalStorage } from './useLocalStorage'

/**
 * Custom hook for tracking visitor status
 * @returns Whether the user is a returning visitor
 */
export function useVisitorStatus(): boolean {
  const [hasVisited, setHasVisited] = useLocalStorage('hasVisited', false)
  
  // Mark as visited if this is the first time
  if (!hasVisited) {
    setHasVisited(true)
  }
  
  return hasVisited
}
