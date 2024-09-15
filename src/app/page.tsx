"use client";
import React, { useEffect, useState } from "react";
import { fetchAboutUsPage } from "@utils/api";

export default function Home() {
  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await fetchAboutUsPage();
        console.log(result[1]);
      } catch (err: any) {
        console.error(err);
      } finally {
      }
    };

    fetchData(); // Fetch data on component mount
  }, []);

  return (
    <div>
      <h1>Shaikh</h1>
    </div>
  );
}
