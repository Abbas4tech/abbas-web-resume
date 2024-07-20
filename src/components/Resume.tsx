import Link from "next/link";
import React from "react";
import { GrDocumentDownload } from "react-icons/gr";
import { Resume } from "@utils/types";

interface ResumeProps {
  data: Resume;
}

const ResumeComp = ({ data }: ResumeProps) => {
  return (
    <div data-tip={data.title} className="px-4 py-2 cursor-pointer tooltip tooltip-left">
      <Link target="_blank" passHref href={data.src}>
        <GrDocumentDownload size={25} />
      </Link>
    </div>
  );
};

export default ResumeComp;
