import { MantineSize, Text } from "@mantine/core";

interface PlayerCountProps {
  minPlayers?: number;
  maxPlayers?: number;
  size?: MantineSize;
}

export default function PlayerCount({
  minPlayers,
  maxPlayers,
  size = "sm",
}: PlayerCountProps) {
  if (minPlayers === undefined && maxPlayers === undefined) return <></>;

  return (
    <Text size={size} c="dimmed">
      {getPlayerRange(minPlayers, maxPlayers)}
    </Text>
  );
}

function getPlayerRange(minPlayers?: number, maxPlayers?: number) {
  if (minPlayers === undefined && maxPlayers === undefined) return "";
  if (minPlayers === undefined) {
    return `Up to ${maxPlayers} player${getPluralS(maxPlayers!)}`;
  }
  if (maxPlayers === undefined) {
    return `${minPlayers} or more players`;
  }
  return `${minPlayers} to ${maxPlayers} players`;
}

function getPluralS(num: number) {
  return num === 0 || num > 1 ? "s" : "";
}
