import { EntryFields, Entry, EntrySkeletonType, Asset } from "contentful";

export interface JobExperience {
  company: EntryFields.Text;
  description: EntryFields.Text;
  position: EntryFields.Text;
  workedRemotely: EntryFields.Boolean;
  startDate: EntryFields.Text;
  endDate?: EntryFields.Text;
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
  skillsArray: Entry<SkillGroup>[];
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
