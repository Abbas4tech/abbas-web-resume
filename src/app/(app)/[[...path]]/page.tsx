import React from "react";
import { redirect } from "next/navigation";

/**
 * Catch-all route for unmapped paths
 * Routes to /about for root path, otherwise shows 404
 */
const Page = async ({
  params,
}: {
  params: Promise<{ path?: string[] }>;
}): Promise<React.JSX.Element> => {
  const { path: pathArray = [] } = await params;

  // If root path, redirect to /about
  if (pathArray.length === 0) {
    redirect("/about");
  }

  // For any other unmatched path, show 404
  return (
    <div className="alert alert-error">
      <span>Page not found</span>
    </div>
  );
};

export default Page;
