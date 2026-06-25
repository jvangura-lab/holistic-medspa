/**
 * prefersReducedMotion — SSR-safe matcher.
 * Returns true when the user has OS-level reduced-motion enabled.
 */
export function prefersReducedMotion(): boolean {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}
