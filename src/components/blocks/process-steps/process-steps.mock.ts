import type { ProcessStepsProps } from "./process-steps";

export const baseMock: ProcessStepsProps = {
  steps: [
    {
      title: "Discover",
      description:
        "Understand the problem, constraints, and success criteria before writing any code.",
      icon: { iconCode: "fa/FaCode", name: "Discover" },
    },
    {
      title: "Design",
      description:
        "Sketch the component/data model boundaries and confirm the approach before building.",
      icon: { iconCode: "md/MdCode", name: "Design" },
    },
    {
      title: "Build",
      description:
        "Implement in small, reviewable slices with tests alongside the code.",
      icon: { iconCode: "fa/FaTools", name: "Build" },
    },
    {
      title: "Ship",
      description: "Deploy, monitor, and iterate based on real usage.",
      icon: { iconCode: "fa/FaArrowRight", name: "Ship" },
    },
  ],
};
