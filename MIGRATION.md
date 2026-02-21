# Migration to Turborepo - Setup Guide

This document outlines the changes made during the migration to Turborepo and how to set up the project.

## What Changed?

### Project Structure

The project has been converted from a single Next.js app to a Turborepo monorepo:

```
Before:
abbas-web-resume/
├── src/
├── public/
├── package.json
├── next.config.mjs
└── ...

After:
abbas-web-resume/
├── apps/
│   ├── abbas-resume/       # Original Next.js app
│   └── abbas-resume-e2e/   # New Playwright e2e tests
├── packages/
│   └── mcp-servers/
│       ├── contentful-mcp/ # Contentful MCP server
│       └── playwright-mcp/ # Playwright MCP server
├── turbo.json
├── mcp.json
└── package.json (root)
```

### ESLint → Biome

- **Removed**: ESLint configuration (`eslint.config.mjs`)
- **Added**: Biome for faster linting and formatting (`biome.json`)
- **Benefits**: 
  - Much faster than ESLint
  - Built-in formatter (replaces Prettier)
  - Single tool for linting and formatting

### New Features

1. **End-to-End Testing**: Complete Playwright test suite in `apps/abbas-resume-e2e`
2. **MCP Servers**: Two Model Context Protocol servers for better development experience:
   - Contentful MCP: Query and manage Contentful content
   - Playwright MCP: Run and manage tests programmatically

## Setup Instructions

### 1. Install Dependencies

```bash
# Install all dependencies for all workspaces
npm install

# Install Playwright browsers
cd apps/abbas-resume-e2e
npx playwright install
cd ../..
```

### 2. Environment Variables

Copy `.env.example` to `.env` and fill in your Contentful credentials:

```bash
cp .env.example .env
```

Edit `.env`:
```env
CONTENTFUL_SPACE_ID=your_actual_space_id
CONTENTFUL_ACCESS_TOKEN=your_actual_token
CONTENTFUL_ENVIRONMENT=master
```

### 3. Build MCP Servers (Optional)

If you want to use the MCP servers:

```bash
# Build Contentful MCP server
npm run build --workspace=@abbas-web-resume/contentful-mcp

# Build Playwright MCP server
npm run build --workspace=@abbas-web-resume/playwright-mcp
```

### 4. Development

```bash
# Run the main app in development mode
npm run dev

# Or run specific workspace
npm run dev --workspace=@abbas-web-resume/abbas-resume
```

### 5. Running Tests

```bash
# Run e2e tests (make sure dev server is running or it will start automatically)
npm run test:e2e

# Or directly in the e2e app
cd apps/abbas-resume-e2e
npm run test:e2e
```

## Common Commands

### Development
```bash
npm run dev                # Run all apps in dev mode
npm run build              # Build all apps
npm run start              # Start all production builds
```

### Linting & Formatting
```bash
npm run lint               # Lint all workspaces
npm run format             # Format all code
npm run check              # Check and auto-fix issues
```

### Testing
```bash
npm run test:e2e           # Run e2e tests
npm run test:e2e:ui        # Run e2e tests in UI mode
npm run test:e2e:headed    # Run e2e tests with visible browser
```

### Workspace-Specific Commands
```bash
# Run command in specific workspace
npm run <command> --workspace=<workspace-name>

# Examples:
npm run dev --workspace=@abbas-web-resume/abbas-resume
npm run build --workspace=@abbas-web-resume/abbas-resume-e2e
```

## Turborepo Features

### Caching

Turborepo automatically caches build outputs and test results. This means:
- Subsequent builds are much faster
- Only changed packages are rebuilt
- CI/CD pipelines run faster

### Parallel Execution

Turborepo runs tasks in parallel when possible:
- Multiple packages can build simultaneously
- Tasks respect dependency order
- Better utilization of CPU cores

### Filtering

Run tasks only for specific apps/packages:

```bash
# Run dev for only the main app
turbo run dev --filter=@abbas-web-resume/abbas-resume

# Run build for e2e app and its dependencies
turbo run build --filter=@abbas-web-resume/abbas-resume-e2e...
```

## Biome Setup

Biome replaces both ESLint and Prettier with a single, faster tool.

### VS Code Integration

Install the Biome extension:
1. Open VS Code
2. Go to Extensions (Ctrl+Shift+X)
3. Search for "Biome"
4. Install the official Biome extension

### Configuration

The configuration is in `biome.json` at the root. It includes:
- Formatting rules (matching your previous Prettier setup)
- Linting rules (matching your previous ESLint setup)
- Import sorting

## MCP Servers Usage

### Contentful MCP Server

Located in `packages/mcp-servers/contentful-mcp/`

**Available Tools:**
- `contentful_get_entries`: Get entries by content type
- `contentful_get_entry`: Get single entry by ID
- `contentful_search_entries`: Full-text search
- `contentful_get_content_types`: List all content types
- `contentful_get_asset`: Get asset by ID

### Playwright MCP Server

Located in `packages/mcp-servers/playwright-mcp/`

**Available Tools:**
- `playwright_run_tests`: Run tests with options
- `playwright_list_tests`: List all tests
- `playwright_show_report`: Open test report
- `playwright_debug_test`: Debug specific test
- `playwright_generate_test`: Generate test using Codegen

### Using MCP Servers

The `mcp.json` file at the root configures both servers. They can be used with any MCP-compatible client or tool.

## Troubleshooting

### Build Errors

If you encounter build errors:

```bash
# Clean all build outputs and node_modules
rm -rf node_modules apps/*/node_modules packages/*/*/node_modules
rm -rf apps/*/.next apps/*/dist packages/*/*/dist

# Reinstall
npm install

# Rebuild
npm run build
```

### Turbo Cache Issues

If you suspect cache issues:

```bash
# Clear Turbo cache
rm -rf .turbo

# Run with no cache
turbo run build --no-cache
```

### Port Already in Use

If port 3000 is already in use:

```bash
# Kill process on port 3000 (Windows)
netstat -ano | findstr :3000
taskkill /PID <PID> /F

# Or change port
PORT=3001 npm run dev
```

## Migration Checklist

- [x] Convert to Turborepo structure
- [x] Move app to `apps/abbas-resume`
- [x] Create e2e testing app
- [x] Remove ESLint, add Biome
- [x] Create Contentful MCP server
- [x] Create Playwright MCP server
- [x] Create `mcp.json` configuration
- [x] Update documentation
- [ ] Run initial tests
- [ ] Update CI/CD pipelines (if any)
- [ ] Deploy updated structure

## Next Steps

1. **Run the development server** to ensure everything works
2. **Run the e2e tests** to verify the testing setup
3. **Update CI/CD pipelines** to use Turborepo commands
4. **Configure the MCP servers** with your tools/IDE
5. **Update deployment configuration** (Vercel, etc.) to point to `apps/abbas-resume`

## Additional Resources

- [Turborepo Handbook](https://turbo.build/repo/docs/handbook)
- [Biome Documentation](https://biomejs.dev/guides/getting-started/)
- [Playwright Best Practices](https://playwright.dev/docs/best-practices)
- [Model Context Protocol Spec](https://modelcontextprotocol.io/docs)
