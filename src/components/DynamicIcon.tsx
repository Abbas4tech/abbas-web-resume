import { Icon } from "@utils/contentful";
import dynamic from "next/dynamic";
import React, { memo } from "react";
import { IconBaseProps, IconType } from "react-icons/";

const ai = (icon: string) =>
  dynamic(() => import("react-icons/ai").then((m) => m[icon] as IconType));
const bi = (icon: string) =>
  dynamic(() => import("react-icons/bi").then((m) => m[icon] as IconType));
const bs = (icon: string) =>
  dynamic(() => import("react-icons/bs").then((m) => m[icon] as IconType));
const cg = (icon: string) =>
  dynamic(() => import("react-icons/cg").then((m) => m[icon] as IconType));
const ci = (icon: string) =>
  dynamic(() => import("react-icons/ci").then((m) => m[icon] as IconType));
const di = (icon: string) =>
  dynamic(() => import("react-icons/di").then((m) => m[icon] as IconType));
const fa = (icon: string) =>
  dynamic(() => import("react-icons/fa").then((m) => m[icon] as IconType));
const fa6 = (icon: string) =>
  dynamic(() => import("react-icons/fa6").then((m) => m[icon] as IconType));
const fc = (icon: string) =>
  dynamic(() => import("react-icons/fc").then((m) => m[icon] as IconType));
const fi = (icon: string) =>
  dynamic(() => import("react-icons/fi").then((m) => m[icon] as IconType));
const gi = (icon: string) =>
  dynamic(() => import("react-icons/gi").then((m) => m[icon] as IconType));
const go = (icon: string) =>
  dynamic(() => import("react-icons/go").then((m) => m[icon] as IconType));
const gr = (icon: string) =>
  dynamic(() => import("react-icons/gr").then((m) => m[icon] as IconType));
const hi = (icon: string) =>
  dynamic(() => import("react-icons/hi").then((m) => m[icon] as IconType));
const hi2 = (icon: string) =>
  dynamic(() => import("react-icons/hi2").then((m) => m[icon] as IconType));
const im = (icon: string) =>
  dynamic(() => import("react-icons/im").then((m) => m[icon] as IconType));
const io = (icon: string) =>
  dynamic(() => import("react-icons/io").then((m) => m[icon] as IconType));
const io5 = (icon: string) =>
  dynamic(() => import("react-icons/io5").then((m) => m[icon] as IconType));
const lia = (icon: string) =>
  dynamic(() => import("react-icons/lia").then((m) => m[icon] as IconType));
const lib = (icon: string) =>
  dynamic(() => import("react-icons/lib").then((m) => m[icon] as IconType));
const lu = (icon: string) =>
  dynamic(() => import("react-icons/lu").then((m) => m[icon] as IconType));
const md = (icon: string) =>
  dynamic(() => import("react-icons/md").then((m) => m[icon] as IconType));
const pi = (icon: string) =>
  dynamic(() => import("react-icons/pi").then((m) => m[icon] as IconType));
const ri = (icon: string) =>
  dynamic(() => import("react-icons/ri").then((m) => m[icon] as IconType));
const rx = (icon: string) =>
  dynamic(() => import("react-icons/rx").then((m) => m[icon] as IconType));
const si = (icon: string) =>
  dynamic(() => import("react-icons/si").then((m) => m[icon] as IconType));
const sl = (icon: string) =>
  dynamic(() => import("react-icons/sl").then((m) => m[icon] as IconType));
const tb = (icon: string) =>
  dynamic(() => import("react-icons/tb").then((m) => m[icon] as IconType));
const tfi = (icon: string) =>
  dynamic(() => import("react-icons/tfi").then((m) => m[icon] as IconType));
const ti = (icon: string) =>
  dynamic(() => import("react-icons/ti").then((m) => m[icon] as IconType));
const vsc = (icon: string) =>
  dynamic(() => import("react-icons/vsc").then((m) => m[icon] as IconType));
const wi = (icon: string) =>
  dynamic(() => import("react-icons/wi").then((m) => m[icon] as IconType));

type IconLibrary =
  | "ai"
  | "bi"
  | "bs"
  | "cg"
  | "ci"
  | "di"
  | "fa"
  | "fa6"
  | "fc"
  | "fi"
  | "gi"
  | "go"
  | "gr"
  | "hi"
  | "hi2"
  | "im"
  | "io"
  | "io5"
  | "lia"
  | "lib"
  | "lu"
  | "md"
  | "pi"
  | "ri"
  | "rx"
  | "si"
  | "sl"
  | "tb"
  | "tfi"
  | "ti"
  | "vsc"
  | "wi";

const libraryMap: Record<
  IconLibrary,
  (icon: string) => ReturnType<typeof dynamic<IconBaseProps>>
> = {
  ai,
  bi,
  bs,
  cg,
  ci,
  di,
  fa,
  fa6,
  fc,
  fi,
  gi,
  go,
  gr,
  hi,
  hi2,
  im,
  io,
  io5,
  lia,
  lib,
  lu,
  md,
  pi,
  ri,
  rx,
  si,
  sl,
  tb,
  tfi,
  ti,
  vsc,
  wi,
};

const DynamicIcons: React.FC<Icon> = memo(
  ({ iconCode, classes = [], showTooltip = true, name }) => {
    DynamicIcons.displayName = "DynamicIcons";

    const [library, icon] = iconCode.split("/") as [IconLibrary, string];
    console.log(iconCode.split("/"), libraryMap[library]);
    const IconComponent = libraryMap[library](icon);

    return (
      <div
        className={showTooltip ? `tooltip tooltip-primary` : ""}
        data-tip={name}
      >
        <IconComponent className={classes.join(" ")} />
      </div>
    );
  }
);

export default DynamicIcons;
