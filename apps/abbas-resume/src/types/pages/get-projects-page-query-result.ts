import type { Collection, Page } from "../common";
import type { ProjectCard } from "../entries";

type ProjectsPageQueryResult = Page<{
  projectsCollection: Collection<ProjectCard>;
}>;

export default ProjectsPageQueryResult;
