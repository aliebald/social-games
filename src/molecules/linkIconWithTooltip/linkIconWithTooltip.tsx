import LinkIcon, { LinkIconProps } from "@/atoms/linkIcon/linkIcon";
import { Tooltip } from "@mantine/core";

export interface LinkIconWithTooltip extends LinkIconProps {
  tooltip: string;
}

export default function LinkIconWithTooltip({
  tooltip,
  ...linkProps
}: LinkIconWithTooltip) {
  return (
    <Tooltip label={tooltip} position="bottom" withArrow openDelay={100}>
      <LinkIcon {...linkProps} />
    </Tooltip>
  );
}
