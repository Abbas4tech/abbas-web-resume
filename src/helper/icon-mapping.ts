import { IconType } from "react-icons";

export const iconMap: Record<string, () => Promise<IconType>> = {
  // Simple Icons
  "si/SiMongodb": () =>
    import("react-icons/si").then((module) => module.SiMongodb),
  "si/SiGmail": () => import("react-icons/si").then((module) => module.SiGmail),
  "si/SiReactivex": () =>
    import("react-icons/si").then((module) => module.SiReactivex),
  "si/SiStorybook": () =>
    import("react-icons/si").then((module) => module.SiStorybook),
  "si/SiAxios": () => import("react-icons/si").then((module) => module.SiAxios),
  "si/SiJira": () => import("react-icons/si").then((module) => module.SiJira),
  "si/SiNotion": () =>
    import("react-icons/si").then((module) => module.SiNotion),
  "si/SiWebpack": () =>
    import("react-icons/si").then((module) => module.SiWebpack),
  "si/SiVercel": () =>
    import("react-icons/si").then((module) => module.SiVercel),
  "si/SiTailwindcss": () =>
    import("react-icons/si").then((module) => module.SiTailwindcss),
  "si/SiDaisyui": () =>
    import("react-icons/si").then((module) => module.SiDaisyui),
  "si/SiStrapi": () =>
    import("react-icons/si").then((module) => module.SiStrapi),
  "si/SiContentful": () =>
    import("react-icons/si").then((module) => module.SiContentful),
  "si/SiNgrx": () => import("react-icons/si").then((module) => module.SiNgrx),
  "si/SiFramework": () =>
    import("react-icons/si").then((module) => module.SiFramework),
  "si/SiJest": () => import("react-icons/si").then((module) => module.SiJest),
  "si/SiReactrouter": () =>
    import("react-icons/si").then((module) => module.SiReactrouter),
  "si/SiRedux": () => import("react-icons/si").then((module) => module.SiRedux),
  "si/SiTypescript": () =>
    import("react-icons/si").then((module) => module.SiTypescript),
  "si/SiJavascript": () =>
    import("react-icons/si").then((module) => module.SiJavascript),
  "si/SiShadcnui": () =>
    import("react-icons/si").then((module) => module.SiShadcnui),
  "si/SiAngular": () =>
    import("react-icons/si").then((module) => module.SiAngular),

  // Font Awesome 5
  "fa/FaSass": () => import("react-icons/fa").then((module) => module.FaSass),
  "fa/FaStackOverflow": () =>
    import("react-icons/fa").then((module) => module.FaStackOverflow),
  "fa/FaDownload": () =>
    import("react-icons/fa").then((module) => module.FaDownload),
  "fa/FaExternalLinkAlt": () =>
    import("react-icons/fa").then((module) => module.FaExternalLinkAlt),
  "fa/FaUserGraduate": () =>
    import("react-icons/fa").then((module) => module.FaUserGraduate),
  "fa/FaUser": () => import("react-icons/fa").then((module) => module.FaUser),
  "fa/FaCalendarTimes": () =>
    import("react-icons/fa").then((module) => module.FaCalendarTimes),
  "fa/FaPhoneAlt": () =>
    import("react-icons/fa").then((module) => module.FaPhoneAlt),
  "fa/FaCode": () => import("react-icons/fa").then((module) => module.FaCode),
  "fa/FaHome": () => import("react-icons/fa").then((module) => module.FaHome),
  "fa/FaTools": () => import("react-icons/fa").then((module) => module.FaTools),
  "fa/FaGithub": () =>
    import("react-icons/fa").then((module) => module.FaGithub),
  "fa/FaGitAlt": () =>
    import("react-icons/fa").then((module) => module.FaGitAlt),
  "fa/FaAngular": () =>
    import("react-icons/fa").then((module) => module.FaAngular),
  "fa/FaVuejs": () => import("react-icons/fa").then((module) => module.FaVuejs),
  "fa/FaReact": () => import("react-icons/fa").then((module) => module.FaReact),
  "fa/FaBootstrap": () =>
    import("react-icons/fa").then((module) => module.FaBootstrap),
  "fa/FaArrowRight": () =>
    import("react-icons/fa").then((module) => module.FaArrowRight),
  "fa/FaHtml5": () => import("react-icons/fa").then((module) => module.FaHtml5),

  // Font Awesome 6
  "fa6/FaLocationDot": () =>
    import("react-icons/fa6").then((module) => module.FaLocationDot),
  "fa6/FaLocationCrosshairs": () =>
    import("react-icons/fa6").then((module) => module.FaLocationCrosshairs),
  "fa6/FaPeopleGroup": () =>
    import("react-icons/fa6").then((module) => module.FaPeopleGroup),

  // Material Design
  "md/MdColorLens": () =>
    import("react-icons/md").then((module) => module.MdColorLens),
  "md/MdDateRange": () =>
    import("react-icons/md").then((module) => module.MdDateRange),
  "md/MdOutlineMiscellaneousServices": () =>
    import("react-icons/md").then(
      (module) => module.MdOutlineMiscellaneousServices
    ),
  "md/MdWork": () => import("react-icons/md").then((module) => module.MdWork),
  "md/MdError": () => import("react-icons/md").then((module) => module.MdError),

  // Ionicons 5
  "io5/IoStatsChartSharp": () =>
    import("react-icons/io5").then((module) => module.IoStatsChartSharp),
  "io5/IoLogoFirebase": () =>
    import("react-icons/io5").then((module) => module.IoLogoFirebase),
  "io5/IoChevronDown": () =>
    import("react-icons/io5").then((m) => m.IoChevronDown),
  "io5/IoMenu": () => import("react-icons/io5").then((m) => m.IoMenu),

  // Ionicons 4
  "io/IoLogoCss3": () =>
    import("react-icons/io").then((module) => module.IoLogoCss3),

  // Remix Icon
  "ri/RiNextjsFill": () =>
    import("react-icons/ri").then((module) => module.RiNextjsFill),

  // VS Code
  "vsc/VscAzureDevops": () =>
    import("react-icons/vsc").then((m) => m.VscAzureDevops),
};

export type IconName = keyof typeof iconMap;

export const getFallbackIcon = (): Promise<IconType> =>
  import("react-icons/md").then((module) => module.MdError);
