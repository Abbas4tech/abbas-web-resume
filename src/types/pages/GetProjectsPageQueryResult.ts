import { Collection, Page } from "../common";
import { ProjectCard } from "../entries";

type ProjectsPageQueryResult = Page<{
  projectsCollection: Collection<ProjectCard>;
}>;

export default ProjectsPageQueryResult;
