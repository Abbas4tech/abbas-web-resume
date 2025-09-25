import { Collection, Page } from "../common";
import { SkillSet } from "../entries";

type SkillsPageQueryResult = Page<{
  skillsSetCollection: Collection<Omit<SkillSet, "skillsetIcon">>;
}>;

export default SkillsPageQueryResult;
