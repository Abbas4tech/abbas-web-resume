import type { IconType } from "react-icons";
import {
  FaAngular,
  FaArrowRight,
  FaBootstrap,
  FaBriefcase,
  FaBuilding,
  FaCalendar,
  FaCalendarTimes,
  FaClock,
  FaCode,
  FaDiscord,
  FaDownload,
  FaExternalLinkAlt,
  FaFileAlt,
  FaFilePdf,
  FaFolder,
  FaGitAlt,
  FaGithub,
  FaHome,
  FaHtml5,
  FaLinkedin,
  FaMapMarker,
  FaMapMarkerAlt,
  FaPalette,
  FaPhone,
  FaPhoneAlt,
  FaReact,
  FaSass,
  FaStackOverflow,
  FaStar,
  FaTools,
  FaUser,
  FaUserGraduate,
  FaVuejs,
} from "react-icons/fa";
import {
  FaLocationCrosshairs,
  FaLocationDot,
  FaPeopleGroup,
  FaXTwitter,
} from "react-icons/fa6";
import { IoLogoCss3 } from "react-icons/io";
import {
  IoBicycle,
  IoChevronDown,
  IoColorPalette,
  IoLogoFirebase,
  IoMenu,
  IoPerson,
  IoStatsChart,
  IoStatsChartSharp,
} from "react-icons/io5";
import {
  MdAccessTime,
  MdBusiness,
  MdClose,
  MdCode,
  MdColorLens,
  MdDarkMode,
  MdDateRange,
  MdEmail,
  MdError,
  MdEventAvailable,
  MdFavorite,
  MdHome,
  MdLanguage,
  MdLightMode,
  MdLink,
  MdLocationOn,
  MdMenu,
  MdOpenInNew,
  MdOutlineMiscellaneousServices,
  MdOutlineWork,
  MdRefresh,
  MdSchool,
  MdSearchOff,
  MdStorage,
  MdWork,
} from "react-icons/md";
import { PiFlagBannerFill } from "react-icons/pi";
import { RiNextjsFill } from "react-icons/ri";
import {
  SiAngular,
  SiAxios,
  SiContentful,
  SiDaisyui,
  SiExpress,
  SiFramework,
  SiGmail,
  SiJavascript,
  SiJest,
  SiJira,
  SiMongodb,
  SiNgrx,
  SiNodedotjs,
  SiNotion,
  SiPostgresql,
  SiReact,
  SiReactivex,
  SiReactrouter,
  SiRedux,
  SiShadcnui,
  SiStorybook,
  SiStrapi,
  SiSwagger,
  SiTailwindcss,
  SiTurborepo,
  SiTypescript,
  SiVercel,
  SiVite,
  SiVitest,
  SiWebpack,
} from "react-icons/si";
import { VscAzureDevops } from "react-icons/vsc";

export type IconLibrary =
  | "fa"
  | "fa6"
  | "io"
  | "io5"
  | "md"
  | "ri"
  | "si"
  | "pi"
  | "vsc";

/** Plain props contract for the Icon element. No Contentful types. */
export interface IconProps {
  /** Extra CSS classes passed to the inner icon component */
  classes?: string[];
  /** Hex color string e.g., '#000' */
  color?: string;
  /** Format: "library/IconName" e.g. "io5/IoMenu" (legacy fallback) */
  iconCode?: string;
  /** The icon name e.g., 'PiFlagBannerFill' */
  iconName?: string;
  /** The icon library e.g., 'pi' */
  library?: string;
  /** Accessible name / tooltip text */
  name?: string;
  /** Whether to show a tooltip on hover */
  showTooltip?: boolean;
  size?: string;
}

