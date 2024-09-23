import { EntryFields, Entry, EntrySkeletonType, Asset } from "contentful";

export interface User extends EntrySkeletonType {
  title: EntryFields.Text;
  profilePic: FileAsset;
  themeList: EntryFields.Text[];
  role: EntryFields.Text;
  resume: FileAsset;
  pages: string[];
  info: BioCard[];
  technologies: SkillSet[];
  projects: ProjectCard[];
  experiences: JobExperience[];
}

export interface FileAsset extends Asset {
  title: EntryFields.Text;
  description: EntryFields.Text;
  file: {
    url: string;
    details: {
      size: number;
      image: {
        width: number;
        height: number;
      };
    };
    fileName: string;
    contentType: string;
  };
}

export interface ProjectCard extends EntrySkeletonType {
  title: EntryFields.Text;
  deployedLink: EntryFields.Text;
  thumbnail: FileAsset;
  description: EntryFields.Text;
}

export interface BioCard extends EntrySkeletonType {
  title: EntryFields.Text;
  value: EntryFields.Text;
  identifier: EntryFields.Text;
}

export interface JobExperience extends EntrySkeletonType {
  company: EntryFields.Text;
  description: EntryFields.Text;
  position: EntryFields.Text;
  workedRemotely: EntryFields.Boolean;
  startDate: EntryFields.Text;
  endDate: EntryFields.Text;
  location: EntryFields.Text;
  currentlyWorking: EntryFields.Boolean;
}

export interface ExperiencePageType extends EntrySkeletonType {
  title: EntryFields.Text;
  experiences: Entry<JobExperience>[];
}

export interface SkillGroup extends EntrySkeletonType {
  title: EntryFields.Text;
  skillProgress: EntryFields.Number;
  skills: EntryFields.Text[];
}

export interface SkillSet extends EntrySkeletonType {
  title: EntryFields.Text;
  skillsetIcon: Asset;
  identifier: EntryFields.Text;
  skillsArray: SkillGroup[];
}

export interface SkillsPage extends EntrySkeletonType {
  title: EntryFields.Text;
  description: EntryFields.Text;
  technologies: Entry<SkillSet>[];
}

type UnwrapEntry<T> = T extends Entry<infer U>
  ? UnwrapEntry<U>
  : T extends (infer U)[]
  ? UnwrapEntry<U>[]
  : T;
