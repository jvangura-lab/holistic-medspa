// Minimal classnames helper — DS uses no twMerge / cva to keep bundle lean.
export function cn(...parts: Array<string | false | null | undefined>): string {
  return parts.filter(Boolean).join(" ");
}
