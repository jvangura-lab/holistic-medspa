/**
 * Motion eases — single source of truth for GSAP custom eases.
 *
 * Mirrors CSS tokens in app/globals.css @theme:
 *   --ease-veil:   cubic-bezier(0.22, 1, 0.36, 1)
 *   --ease-draw:   cubic-bezier(0.16, 1, 0.3, 1)
 *   --ease-settle: cubic-bezier(0.65, 0, 0.35, 1)
 *   --ease-expo:   cubic-bezier(0.19, 1, 0.22, 1)
 *
 * Call registerEases() once at app boot (done in SmoothScroll) so that any
 * tween can reference these eases by name string e.g. ease: "veil".
 */
import { gsap } from "gsap";
import { CustomEase } from "gsap/CustomEase";

let registered = false;

export function registerEases() {
  if (registered) return;
  if (typeof window === "undefined") return;
  gsap.registerPlugin(CustomEase);
  // CustomEase string format = "P0_x, P0_y, P1_x, P1_y" (two bezier control points,
  // start anchor 0,0 and end anchor 1,1 implied).
  CustomEase.create("veil", "0.22, 0, 0.36, 1");
  CustomEase.create("draw", "0.16, 0, 0.3, 1");
  CustomEase.create("settle", "0.65, 0, 0.35, 1");
  CustomEase.create("expo-out", "0.19, 0, 0.22, 1");
  registered = true;
}

export const EASE = {
  veil: "veil",
  draw: "draw",
  settle: "settle",
  expoOut: "expo-out",
} as const;
