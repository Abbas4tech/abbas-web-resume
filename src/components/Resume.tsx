import Link from "next/link";
import React, { memo } from "react";
import { useApplicationData } from "@context";
import DynamicIcons from "./DynamicIcon";

const ResumeComp = memo(() => {
  const { resume, resumeIcon } = useApplicationData();
  return (
    <div className="md:px-4 md:py-2 px-2 py-1 cursor-pointer">
      <Link
        className={resumeIcon.classes?.join(" ") + " block"}
        target="_blank"
        passHref
        href={`https:${resume.file.url}`}
      >
        <DynamicIcons {...resumeIcon} />
      </Link>
    </div>
  );
});

ResumeComp.displayName = "ResumeComp";

export default ResumeComp;
