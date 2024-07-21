import Link from "next/link";
import React from "react";
import { GrDocumentDownload } from "react-icons/gr";
import { useUserInfo } from "@context/useInfo";

const ResumeComp = () => {
  const { resume } = useUserInfo();
  return (
    <div
      data-tip={resume.title}
      className="px-4 py-2 cursor-pointer tooltip tooltip-left"
    >
      <Link target="_blank" passHref href={resume.src}>
        <GrDocumentDownload size={25} />
      </Link>
    </div>
  );
};

export default ResumeComp;
