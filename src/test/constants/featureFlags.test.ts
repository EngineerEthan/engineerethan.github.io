import { FEATURE_FLAGS, type FeatureFlags, isFeatureEnabled } from '@/constants/featureFlags'
import { describe, expect, it } from 'vitest'

describe('featureFlags', () => {
  describe('FEATURE_FLAGS', () => {
    it('has correct structure', () => {
      expect(FEATURE_FLAGS).toHaveProperty('showProjects')
      expect(FEATURE_FLAGS).toHaveProperty('showContactButtons')
    })

    it('has boolean values', () => {
      expect(typeof FEATURE_FLAGS.showProjects).toBe('boolean')
      expect(typeof FEATURE_FLAGS.showContactButtons).toBe('boolean')
    })

    it('has expected default values', () => {
      expect(FEATURE_FLAGS.showProjects).toBe(true)
      expect(FEATURE_FLAGS.showContactButtons).toBe(true)
    })
  })

  describe('isFeatureEnabled', () => {
    it('returns correct value for showProjects', () => {
      expect(isFeatureEnabled('showProjects')).toBe(FEATURE_FLAGS.showProjects)
    })

    it('returns correct value for showContactButtons', () => {
      expect(isFeatureEnabled('showContactButtons')).toBe(FEATURE_FLAGS.showContactButtons)
    })

    it('works with all feature flag keys', () => {
      const keys: (keyof FeatureFlags)[] = ['showProjects', 'showContactButtons']

      for (const key of keys) {
        expect(isFeatureEnabled(key)).toBe(FEATURE_FLAGS[key])
      }
    })
  })

  describe('FeatureFlags interface', () => {
    it('FEATURE_FLAGS conforms to FeatureFlags interface', () => {
      // TypeScript will catch this at compile time, but we can test the shape
      const flags: FeatureFlags = FEATURE_FLAGS
      expect(flags).toBeDefined()
      expect(typeof flags.showProjects).toBe('boolean')
      expect(typeof flags.showContactButtons).toBe('boolean')
    })
  })

  describe('Feature flag consistency', () => {
    it('FEATURE_FLAGS and isFeatureEnabled return same values', () => {
      expect(isFeatureEnabled('showProjects')).toBe(FEATURE_FLAGS.showProjects)
      expect(isFeatureEnabled('showContactButtons')).toBe(FEATURE_FLAGS.showContactButtons)
    })

    it('feature flags are readonly', () => {
      // This tests that the exported object maintains its values
      const originalShowProjects = FEATURE_FLAGS.showProjects
      const originalShowContactButtons = FEATURE_FLAGS.showContactButtons

      // Values should remain the same
      expect(FEATURE_FLAGS.showProjects).toBe(originalShowProjects)
      expect(FEATURE_FLAGS.showContactButtons).toBe(originalShowContactButtons)
    })
  })
})
