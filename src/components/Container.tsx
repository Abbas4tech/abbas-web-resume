"use client";
import React from "react";
import Sidebar from "./Sidebar";
import Header from "./Header";
import ProfileCard from "./ProfileCard";
import * as AOS from "aos";
interface ContainerProps {
  children: React.ReactNode;
}

const Container = ({ children }: ContainerProps) => {
  AOS.init();
  return (
    <main className="w-full container overflow-hidden h-screen md:text-lg text-sm mx-auto">
      <Header />
      <div className="drawer lg:drawer-open">
        <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
        <div className="drawer-content mx-4 mt-4 mb-[6rem] overflow-auto">
          <ProfileCard />
          {children}
          <button className="btn btn-primary mb-14">Change Page</button>
        </div>
        <Sidebar />
      </div>
    </main>
  );
};

export default Container;
