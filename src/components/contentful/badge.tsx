import type { AdaptedBadge } from "@/contentful/adapters/badge";
import { Icon } from "./icon";

interface Props {
  className?: string;
  data: AdaptedBadge;
}

export function Badge({ data, className }: Props) {
  return (
    <div
      className={`inline-flex items-center gap-1.5 rounded-full border border-base-300 bg-base-200 px-2.5 py-0.5 font-medium text-base-content/80 text-xs ${className || ""}`}
    >
      {data.icon && <Icon className="h-3.5 w-3.5" data={data.icon} />}
      <span>{data.title}</span>
    </div>
  );
}
