import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PageWrapper } from "@/components/blocks/page-wrapper";
import { adaptPageWrapper } from "@/components/blocks/page-wrapper/adapter";
import { ContentList } from "@/components/contentful/content-list";
import { ContentSection } from "@/components/contentful/content-section";
import { adaptIcon } from "@/contentful/adapters/icon";
import { adaptPage } from "@/contentful/adapters/page";
import { contentfulSdk } from "@/contentful/lib/client";
import type { MetaPage } from "@/types/common";

interface PageProps {
  params: { slug?: string[] };
}

export const revalidate = 60;

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const path = params.slug ? `/${params.slug.join("/")}` : "/";
  // Just use existing getPageMetadata with the path since it searches by path in Contentful?
  // Wait, getPageMetadata took an ID. Let's look at it. Let's just fetch it normally.
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
    // Add other fields as needed
  };
}

export default async function ComposablePage({ params }: PageProps) {
  const path = params.slug ? `/${params.slug.join("/")}` : "/";
  const [pageResponse, layoutResponse] = await Promise.all([
    contentfulSdk.GetPageByPath({ path }),
    contentfulSdk.GetLayout(),
  ]);

  const rawPage = pageResponse.data?.pageCollection?.items?.[0];
  const pageData = adaptPage(rawPage);

  if (!pageData) {
    notFound();
  }

  const layoutItems =
    layoutResponse.data?.layoutCollection?.items?.[0]?.navigation
      ?.customEntriesCollection?.items || [];

  // adaptPageWrapper expects pagesCollection shape from old API. We map our new items to that shape.
  const mappedPages: MetaPage[] = layoutItems.map((item) => {
    const adaptedIcon = adaptIcon(item?.icon);
    console.log(item?.linksCollection?.items[0]?.url);
    return {
      pageUrl:
        item?.linksCollection?.items?.[0]?.url ||
        `/${item?.entryField?.toLowerCase()}` ||
        "/",
      title: item?.title || "",
      isDefaultPage: false,
      pageIcon: adaptedIcon
        ? adaptedIcon
        : {
            __typename: "Icon" as const,
            id: "default-icon",
            internalName: "Default Icon",
            name: "Page",
            library: "fa",
            title: "Page",
            color: "",
            iconCode: "fa/FaFile",
            showTooltip: false,
          },
    };
  });

  return (
    <PageWrapper
      {...adaptPageWrapper({
        pagesCollection: {
          items: mappedPages,
        },
        children: null,
      })}
    >
      <div className="flex flex-col gap-8 py-8">
        {pageData.topContentArea.map((block) => {
          if (block.__typename === "ContentSection") {
            return <ContentSection data={block} key={block.id} />;
          }
          if (block.__typename === "ContentList") {
            return <ContentList data={block} key={block.id} />;
          }
          return null;
        })}

        {pageData.bottomContentArea.map((block) => {
          if (block.__typename === "ContentSection") {
            return <ContentSection data={block} key={block.id} />;
          }
          if (block.__typename === "ContentList") {
            return <ContentList data={block} key={block.id} />;
          }
          return null;
        })}
      </div>
    </PageWrapper>
  );
}
