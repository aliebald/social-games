import { Switch, SwitchProps } from "@mantine/core";
import TextWithInfoIconTooltip from "../textWithInfoIconTooltip/textWithInfoIconTooltip";

interface SwitchWithTooltipProps extends Omit<SwitchProps, "label"> {
  label: string;
  tooltip: string;
}

export default function SwitchWithTooltip({
  label,
  tooltip,
  ...switchProps
}: SwitchWithTooltipProps) {
  return (
    <Switch
      {...switchProps}
      label={<TextWithInfoIconTooltip text={label} tooltip={tooltip} />}
    />
  );
}
