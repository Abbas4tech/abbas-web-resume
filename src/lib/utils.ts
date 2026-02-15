import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export const cn = (...inputs: ClassValue[]): string => twMerge(clsx(inputs));

/**
 * Ensures the input string starts with a leading slash '/'.
 * If it already does, returns unchanged. Useful for URL paths in React/Next.js routing.
 *
 * @param path - The input string (e.g., 'about' or '/about')
 * @returns The normalized path (e.g., '/about')
 */
export function getSanitizedPath(path: string): string {
  return path.startsWith("/") ? path : `/${path}`;
}
