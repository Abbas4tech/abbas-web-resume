import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ContentfulPage } from "@/components/contentful/assembly/contentful-page";
import { MotionWrapper } from "@/components/elements/behavior/motion-wrapper/motion-wrapper";
import { Icon } from "@/components/elements/ui/icon/icon";
import { RichText } from "@/components/patterns/rich-text/rich-text";
import { SectionHeading } from "@/components/patterns/section-heading/section-heading";
import { adaptPageMetadata } from "@/contentful/adapters/page-metadata";
import { getPageData } from "@/contentful/lib/get-page-data";
import { getPagePaths } from "@/contentful/lib/get-page-paths";

interface PageProps {
  params: { slug?: string[] };
}

export const revalidate = 3600;

function resolvePath(slug?: string[]): string {
  return slug && slug.length > 0 ? `/${slug.join("/")}` : "/";
}

export async function generateStaticParams() {
  return getPagePaths();
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const path = resolvePath(params.slug);
  const pageData = await getPageData(path);

  return adaptPageMetadata(pageData);
}

export default async function ComposablePage({ params }: Readonly<PageProps>) {
  const path = resolvePath(params.slug);
  const pageData = await getPageData(path);

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
