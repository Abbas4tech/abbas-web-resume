import { RichText } from "@/components/patterns/rich-text/rich-text";
import type { AdaptedContentItem } from "@/contentful/adapters/content-item";
import { Badge } from "./badge";
import { Icon } from "./icon";
import { Image } from "./image";
import { Link } from "./link";

interface Props {
  className?: string;
  data: AdaptedContentItem;
}

export function ContentItem({ data, className }: Props) {
  return (
    <article
      className={`flex flex-col gap-4 rounded-2xl border border-base-200 bg-base-100 p-6 shadow-sm ${className || ""}`}
    >
      {data.image && (
        <div className="mb-2 overflow-hidden rounded-xl">
          <Image className="max-h-48 w-full object-cover" data={data.image} />
        </div>
      )}

      <header className="flex items-start justify-between gap-4">
        <div className="flex flex-col gap-1">
          {data.entryField && (
            <span className="font-semibold text-primary text-xs uppercase tracking-wider">
              {data.entryField}
            </span>
          )}
          <h3 className="flex items-center gap-2 font-bold text-xl">
            {data.icon && (
              <Icon className="h-6 w-6 text-primary" data={data.icon} />
            )}
            {data.title}
          </h3>
          {data.subtitle && (
            <p className="font-medium text-base-content/70 text-sm">
              {data.subtitle}
            </p>
          )}
        </div>

        {(data.startDate || data.endDate) && (
          <div className="whitespace-nowrap rounded-full bg-base-200 px-3 py-1 font-medium text-base-content/60 text-xs">
            {data.startDate?.getFullYear() || ""} —{" "}
            {data.endDate?.getFullYear() || "Present"}
          </div>
        )}
      </header>

      {data.description && (
        <p className="text-base-content/80">{data.description}</p>
      )}

      {data.body && (
        <div className="prose prose-sm max-w-none">
          <RichText document={data.body} />
        </div>
      )}

      {data.subItems && data.subItems.length > 0 && (
        <div className="mt-2 flex flex-wrap gap-2">
          {data.subItems.map((badge) => (
            <Badge data={badge} key={badge.id} />
          ))}
        </div>
      )}

      {data.links && data.links.length > 0 && (
        <div className="mt-4 flex flex-wrap gap-4 border-base-200 border-t pt-4">
          {data.links.map((link) => (
            <Link
              className="font-semibold text-primary text-sm hover:underline"
              data={link}
              key={link.id}
            />
          ))}
        </div>
      )}
    </article>
  );
}
