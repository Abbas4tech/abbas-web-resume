import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ContentfulPage } from "@/components/contentful/contentful-page";
import { adaptPage } from "@/contentful/adapters/page";
import { contentfulSdk } from "@/contentful/lib/client";

interface PageProps {
  params: { slug?: string[] };
}

export const revalidate = 60;

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const path = params.slug ? `/${params.slug.join("/")}` : "/";
  const response = await contentfulSdk.GetPageByPath({ path });
  const rawPage = response.data?.pageCollection?.items?.[0];
  const pageData = adaptPage(rawPage);

  if (!pageData) {
    return {};
  }

  return {
    title: pageData.seo?.title || pageData.title,
    description: pageData.seo?.description,
    keywords: pageData.seo?.keywords,
  };
}

export default async function ComposablePage({ params }: PageProps) {
  const path = params.slug ? `/${params.slug.join("/")}` : "/";
  const pageResponse = await contentfulSdk.GetPageByPath({ path });

  const rawPage = pageResponse.data?.pageCollection?.items?.[0];
  const pageData = adaptPage(rawPage);

  if (!pageData) {
    notFound();
  }

  return <ContentfulPage data={pageData} />;
}
