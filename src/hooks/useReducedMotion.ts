import { useMediaQuery } from './useMediaQuery'

/**
 * Returns true if the user has enabled the "prefers-reduced-motion" OS setting.
 * Useful for disabling or toning down GSAP / Lenis animations.
 *
 * @example
 * const reduced = useReducedMotion()
 * if (reduced) gsap.set(el, { clearProps: 'all' })
 */
export function useReducedMotion(): boolean {
  return useMediaQuery('(prefers-reduced-motion: reduce)')
}
