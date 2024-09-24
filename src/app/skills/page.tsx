"use client";
import React from "react";
import { NextPage } from "next";
import { SkillSet } from "@utils/contentful";
import SkillSetItem from "@components/SkillSet";
import PageTemplate from "@components/PageTemplate";

const SkillsPage: NextPage = () => {
  return (
    <>
      <PageTemplate<SkillSet>
        renderItem={(item: SkillSet) => (
          <SkillSetItem {...item} key={item.title} />
        )}
        className="flex flex-col gap-4"
      />
    </>
  );
};

export default SkillsPage;
