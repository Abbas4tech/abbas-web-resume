import type { Collection, Page } from "../common";
import type { SkillSet } from "../entries";

type SkillsPageQueryResult = Page<{
  skillsSetCollection: Collection<Omit<SkillSet, "skillsetIcon">>;
}>;

export default SkillsPageQueryResult;
