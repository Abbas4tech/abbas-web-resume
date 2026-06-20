import type { AdaptedStatItem } from "@/contentful/adapters/stat-item";
import { Badge } from "../elements/badge/badge";
import { Icon } from "./icon";

interface Props {
  className?: string;
  data: AdaptedStatItem;
}

export function StatItem({ data, className }: Props) {
  return (
    <Badge className={`gap-1 px-3 py-1 text-sm ${className || ""}`}>
      {data.icons?.map((icon, idx) => (
        <Icon className="h-4 w-4" data={icon} key={icon.id || idx} />
      ))}
      <span className="font-medium">{data.title}</span>
    </Badge>
  );
}
