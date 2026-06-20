/**
 * Base mock for Contentful GraphQL system properties
 */
export const mockContentfulSys = () => ({
  id: "mock-sys-id",
  spaceId: "mock-space",
  environmentId: "mock-env",
  publishedAt: new Date().toISOString(),
  firstPublishedAt: new Date().toISOString(),
  publishedVersion: 1,
});

/**
 * Utility to create strongly typed mock factory functions.
 * Usage: const createMockButton = createFactory<ContentfulButton>({ ...defaultProps })
 */
export function createFactory<T>(defaultProps: Partial<T>) {
  return (overrides?: Partial<T>): T =>
    ({
      ...defaultProps,
      ...overrides,
    }) as T;
}

// Example factory (You should replace `any` with your actual Contentful types once generated)
// export const createMockPage = createFactory<Page>({
//   __typename: 'Page',
//   sys: mockContentfulSys(),
//   title: 'Mock Page',
// })
