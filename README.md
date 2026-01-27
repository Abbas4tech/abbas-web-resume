# Abbas Web Resume - Turborepo Monorepo

<img width="1366" height="957" alt="image" src="https://github.com/user-attachments/assets/adb153f3-1ef4-489c-8cd4-cdc53c728f58" />

This is a Turborepo monorepo containing the Abbas Web Resume project and its related tools.

## What's Inside?

This monorepo includes the following packages and apps:

### Apps

- **`abbas-resume`**: The main Next.js web application (portfolio/resume website)
- **`abbas-resume-e2e`**: End-to-end testing suite using Playwright

### Packages

- **`@abbas-web-resume/ui`**: Shared UI components and utilities

## Tech Stack

- **Framework**: Next.js 14
- **Styling**: Tailwind CSS 4, DaisyUI
- **CMS**: Contentful (with GraphQL/Apollo Client)
- **Testing**: Playwright
- **Monorepo**: Turborepo
- **Linting & Formatting**: Biome
- **Package Manager**: pnpm with workspaces

## Getting Started

### Prerequisites

- Node.js >= 20.0.0
- pnpm >= 9.0.0

### Installation

```bash
# Install pnpm globally if you haven't
npm install -g pnpm

# Install all dependencies
pnpm install

# Install Playwright browsers (for e2e tests)
cd apps/abbas-resume-e2e
npx playwright install
```

### Development

```bash
# Run all apps in development mode
pnpm dev

# Run specific app
pnpm --filter @abbas-web-resume/abbas-resume dev

# Run e2e tests
pnpm test:e2e
```

### Build

```bash
# Build all apps
pnpm build

# Build specific app
pnpm --filter @abbas-web-resume/abbas-resume build
```

### Linting & Formatting

```bash
# Run linter
pnpm lint

# Format code
pnpm format

# Check and fix issues
pnpm check
```

## Environment Variables

Create a `.env` file in the root directory:

```env
# Contentful Configuration
CONTENTFUL_SPACE_ID=your_space_id
CONTENTFUL_ACCESS_TOKEN=your_access_token
CONTENTFUL_ENVIRONMENT=master
```

## MCP Configuration

This project includes MCP (Model Context Protocol) configuration for enhanced development experience with Contentful and Playwright. See `mcp.json` for configuration.

## Project Structure

```
abbas-web-resume/
├── apps/
│   ├── abbas-resume/          # Main Next.js application
│   └── abbas-resume-e2e/      # Playwright e2e tests
├── packages/
│   └── ui/                    # Shared UI components
├── biome.json                 # Biome configuration
├── turbo.json                 # Turborepo configuration
├── mcp.json                   # MCP servers configuration
├── pnpm-workspace.yaml        # pnpm workspace configuration
└── package.json               # Root package.json
```

## Useful Links

- [Turborepo Documentation](https://turbo.build/repo/docs)
- [Next.js Documentation](https://nextjs.org/docs)
- [Playwright Documentation](https://playwright.dev)
- [Biome Documentation](https://biomejs.dev)
- [pnpm Documentation](https://pnpm.io)
- [Contentful Documentation](https://www.contentful.com/developers/docs/)
- [Model Context Protocol](https://modelcontextprotocol.io)

## License

Private project
