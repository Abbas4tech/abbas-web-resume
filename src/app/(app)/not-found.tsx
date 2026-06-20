import type { Metadata } from "next";
import { NotFoundBlock } from "@/components/blocks/not-found/not-found";

export const metadata: Metadata = {
  title: "404 - Page Not Found",
  description: "The page you are looking for doesn't exist.",
};

export default function NotFound() {
  return <NotFoundBlock />;
}
