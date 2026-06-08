import type { Document } from "@contentful/rich-text-types";

import type { Collection, Page } from "./common";
import type { BioCard, JobExperience, ProjectCard, SkillSet } from "./entries";

export interface HomePageData {
  description: {
    json: Document;
  };
  infoCollection: Collection<BioCard>;
}

export interface SkillsPageData {
  skillsSetCollection: SkillSet;
  title: string;
}

export interface ExperiencePageData {
  experiencesCollection: Collection<JobExperience>;
  title: string;
}

export interface ProjectsPageData {
  projectsCollection: Collection<ProjectCard>;
  title: string;
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
