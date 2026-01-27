import type { Metadata, NextPage } from "next";
import React from "react";

import { Page, PageContent, PageHeading } from "@/components/Page";
import { getPageMetadata } from "@/helper/getPageMetadata";
import { fetchGql } from "@/lib/client";
import { GET_SKILLS_PAGE } from "@/queries/getSkillsPageQuery";
import type { GetSkillsPageQueryResult } from "@/types/pages";
import { Icon } from "@abbas-web-resume/ui/components/icon";
import Progress from "@abbas-web-resume/ui/components/progress";
import {
  Skill,
  SkillGroup,
  SkillGroupContent,
  SkillList,
  SkillTitle,
  SkillsContent,
} from "@abbas-web-resume/ui/components/skill";

export const generateMetadata = async (): Promise<Metadata> =>
  await getPageMetadata(process.env.CONTENTFUL_SKILLS_PAGE_KEY as string);

export const revalidate = 60;

const SkillsPage: NextPage = async () => {
  const data = await fetchGql<GetSkillsPageQueryResult>(GET_SKILLS_PAGE, {
    id: process.env.CONTENTFUL_SKILLS_PAGE_KEY as string,
  });

  const { title, contentAnimation, headingAnimation, pageData, pageIcon } = data.page;

  return (
    <Page>
      <PageHeading data-aos={headingAnimation}>
        <Icon {...pageIcon} />
        {title}
      </PageHeading>
      <PageContent className="flex flex-col gap-4" data-aos={contentAnimation}>
        {pageData.skillsSetCollection.items.map(
          ({ icon, title, skillsArrayCollection }, index: number) => (
            <Skill key={index}>
              <SkillsContent>
                <SkillTitle>
                  <Icon {...icon} />
                  {title}
                </SkillTitle>
                <SkillGroup>
                  {skillsArrayCollection.items.map(
                    ({ title, skillIconsCollection, skillProgress }) => (
                      <SkillGroupContent key={title}>
                        <SkillList>
                          {skillIconsCollection.items.map((skill) => (
                            <Icon key={title} {...skill} />
                          ))}
                        </SkillList>
                        <Progress count={skillProgress} />
                      </SkillGroupContent>
                    )
                  )}
                </SkillGroup>
              </SkillsContent>
            </Skill>
          )
        )}
      </PageContent>
    </Page>
  );
};

export default SkillsPage;
