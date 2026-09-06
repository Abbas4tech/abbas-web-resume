import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ContentfulPage } from "@/components/contentful/assembly/contentful-page";
import { MotionWrapper } from "@/components/elements/behavior/motion-wrapper/motion-wrapper";
import { Icon } from "@/components/elements/ui/icon/icon";
import { RichText } from "@/components/patterns/rich-text/rich-text";
import { SectionHeading } from "@/components/patterns/section-heading/section-heading";
import { adaptPage } from "@/contentful/adapters/page";
import { adaptPageMetadata } from "@/contentful/adapters/page-metadata";
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

  return adaptPageMetadata(pageData);
}

export default async function ComposablePage({ params }: Readonly<PageProps>) {
  const path = params.slug ? `/${params.slug.join("/")}` : "/";

  const response = await contentfulSdk.GetPageByPath({ path });
  const rawPage = response.data?.pageCollection?.items?.[0];
  const pageData = adaptPage(rawPage);

  if (!pageData) {
    notFound();
  }

  return (
    <ContentfulPage data={pageData}>
      <SectionHeading
        className="justify-center"
        icon={pageData.icon && <Icon {...pageData.icon} />}
      >
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
