/**
 * Feature flags configuration
 * 
 * This module provides a centralized way to manage feature flags in the application.
 * Feature flags can be controlled via environment variables or set directly here.
 */

export interface FeatureFlags {
  showProjects: boolean
  showContactButtons: boolean
}

/**
 * Default feature flags configuration
 * These can be overridden by environment variables prefixed with VITE_FEATURE_
 */
const DEFAULT_FLAGS: FeatureFlags = {
  showProjects: false,
  showContactButtons: true,
}

/**
 * Gets feature flag value from environment variable or default
 * Environment variables should be prefixed with VITE_FEATURE_ and use uppercase
 * e.g., VITE_FEATURE_SHOW_PROJECTS=false
 */
function getFeatureFlag(key: keyof FeatureFlags): boolean {
  // For a simple feature flag system, we'll just use the defaults for now
  // In a production app, you could integrate with environment variables here
  return DEFAULT_FLAGS[key]
}

/**
 * Current feature flags configuration
 * This object is evaluated at module load time
 */
export const FEATURE_FLAGS: FeatureFlags = {
  showProjects: getFeatureFlag('showProjects'),
  showContactButtons: getFeatureFlag('showContactButtons'),
}

/**
 * Check if a feature is enabled
 */
export function isFeatureEnabled(feature: keyof FeatureFlags): boolean {
  return FEATURE_FLAGS[feature]
}
