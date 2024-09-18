"use client";
import BioCard from "@components/BioCard";
import SVGIcon from "@components/SVGIcon";
import { useUserInfo } from "@context/useInfo";
import React, { useEffect } from "react";

const ContactInfo = () => {
  const { info } = useUserInfo();

  return (
    <div className="grid grid-cols-1 my-2 rounded-xl gap-4 md:grid-cols-2">
      {info.map(({ fields }) => (
        <BioCard
          title={fields.title}
          value={fields.value}
          identifier={fields.identifier}
        />
      ))}
    </div>
  );
};

export default ContactInfo;
