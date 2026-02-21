# @abbas-web-resume/ui

Shared UI components and utilities for the Abbas Web Resume monorepo.

## Components

This package contains all reusable UI components:

- **Button** - Button component with variants
- **Card** - Card container component
- **Container** - Layout container
- **Dock** - Dock navigation component
- **Drawer** - Drawer/sidebar component
- **Dropdown** - Dropdown menu component
- **Icon** - Icon wrapper component
- **Navigation** - Navigation component
- **Page** - Page layout component
- **Progress** - Progress indicator
- **Skill** - Skill display component
- **Stat** - Statistic display component
- **Stepper** - Step indicator component

## Utilities

- **cn** - Class name merger utility (clsx + tailwind-merge)

## Usage

```tsx
import { Button, Card, cn } from "@abbas-web-resume/ui";
// or
import Button from "@abbas-web-resume/ui/components/button";
import { cn } from "@abbas-web-resume/ui/lib/utils";
```

## Development

This package uses TypeScript and is designed to work with React 18+ and Tailwind CSS.
