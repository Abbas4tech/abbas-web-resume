import Link from "next/link";
import React, { memo } from "react";
import { useApplicationData } from "@context";
import { DynamicIcon } from "@components";

const ResumeComp = memo(() => {
  const { resume, resumeIcon } = useApplicationData();
  return (
    <div className="md:px-4 md:py-2 px-2 py-1 cursor-pointer">
      <Link target="_blank" passHref href={`https:${resume.file.url}`}>
        <DynamicIcon {...resumeIcon} />
      </Link>
    </div>
  );
});

ResumeComp.displayName = "ResumeComp";

export default ResumeComp;