export const ICON_REGISTRY: Record<string, IconType> = {
  // FontAwesome (fa)
  "fa/FaAngular": FaAngular,
  "fa/FaArrowRight": FaArrowRight,
  "fa/FaBootstrap": FaBootstrap,
  "fa/FaBriefcase": FaBriefcase,
  "fa/FaBuilding": FaBuilding,
  "fa/FaCalendar": FaCalendar,
  "fa/FaCalendarTimes": FaCalendarTimes,
  "fa/FaClock": FaClock,
  "fa/FaCode": FaCode,
  "fa/FaDiscord": FaDiscord,
  "fa/FaDownload": FaDownload,
  "fa/FaExternalLinkAlt": FaExternalLinkAlt,
  "fa/FaFileAlt": FaFileAlt,
  "fa/FaFilePdf": FaFilePdf,
  "fa/FaFolder": FaFolder,
  "fa/FaGitAlt": FaGitAlt,
  "fa/FaGithub": FaGithub,
  "fa/FaHome": FaHome,
  "fa/FaHtml5": FaHtml5,
  "fa/FaLinkedin": FaLinkedin,
  "fa/FaMapMarker": FaMapMarker,
  "fa/FaMapMarkerAlt": FaMapMarkerAlt,
  "fa/FaPalette": FaPalette,
  "fa/FaPhone": FaPhone,
  "fa/FaPhoneAlt": FaPhoneAlt,
  "fa/FaReact": FaReact,
  "fa/FaSass": FaSass,
  "fa/FaStackOverflow": FaStackOverflow,
  "fa/FaStar": FaStar,
  "fa/FaTools": FaTools,
  "fa/FaUser": FaUser,
  "fa/FaUserGraduate": FaUserGraduate,
  "fa/FaVuejs": FaVuejs,

  // FontAwesome 6 (fa6)
  "fa6/FaLocationCrosshairs": FaLocationCrosshairs,
  "fa6/FaLocationDot": FaLocationDot,
  "fa6/FaPeopleGroup": FaPeopleGroup,
  "fa6/FaXTwitter": FaXTwitter,

  // Ionicons (io)
  "io/IoLogoCss3": IoLogoCss3,

  // Ionicons 5 (io5)
  "io5/IoBicycle": IoBicycle,
  "io5/IoChevronDown": IoChevronDown,
  "io5/IoColorPalette": IoColorPalette,
  "io5/IoLogoFirebase": IoLogoFirebase,
  "io5/IoMenu": IoMenu,
  "io5/IoPerson": IoPerson,
  "io5/IoStatsChart": IoStatsChart,
  "io5/IoStatsChartSharp": IoStatsChartSharp,

  // Material Design (md)
  "md/MdAccessTime": MdAccessTime,
  "md/MdBusiness": MdBusiness,
  "md/MdClose": MdClose,
  "md/MdCode": MdCode,
  "md/MdColorLens": MdColorLens,
  "md/MdDarkMode": MdDarkMode,
  "md/MdDateRange": MdDateRange,
  "md/MdEmail": MdEmail,
  "md/MdError": MdError,
  "md/MdEventAvailable": MdEventAvailable,
  "md/MdFavorite": MdFavorite,
  "md/MdHome": MdHome,
  "md/MdLanguage": MdLanguage,
  "md/MdLightMode": MdLightMode,
  "md/MdLink": MdLink,
  "md/MdLocationOn": MdLocationOn,
  "md/MdMenu": MdMenu,
  "md/MdOpenInNew": MdOpenInNew,
  "md/MdOutlineMiscellaneousServices": MdOutlineMiscellaneousServices,
  "md/MdOutlineWork": MdOutlineWork,
  "md/MdRefresh": MdRefresh,
  "md/MdSchool": MdSchool,
  "md/MdSearchOff": MdSearchOff,
  "md/MdStorage": MdStorage,
  "md/MdWork": MdWork,

  // Remix Icons (ri)
  "ri/RiNextjsFill": RiNextjsFill,

  // Simple Icons (si)
  "si/SiAngular": SiAngular,
  "si/SiAxios": SiAxios,
  "si/SiContentful": SiContentful,
  "si/SiDaisyui": SiDaisyui,
  "si/SiExpress": SiExpress,
  "si/SiFramework": SiFramework,
  "si/SiGmail": SiGmail,
  "si/SiJavascript": SiJavascript,
  "si/SiJest": SiJest,
  "si/SiJira": SiJira,
  "si/SiMongodb": SiMongodb,
  "si/SiNgrx": SiNgrx,
  "si/SiNodedotjs": SiNodedotjs,
  "si/SiNotion": SiNotion,
  "si/SiPostgresql": SiPostgresql,
  "si/SiReact": SiReact,
  "si/SiReactivex": SiReactivex,
  "si/SiReactrouter": SiReactrouter,
  "si/SiRedux": SiRedux,
  "si/SiShadcnui": SiShadcnui,
  "si/SiStorybook": SiStorybook,
  "si/SiStrapi": SiStrapi,
  "si/SiSwagger": SiSwagger,
  "si/SiTailwindcss": SiTailwindcss,
  "si/SiTurborepo": SiTurborepo,
  "si/SiTypescript": SiTypescript,
  "si/SiVercel": SiVercel,
  "si/SiVite": SiVite,
  "si/SiVitest": SiVitest,
  "si/SiWebpack": SiWebpack,

  // VS Code Icons (vsc)
  "vsc/VscAzureDevops": VscAzureDevops,

  // Phosphor Icons (pi)
  "pi/PiFlagBannerFill": PiFlagBannerFill,
};
