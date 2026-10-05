/**
 * Narrows a Contentful `Symbol` value (typed `string` by the GraphQL schema)
 * to a union generated from its `in` validation. Unknown values fall back.
 */
export function narrowUnion<const T extends readonly string[], F>(
  allowed: T,
  value: string | null | undefined,
  fallback: F
): T[number] | F {
  return allowed.find((candidate) => candidate === value) ?? fallback;
}
