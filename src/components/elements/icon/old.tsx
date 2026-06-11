"use client";

import { AlertCircle, Loader2 } from "lucide-react";
import dynamic from "next/dynamic";
import type { IconBaseProps, IconType } from "react-icons/lib";

import { cn } from "@/lib/utils";

// ---------------------------------------------------------------------------
// One next/dynamic() call per library — must be at module level so that
// webpack/turbopack can statically analyse the import() path and create a
// separate chunk for each icon set. Calling dynamic() inside a render
// function breaks code-splitting (see Next.js lazy-loading docs).
//
// Each loader resolves the whole sub-package module so we can index into it
// by icon name at render time, giving us a single chunk per library rather
// than one chunk per icon.
// ---------------------------------------------------------------------------

type IconModule = Record<string, IconType>;
type IconModuleLoader = () => Promise<IconModule>;

// Loaders return the full module record; we cast because every export in a
// react-icons sub-package is an IconType.
const ICON_LIBS: Record<string, IconModuleLoader> = {
  fa: () => import("react-icons/fa") as unknown as Promise<IconModule>,
  fa6: () => import("react-icons/fa6") as unknown as Promise<IconModule>,
  si: () => import("react-icons/si") as unknown as Promise<IconModule>,
  hi: () => import("react-icons/hi") as unknown as Promise<IconModule>,
  hi2: () => import("react-icons/hi2") as unknown as Promise<IconModule>,
  bi: () => import("react-icons/bi") as unknown as Promise<IconModule>,
  ai: () => import("react-icons/ai") as unknown as Promise<IconModule>,
  gi: () => import("react-icons/gi") as unknown as Promise<IconModule>,
  fi: () => import("react-icons/fi") as unknown as Promise<IconModule>,
  io: () => import("react-icons/io5") as unknown as Promise<IconModule>,
  io5: () => import("react-icons/io5") as unknown as Promise<IconModule>,
  io4: () => import("react-icons/io") as unknown as Promise<IconModule>,
  tb: () => import("react-icons/tb") as unknown as Promise<IconModule>,
  md: () => import("react-icons/md") as unknown as Promise<IconModule>,
  ri: () => import("react-icons/ri") as unknown as Promise<IconModule>,
  bs: () => import("react-icons/bs") as unknown as Promise<IconModule>,
  go: () => import("react-icons/go") as unknown as Promise<IconModule>,
  lu: () => import("react-icons/lu") as unknown as Promise<IconModule>,
  pi: () => import("react-icons/pi") as unknown as Promise<IconModule>,
  wi: () => import("react-icons/wi") as unknown as Promise<IconModule>,
  cg: () => import("react-icons/cg") as unknown as Promise<IconModule>,
  di: () => import("react-icons/di") as unknown as Promise<IconModule>,
  vsc: () => import("react-icons/vsc") as unknown as Promise<IconModule>,
  tfi: () => import("react-icons/tfi") as unknown as Promise<IconModule>,
  fc: () => import("react-icons/fc") as unknown as Promise<IconModule>,
};

// ---------------------------------------------------------------------------
// Dynamic components — one per library, created at module level.
// Each wraps a function component that receives { iconName } and renders
// the resolved IconType from that library's module.
// ---------------------------------------------------------------------------

type IconRendererProps = IconBaseProps & {
  /** The specific export name within the library (e.g. "FaReact"). */
  iconName: string;
  className?: string;
};

function makeIconRenderer(loader: IconModuleLoader) {
  return dynamic<IconRendererProps>(
    () =>
      loader().then((mod) => ({
        default({ iconName, className, ...rest }: IconRendererProps) {
          const Icon = mod[iconName];
          if (!Icon) {
            return (
              <AlertCircle
                className={cn("shrink-0 text-destructive", className)}
              />
            );
          }
          return <Icon className={cn("shrink-0", className)} {...rest} />;
        },
      })),
    {
      ssr: true,
      loading: ({ error }) =>
        error ? (
          <AlertCircle className="shrink-0 text-destructive" />
        ) : (
          <Loader2 className="shrink-0 animate-spin text-muted-foreground" />
        ),
    }
  );
}

// Stable component references — created once at module load, never inside render.
const DYNAMIC_ICON_COMPONENTS: Record<
  string,
  ReturnType<typeof makeIconRenderer>
> = Object.fromEntries(
  Object.entries(ICON_LIBS).map(([prefix, loader]) => [
    prefix,
    makeIconRenderer(loader),
  ])
);

// ---------------------------------------------------------------------------
// Public props & component
// ---------------------------------------------------------------------------

export interface DynamicIconClientProps extends IconBaseProps {
  className?: string;
  /** Optional library prefix override; auto-detected from name when omitted. */
  library?: string;
  /** The name of the icon component (e.g. 'FaReact', 'SiNextdotjs'). */
  name: string;
}

/** Parses the library prefix from a react-icons name (FaReact → fa). */
function getPrefix(name: string): string {
  if (!name || name.length < 2) {
    return "";
  }

  if (name.length > 3) {
    const three = name.slice(0, 3).toLowerCase();
    if (["fa6", "hi2", "io5"].includes(three)) {
      return three;
    }
  }

  return name.slice(0, 2).toLowerCase();
}

export function DynamicIconClient({
  name,
  library,
  className,
  size = "1em",
  color,
  ...props
}: DynamicIconClientProps) {
  const prefix = library ? library.toLowerCase() : getPrefix(name);
  const IconComponent = DYNAMIC_ICON_COMPONENTS[prefix];

  if (!IconComponent) {
    return (
      <AlertCircle
        className={cn("shrink-0 text-destructive", className)}
        style={{ fontSize: size, color }}
      />
    );
  }

  return (
    <IconComponent
      className={className}
      color={color}
      iconName={name}
      size={size}
      {...props}
    />
  );
}
