import React from "react";
import Link from "next/link";

const NotFound = () => {
  return (
    <div className="hero min-h-screen">
      <div className="hero-content text-center">
        <div className="max-w-md">
          <h1 className="text-xl font-bold md:text-4xl">
            Page Not Found
          </h1>
          <p className="py-6 text-lg lg:text-2xl">
            Something Went Wrong!!!
          </p>
          <Link href={"/"} className="btn btn-ghost">
            Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
