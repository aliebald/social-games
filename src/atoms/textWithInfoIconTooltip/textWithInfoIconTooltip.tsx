import styles from "./textWithInfoIconTooltip.module.css";
import { Group, MantineStyleProps, Text, Tooltip } from "@mantine/core";
import { IconInfoCircle } from "@tabler/icons-react";
import { ReactNode } from "react";

interface TextWithInfoIconTooltipProps extends MantineStyleProps {
  text: string;
  tooltip: string;
  suffix?: ReactNode;
}

export default function TextWithInfoIconTooltip({
  text,
  tooltip,
  fw,
  suffix,
  ...mantineStyleProps
}: TextWithInfoIconTooltipProps) {
  return (
    <Group {...mantineStyleProps} gap="4px">
      <Text size="sm" fw={fw}>
        {text}
      </Text>
      <Tooltip label={tooltip}>
        <IconInfoCircle height={20} className={styles.infoIcon} />
      </Tooltip>
      {suffix}
    </Group>
  );
}
