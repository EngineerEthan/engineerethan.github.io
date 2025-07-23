import { useCallback, useState } from 'react'

interface TransitionState {
  isTransitioning: boolean
  targetSection: string | null
  transitionStage: 'idle' | 'pixelating-out' | 'instant-jump' | 'pixelating-in'
}

export const usePageTransition = () => {
  const [state, setState] = useState<TransitionState>({
    isTransitioning: false,
    targetSection: null,
    transitionStage: 'idle',
  })

  const navigateToSection = useCallback(
    (sectionId: string) => {
      if (state.isTransitioning) return

      setState({
        isTransitioning: true,
        targetSection: sectionId,
        transitionStage: 'pixelating-out',
      })

      // Stage 1: Pixelate current content away (300ms)
      setTimeout(() => {
        setState(prev => ({
          ...prev,
          transitionStage: 'instant-jump',
        }))

        // Instant jump to target section (no scroll animation)
        const element = document.getElementById(sectionId)
        if (element) {
          element.scrollIntoView({
            behavior: 'instant',
            block: 'start',
          })
        }

        // Stage 2: Brief moment for jump (50ms)
        setTimeout(() => {
          setState(prev => ({
            ...prev,
            transitionStage: 'pixelating-in',
          }))

          // Stage 3: Pixelate new content in (300ms)
          setTimeout(() => {
            setState({
              isTransitioning: false,
              targetSection: null,
              transitionStage: 'idle',
            })
          }, 300)
        }, 50)
      }, 300)
    },
    [state.isTransitioning]
  )

  return {
    ...state,
    navigateToSection,
  }
}
