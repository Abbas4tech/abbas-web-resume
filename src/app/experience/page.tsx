import ExperienceCard from "@components/ExperienceCard";
import React from "react";
import { useUserInfo } from "@context/useInfo";
import PageWrapper from "@components/PageWrapper";
import { fetchExperiencePage } from "@utils/api";
import { NextPage } from "next";
import Head from "next/head";

const ExperiencePage: NextPage = async () => {
  const { pageData, title, headingAnimation, identifier, contentAnimation } =
    await fetchExperiencePage();
  return (
    <>
      <Head>
        <title>{title}</title>
      </Head>
      <PageWrapper title={title} headingAnimation={headingAnimation}>
        <ul
          data-aos={contentAnimation}
          className="px-2 pl-4 mt-2 md:mt-4 md:px-12"
        >
          {pageData.map((e) => (
            <ExperienceCard {...e} key={e.company} />
          ))}
        </ul>
      </PageWrapper>
    </>
  );
};

export default ExperiencePage;
