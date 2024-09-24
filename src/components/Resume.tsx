import Link from "next/link";
import React, { memo } from "react";
import { FileAsset } from "@utils/contentful";
import { GrDocumentDownload } from "react-icons/gr";
import { useUserInfo } from "@context/useInfo";

interface ResumeProps {
  resume: FileAsset;
}

const ResumeComp = memo(({ resume }: ResumeProps) => {
  return (
    <div
      data-tip={resume.description}
      className="px-4 py-2 cursor-pointer tooltip tooltip-left"
    >
      <Link target="_blank" passHref href={`https:${resume.file.url}`}>
        <GrDocumentDownload size={25} />
      </Link>
    </div>
  );
});

ResumeComp.displayName = "ResumeComp";

export default ResumeComp;
