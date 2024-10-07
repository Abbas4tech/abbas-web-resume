"use client";
import React, {
  Children,
  cloneElement,
  PropsWithChildren,
  ReactElement,
  memo,
} from "react";
import { usePathname } from "next/navigation";

interface RouteClientWrapperProps {
  className: string;
  defaultRoute: string;
}

const RouteClientWrapper: React.FC<PropsWithChildren<RouteClientWrapperProps>> =
  memo(({ className, children, defaultRoute }) => {
    const currentPath =
      usePathname().charAt(1).toUpperCase() + usePathname().slice(2) ||
      defaultRoute;
    return Children.map(children, (child) => {
      if (React.isValidElement(child)) {
        return cloneElement(child as ReactElement<any>, {
          className:
            currentPath === defaultRoute
              ? `${child.props.className || ""}`
              : `${child.props.className || ""} ${className}`,
        });
      }
      return child;
    });
  });

export default RouteClientWrapper;
