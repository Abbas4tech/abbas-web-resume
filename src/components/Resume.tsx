import Link from "next/link";
import React, { memo } from "react";
import { GrDocumentDownload } from "react-icons/gr";
import { useApplicationData } from "@context";

const ResumeComp = memo(() => {
  const { resume } = useApplicationData();
  return (
    <div
      data-tip={resume.description}
      className="md:px-4 md:py-2 px-2 py-1 cursor-pointer tooltip tooltip-left"
    >
      <Link target="_blank" passHref href={`https:${resume.file.url}`}>
        <GrDocumentDownload className="w-4 h-4 lg:w-6 lg:h-6" />
      </Link>
    </div>
  );
});

ResumeComp.displayName = "ResumeComp";

export default ResumeComp;
