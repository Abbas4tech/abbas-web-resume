import { usePage } from "@hooks";
import Link from "next/link";
import React, { PropsWithChildren } from "react";
import SVGIcon from "./SVGIcon";
import { FaArrowRight } from "react-icons/fa";

type Variant = "SidebarButton" | "ButtonWithPageChange" | "SimpleButton";

interface ButtonProps extends PropsWithChildren {
  variant: Variant;
  icon?: string;
  classes?: string;
  onPress?: () => void;
}

interface ButtonWithPageChangeProps extends ButtonProps {
  changePage: () => void;
  nextPage: string;
}

interface SidebarLinkProps extends ButtonProps {
  defaultPage: string;
  currentPath: string;
}

const SidebarLink = ({
  onPress,
  children,
  defaultPage,
  currentPath,
}: SidebarLinkProps) => {
  const text = children as string;
  return (
    <Link
      scroll={false}
      onClick={onPress}
      href={`/${[text === defaultPage.toLowerCase() ? "" : text]}`}
      className={`px-4 py-2 md:py-3 w-full flex gap-2 items-center ${
        text === currentPath
          ? "border-primary border-l-4 bg-base-200 transform font-bold duration-200 ease-out"
          : ""
      }`}
    >
      <SVGIcon icon={text} />
      {text}
    </Link>
  );
};

const ButtonWithPageChange = ({
  changePage,
  nextPage,
}: ButtonWithPageChangeProps) => {
  return (
    <button
      onClick={changePage}
      className="gap-2 text-sm capitalize text-base-content bg-base-300 md:text-base btn-sm md:btn-md btn"
    >
      {nextPage}
      <FaArrowRight/>
    </button>
  );
};

const Button = (props: ButtonProps) => {
  const { currentPath, defaultPage, changePage, nextPage } = usePage({});
  if (props.variant === "ButtonWithPageChange") {
    return ButtonWithPageChange({ ...props, changePage, nextPage });
  } else {
    return SidebarLink({ ...props, defaultPage, currentPath });
  }
};

export default Button;
