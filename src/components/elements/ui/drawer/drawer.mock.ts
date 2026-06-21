import React from "react";
import type { DrawerProviderProps } from "./drawer";
import {
  Drawer,
  DrawerButton,
  DrawerPageContent,
  DrawerSide,
  DrawerSideItem,
  DrawerSideMenu,
} from "./drawer";

export const baseMock: DrawerProviderProps = {
  children: React.createElement(Drawer, null, [
    React.createElement(
      DrawerPageContent,
      {
        key: "content",
        className: "flex flex-col items-center justify-center h-64 bg-base-200",
      },
      [
        React.createElement(
          DrawerButton,
          { key: "btn", className: "btn btn-primary lg:hidden" },
          "Open Drawer (Mobile)"
        ),
        React.createElement(
          "p",
          { key: "p", className: "hidden lg:block mt-4" },
          "Drawer is open by default on desktop"
        ),
      ]
    ),
    React.createElement(DrawerSide, { key: "side" }, [
      React.createElement(
        DrawerSideMenu,
        {
          key: "menu",
          className: "menu p-4 w-80 min-h-full bg-base-100 text-base-content",
        },
        [
          React.createElement(DrawerSideItem, { key: "1" }, "Sidebar Item 1"),
          React.createElement(DrawerSideItem, { key: "2" }, "Sidebar Item 2"),
        ]
      ),
    ]),
  ]),
};
