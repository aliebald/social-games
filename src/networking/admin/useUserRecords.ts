import useSWR from "swr";
import jsonFetcher, { JsonFetcherArgs } from "./jsonFetcher";
import useUser from "../useUser";
import { useCallback } from "react";
import { UserRecordCache } from "./types";
import { usersEndpoint } from "./endpoints";

export function useUserRecords() {
  const user = useUser();

  const requestInit = useCallback<() => Promise<RequestInit>>(
    async () => ({
      method: "GET",
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${await user?.getIdToken()}`,
      },
    }),
    [user]
  );

  const { data, error, isLoading } = useSWR<
    UserRecordCache,
    unknown,
    JsonFetcherArgs | null
  >(
    user === null ? null : { url: usersEndpoint, init: requestInit },
    jsonFetcher
  );

  return { data: data?.users ?? null, error, isLoading };
}
