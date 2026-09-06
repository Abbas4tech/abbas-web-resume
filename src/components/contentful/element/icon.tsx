import { Icon as UIIcon } from "@/components/elements/ui/icon/icon";
import type { AdaptedIcon } from "@/contentful/adapters/icon";

interface Props {
  className?: string;
  data: AdaptedIcon;
}

export function Icon({ data, className }: Props) {
  if (!data.name) {
    return null;
  }

  return (
    <UIIcon
      className={className}
      name={data.name}
      style={data.color ? { color: data.color } : undefined}
      title={data.showTooltip ? data.title || data.name : undefined}
    />
  );
}
