import React from "react";
import { NextPage, Metadata } from "next";
import { SkillsPage as SkillsPageSchema } from "@lib/contentful";
import { fetchPageMetadata, fetchQuery } from "@lib/api";
import { Page, PageContent, PageHeading } from "src/components/ui/page";
import {
  Skill,
  SkillGroupContent,
  SkillsContent,
  SkillTitle,
  SkillGroup,
  SkillList,
} from "src/components/ui/skill";
import Progress from "src/components/ui/progress";
import { Icon } from "src/components/ui/icon";

export const generateMetadata = async (): Promise<Metadata> => {
  return fetchPageMetadata<SkillsPageSchema>(
    process.env.CONTENTFUL_SKILLS_PAGE_KEY!
  );
};

const SkillsPage: NextPage = async () => {
  const {
    title,
    pageIcon,
    contentAnimation,
    headingAnimation,
    pageData: { skillsSet },
  } = await fetchQuery<SkillsPageSchema>(
    process.env.CONTENTFUL_SKILLS_PAGE_KEY!
  );

  return (
    <Page>
      <PageHeading headingAnimation={headingAnimation}>
        <Icon {...pageIcon} />

        {title}
      </PageHeading>
      <PageContent
        className="flex flex-col gap-4"
        contentAnimation={contentAnimation}
      >
        {skillsSet.map(({ icon, title, skillsArray }, index: number) => (
          <Skill key={index}>
            <SkillsContent>
              <SkillTitle>
                <Icon {...icon} />
                {title}
              </SkillTitle>
              <SkillGroup>
                {skillsArray.map(({ title, skillIcons, skillProgress }) => (
                  <SkillGroupContent key={title}>
                    <SkillList>
                      {skillIcons.map((skill) => (
                        <Icon key={title} {...skill} />
                      ))}
                    </SkillList>
                    <Progress skillProgress={skillProgress} />
                  </SkillGroupContent>
                ))}
              </SkillGroup>
            </SkillsContent>
          </Skill>
        ))}
      </PageContent>
    </Page>
  );
};

export default SkillsPage;
