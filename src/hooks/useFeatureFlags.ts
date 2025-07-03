import { FEATURE_FLAGS, isFeatureEnabled, type FeatureFlags } from '@/constants/featureFlags'

/**
 * Custom hook for accessing feature flags
 * 
 * This hook provides a React-friendly way to access feature flags
 * and could be extended to support runtime updates in the future.
 * 
 * @example
 * ```tsx
 * const { showProjects, isEnabled } = useFeatureFlags()
 * 
 * if (showProjects) {
 *   return <ProjectGrid />
 * }
 * 
 * // Or check a specific feature
 * if (isEnabled('showContactButtons')) {
 *   return <ContactButtons />
 * }
 * ```
 */
export function useFeatureFlags() {
  return {
    ...FEATURE_FLAGS,
    isEnabled: (feature: keyof FeatureFlags) => isFeatureEnabled(feature),
  }
}
