"use client";
import React, { memo } from "react";
import { ThemeSwitch, Resume as ResumeComponent } from "@components";
import { useApplicationData } from "@context";
import { DrawerButton } from "../ui/drawer";
import { Icon } from "../ui/icon";

const Header = memo(() => {
  const { title } = useApplicationData();

  return (
    <header className="container mx-auto bg-base-100 shadow-lg shadow-base-300 text-base-content sticky top-0 z-30 flex w-full justify-center md:p-2">
      <nav className="navbar bg-base-100">
        <div className="navbar-start gap-2">
          <DrawerButton className="lg:hidden">
            <Icon
              iconCode="io5/IoMenu"
              classes={["w-5", "h-5"]}
              name="Toggle"
              showTooltip={false}
            />
          </DrawerButton>

          <button className="text-lg normal-case lg:text-2xl p-0 md:p-2 btn btn-ghost">
            {title}
          </button>
        </div>

        <div className="navbar-end items-center gap-2">
          <ResumeComponent />
          <ThemeSwitch />
        </div>
      </nav>
    </header>
  );
});

Header.displayName = "Header";
export default Header;
