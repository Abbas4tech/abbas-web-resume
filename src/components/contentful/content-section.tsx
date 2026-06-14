import { HeroBanner } from "@/components/blocks/hero-banner/hero-banner";
import { adaptHeroBanner } from "@/components/blocks/hero-banner/hero-banner.adapter";
import type { AdaptedContentSection } from "@/contentful/adapters/content-section";
import { adaptLayout } from "@/contentful/adapters/layout";
import { contentfulSdk } from "@/contentful/lib/client";
import { ContentItem } from "./content-item";
import { StatItem } from "./stat-item";

interface Props {
  className?: string;
  data: AdaptedContentSection;
}

export async function ContentSection({ data, className }: Props) {
  if (!data.entry) {
    return null;
  }

  if (data.ui === "HeroBanner") {
    const response = await contentfulSdk.GetLayout();
    const rawLayout = response.data?.layoutCollection?.items?.[0];
    const layoutData = adaptLayout(rawLayout);
    const heroBannerProps = adaptHeroBanner(data, layoutData?.siteLogo || null);
    return <HeroBanner {...heroBannerProps} className={className} />;
  }

  return (
    <section className={`w-full py-12 ${className || ""}`}>
      <div className="mx-auto max-w-4xl">
        {data.entry.__typename === "ContentItem" ? (
          <ContentItem
            className="border-none bg-transparent shadow-none"
            data={data.entry}
          />
        ) : (
          <StatItem data={data.entry} />
        )}
      </div>
    </section>
  );
}
