import { memo } from 'react'

interface TransitionOverlayProps {
  isTransitioning: boolean
  transitionStage: 'idle' | 'pixelating-out' | 'instant-jump' | 'pixelating-in'
}

const TransitionOverlay = memo<TransitionOverlayProps>(({ isTransitioning, transitionStage }) => {
  if (!isTransitioning) return null

  return (
    <div className="fixed inset-0 z-50 pointer-events-none">
      {/* Pixelation OUT overlay - dissolving current content */}
      <div
        className={`absolute inset-0 transition-opacity duration-600 ${
          transitionStage === 'pixelating-out' ? 'opacity-100' : 'opacity-0'
        }`}
      >
        <div className="pixelation-out-overlay absolute inset-0 bg-gray-900" />
        {/* Add some sparkle effects during pixelation out */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary-400/20 via-transparent to-accent-400/20 animate-pulse" />
      </div>

      {/* Full cover during instant jump */}
      <div
        className={`absolute inset-0 bg-gray-900 transition-opacity duration-100 ${
          transitionStage === 'instant-jump' ? 'opacity-100' : 'opacity-0'
        }`}
      />

      {/* Pixelation IN overlay - materializing new content */}
      <div
        className={`absolute inset-0 transition-opacity duration-600 ${
          transitionStage === 'pixelating-in' ? 'opacity-100' : 'opacity-0'
        }`}
      >
        <div className="pixelation-in-overlay absolute inset-0 bg-gray-900" />
        {/* Add some glow effects during pixelation in */}
        <div className="absolute inset-0 bg-gradient-to-tr from-primary-400/10 via-transparent to-primary-600/10 animate-pulse" />
      </div>
    </div>
  )
})

TransitionOverlay.displayName = 'TransitionOverlay'

export default TransitionOverlay
