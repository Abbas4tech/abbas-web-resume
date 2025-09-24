import { Document } from "@contentful/rich-text-types";
import { Collection, Page } from "./common";
import { BioCard, SkillSet, JobExperience, ProjectCard } from "./entries";

export interface HomePageData {
  infoCollection: Collection<BioCard>;
  description: {
    json: Document;
  };
}

export interface SkillsPageData {
  title: string;
  skillsSetCollection: Collection<Omit<SkillSet, "skillsetIcon">>;
}

export interface ExperiencePageData {
  title: string;
  experiencesCollection: Collection<JobExperience>;
}

export interface ProjectsPageData {
  title: string;
  projectsCollection: Collection<ProjectCard>;
}

export type PageData =
  | ProjectsPageData
  | HomePageData
  | ExperiencePageData
  | SkillsPageData;

export type ExperiencePage = Page<ExperiencePageData>;
export type SkillsPage = Page<SkillsPageData>;
export type ProjectsPage = Page<ProjectsPageData>;
export type HomePage = Page<HomePageData>;

export type Pages = ExperiencePage | SkillsPage | ProjectsPage | HomePage;
