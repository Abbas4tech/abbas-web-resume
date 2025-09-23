import React from "react";
import { NextPage, Metadata } from "next";

import { SkillsPage as SkillsPageSchema } from "@/lib/contentful";
import { fetchQuery } from "@/lib/api";
import { Page, PageContent, PageHeading } from "@/components/ui/page";
import {
  Skill,
  SkillGroupContent,
  SkillsContent,
  SkillTitle,
  SkillGroup,
  SkillList,
} from "@/components/ui/skill";
import Progress from "@/components/ui/progress";
import { Icon } from "@/components/ui/icon";
import { getPageMetadata } from "@/helper/getPageMetadata";

export const generateMetadata = async (): Promise<Metadata> =>
  await getPageMetadata(process.env.CONTENTFUL_SKILLS_PAGE_KEY!);

export const revalidate = 60;

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
      <PageHeading data-aos={headingAnimation}>
        <Icon {...pageIcon} />
        {title}
      </PageHeading>
      <PageContent className="flex flex-col gap-4" data-aos={contentAnimation}>
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
                    <Progress count={skillProgress} />
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
