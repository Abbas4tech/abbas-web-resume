"use client";
import React from "react";
import Sidebar from "./Sidebar";
import Header from "./Header";
interface ContainerProps {
  children: React.ReactNode;
}

const Container = ({ children }: ContainerProps) => {
  return (
    <main className="w-full container h-screen md:text-lg overflow-hidden text-sm mx-auto">
      <Header />
      <div className="drawer lg:drawer-open">
        <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
        <div className="drawer-content flex flex-col items-center justify-center bg-base-200">
          {/* Page content here */}
          <h1>Abbas Content</h1>
          {children}
        </div>
        <Sidebar />
      </div>
    </main>
  );
};

export default Container;
