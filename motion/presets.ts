// Shared motion presets for `framer-motion`. Copy-source: import from here or copy into the project.
// Use only for springs/gestures/layout/sequences; simple fades and hovers stay CSS.
// Pair with `useReducedMotion()` + `reduced()` below.
import type { Transition, Variants } from "framer-motion";

export const spring = {
  snappy: { type: "spring", stiffness: 500, damping: 32 } as Transition,
  soft: { type: "spring", stiffness: 220, damping: 26 } as Transition,
  bouncy: { type: "spring", stiffness: 380, damping: 18 } as Transition,
};
export const duration = { fast: 0.15, base: 0.25, slow: 0.45 } as const;
export const ease = [0.22, 1, 0.36, 1] as const;

export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 12 },
  show: { opacity: 1, y: 0, transition: { duration: duration.base, ease } },
};
export const stagger = (gap = 0.06): Variants => ({
  hidden: {},
  show: { transition: { staggerChildren: gap } },
});
export const press = { whileTap: { scale: 0.97 }, transition: spring.snappy };

/** Respect prefers-reduced-motion: returns variants with transforms stripped. */
export function reduced(v: Variants, on: boolean): Variants {
  if (!on) return v;
  return { hidden: { opacity: 0 }, show: { opacity: 1, transition: { duration: 0 } } };
}
