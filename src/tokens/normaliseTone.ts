import type { Tone } from '../tokens/vocabulary';

/**
 * Accepts the 3.x `tone="default"` and returns the 4.x `neutral`.
 *
 * Deprecated in 4.0, removed in 5.0. When that happens this file is deleted and
 * the three call sites become plain prop reads — which is the point of having
 * one shim rather than three inlined fallbacks.
 */
export function normaliseTone<T extends Tone>(
  tone: T | 'default' | undefined,
  fallback: T,
  component: string,
): T {
  if (tone === 'default') {
    if (import.meta.env?.DEV) {
      console.warn(
        '[bighat] ' + component + ': tone="default" is deprecated and removed in 5.0. Use tone="neutral".',
      );
    }
    return fallback;
  }
  return tone ?? fallback;
}
