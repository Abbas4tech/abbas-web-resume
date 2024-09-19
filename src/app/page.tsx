"use client";
import BioCard from "@components/BioCard";
import { useUserInfo } from "@context/useInfo";
import React from "react";

const ContactInfo = () => {
  const { info } = useUserInfo();

  return (
    <div className="grid grid-cols-1 my-2 rounded-xl gap-4 md:grid-cols-2">
      {info.map(({ fields }) => (
        <BioCard
          key={fields.title}
          title={fields.title}
          value={fields.value}
          identifier={fields.identifier}
        />
      ))}
    </div>
  );
};

export default ContactInfo;
