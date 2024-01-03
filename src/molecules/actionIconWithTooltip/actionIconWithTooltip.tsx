import { ActionIcon, MantineSize, Tooltip } from "@mantine/core";
import { TablerIconsProps } from "@tabler/icons-react";
import { FC, MouseEventHandler } from "react";

export interface ActionIconWithTooltip {
  tooltip: string;
  size?: MantineSize;
  Icon: FC<TablerIconsProps>;
  onClick: (() => void) | (() => Promise<void>);
}

export default function ActionIconWithTooltip({
  tooltip,
  Icon,
  size,
  onClick,
}: ActionIconWithTooltip) {
  const onClickHandler: MouseEventHandler<HTMLButtonElement> = (event) => {
    event.preventDefault();
    onClick();
  };

  return (
    <Tooltip label={tooltip} position="bottom" withArrow openDelay={100}>
      <ActionIcon variant="light" size={size} onClick={onClickHandler}>
        <Icon style={{ width: "75%", height: "75%" }} />
      </ActionIcon>
    </Tooltip>
  );
}
