import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ContentfulPage } from "@/components/contentful/assembly/contentful-page";
import { MotionWrapper } from "@/components/elements/behavior/motion-wrapper/motion-wrapper";
import { RichText } from "@/components/patterns/rich-text/rich-text";
import { SectionHeading } from "@/components/patterns/section-heading/section-heading";
import { adaptPage } from "@/contentful/adapters/page";
import { contentfulSdk } from "@/contentful/lib/client";

interface PageProps {
  params: { slug?: string[] };
}

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

  const response = await contentfulSdk.GetPageByPath({ path });
  const rawPage = response.data?.pageCollection?.items?.[0];
  const pageData = adaptPage(rawPage);

  if (!pageData) {
    notFound();
  }

  return (
    <ContentfulPage data={pageData}>
      <SectionHeading className="justify-center">
        {pageData.title}
      </SectionHeading>
      {pageData.description && (
        <MotionWrapper>
          <div className="rounded-md bg-base-300 p-4 text-center">
            <RichText document={pageData.description} />
          </div>
        </MotionWrapper>
      )}
    </ContentfulPage>
  );
}
