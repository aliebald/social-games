import styles from "./gamesFilter.module.css";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import {
  Collapse,
  Container,
  Group,
  NumberInput,
  SimpleGrid,
  Switch,
  Title,
  Button,
  Divider,
  Box,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { IconChevronDown } from "@tabler/icons-react";
import { isEqual, uniqBy } from "lodash";
import classNames from "classnames";
import Game from "@/types/game";
import Tag from "@/types/tag";
import SelectableTagGroup from "../selectableTagGroup/selectableTagGroup";
import SwitchWithTooltip from "@/atoms/switchWithTooltip/switchWithTooltip";

interface GamesFilterProps {
  games: Game[];
  setFilteredGames: (filteredGames: Game[]) => void;
}

interface Filter {
  playerCount: number | null;
  includeUnknownPlayerCount: boolean;
  includeWithoutTags: boolean;
  includedTagIds: string[];
  excludedTagIds: string[];
}

export default function GamesFilter({
  games,
  setFilteredGames,
}: GamesFilterProps) {
  const [showFilter, { toggle: toggleShowFilter }] = useDisclosure(true);

  const tags = useMemo(() => getTagsFromGames(games), [games]);
  const defaultFilter = useMemo(
    (): Filter => ({
      playerCount: null,
      includeUnknownPlayerCount: true,
      includeWithoutTags: true,
      includedTagIds: tags.map(({ id }) => id),
      excludedTagIds: [],
    }),
    [tags]
  );

  const [filter, setFilter] = useState<Filter>(defaultFilter);
  const filterRef = useRef(filter);

  const isDefaultFilter = useMemo(
    () => isEqual(filter, defaultFilter),
    [defaultFilter, filter]
  );

  useEffect(() => {
    filterRef.current = filter;
  }, [filter]);

  const updateFilter = useCallback(
    (updates: Partial<Filter>) => {
      const newFilter: Filter = { ...filterRef.current, ...updates };
      const filteredGames = filterGames(games, newFilter);
      setFilter(newFilter);
      setFilteredGames(filteredGames);
    },
    [games, setFilteredGames]
  );

  useEffect(() => {
    updateFilter({ includedTagIds: tags.map((tag) => tag.id) });
  }, [updateFilter, tags]);

  const onPlayerCountChange = (newPlayerCount: string | number) =>
    updateFilter({
      playerCount: typeof newPlayerCount === "string" ? null : newPlayerCount,
    });

  const onSwitchGroupChange = (values: string[]) =>
    updateFilter({
      includeUnknownPlayerCount: values.includes("includeUnknownPlayerCount"),
      includeWithoutTags: values.includes("includeWithoutTags"),
    });

  return (
    <Container pb="sm">
      <Group gap="xs">
        <Title size="h2">Games</Title>
        <Button
          disabled={isDefaultFilter}
          onClick={() => updateFilter(defaultFilter)}
          className={classNames(styles.resetBtn, {
            [styles.resetBtnHidden]: !showFilter,
          })}
        >
          Reset Filter
        </Button>
      </Group>

      <Divider
        variant="dashed"
        onClick={toggleShowFilter}
        my="xs"
        label={
          <>
            <IconChevronDown
              className={classNames(styles.chevron, {
                [styles.chevronClosed]: showFilter,
              })}
              size={14}
            />
            <Box ml={5}>{showFilter ? "Hide" : "Show"} Filter</Box>
          </>
        }
      />

      <Collapse in={showFilter} transitionDuration={300}>
        <SimpleGrid
          cols={{ base: 1, sm: 2 }}
          spacing="md"
          verticalSpacing="sm"
          className={styles.grid}
        >
          <NumberInput
            label="Player count"
            value={filter.playerCount ?? ""}
            onChange={onPlayerCountChange}
          />
          <Switch.Group
            label="Include games without..."
            value={getSwitchGroupValue(filter)}
            onChange={onSwitchGroupChange}
          >
            <Group className={styles.switchGroup}>
              <SwitchWithTooltip
                label="...player count"
                tooltip="If enabled, games without min- and max player information will still be included in the results, when 'player count' number is specified"
                value="includeUnknownPlayerCount"
              />
              <SwitchWithTooltip
                label="...tags"
                tooltip="If enabled, games without any assigned tags included in the results"
                value="includeWithoutTags"
              />
            </Group>
          </Switch.Group>
        </SimpleGrid>

        <SelectableTagGroup
          label="Included Tags"
          tooltip="Only games with at least one of the selected filters are shown."
          tags={tags}
          selectedTagIds={filter.includedTagIds}
          onChange={(includedTagIds) => updateFilter({ includedTagIds })}
          isTagDisabled={(tag) => filter.excludedTagIds.includes(tag.id)}
        />
        <SelectableTagGroup
          pb="xs"
          label="Excluded Tags"
          tooltip="Games including a excluded tag will be hidden. Has priority over included tags filter above."
          tags={tags}
          selectedTagIds={filter.excludedTagIds}
          onChange={(excludedTagIds) => updateFilter({ excludedTagIds })}
        />
      </Collapse>
    </Container>
  );
}

function getTagsFromGames(games: Game[]): Tag[] {
  return uniqBy(
    games.flatMap(({ tags }) => tags),
    "id"
  );
}

function getSwitchGroupValue(filter: Filter) {
  return [
    ...(filter.includeUnknownPlayerCount
      ? (["includeUnknownPlayerCount"] as const)
      : []),
    ...(filter.includeWithoutTags ? (["includeWithoutTags"] as const) : []),
  ];
}

function filterGames(games: Game[], filter: Filter) {
  const filteredGames = games.filter((game) => {
    if (!supportsPlayerCount(game, filter)) return false;
    if (game.tags.some((tag) => filter.excludedTagIds.includes(tag.id))) {
      return false;
    }
    return (
      game.tags.some((tag) => filter.includedTagIds.includes(tag.id)) ||
      (game.tags.length === 0 && filter.includeWithoutTags)
    );
  });

  return filteredGames;
}

function supportsPlayerCount(
  { minPlayers, maxPlayers }: Game,
  { playerCount, includeUnknownPlayerCount }: Filter
) {
  if (playerCount === null) return true;
  if (minPlayers !== undefined && minPlayers > playerCount) return false;
  if (maxPlayers !== undefined && maxPlayers < playerCount) return false;
  if (minPlayers === undefined && maxPlayers === undefined) {
    return includeUnknownPlayerCount;
  }
  return true;
}
