import { useSWRConfig } from "swr";
import useUser from "../useUser";
import jsonFetcher from "./jsonFetcher";
import {
  CustomClaims,
  UpdateClaimsResponseBody,
  UserRecordCache,
} from "./types";
import { userClaimsEndpoint, usersEndpoint } from "./endpoints";
import { isObject } from "lodash";

export default function useUpdateClaims() {
  const { mutate } = useSWRConfig();
  const user = useUser();

  return async (uid: string, claims: CustomClaims) => {
    const init = async () => ({
      method: "POST",
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${await user?.getIdToken()}`,
      },
      body: JSON.stringify({ uid, claims }),
    });

    // Type is not actually checked, we thrust the backend atm.
    let response: UpdateClaimsResponseBody;
    try {
      response = await jsonFetcher({ url: userClaimsEndpoint, init });
    } catch (_) {
      return;
    }
    mutate<UserRecordCache>(
      (key) => isObject(key) && "url" in key && key.url === usersEndpoint,
      createUpdateUserRecordsCache(response)
    );
  };
}

function createUpdateUserRecordsCache(response: UpdateClaimsResponseBody) {
  return function updateUserRecordsCache(cache: UserRecordCache | undefined) {
    if (cache === undefined) return cache;
    const modifiedIndex = cache.users.findIndex(
      ({ uid }) => uid === response.uid
    );
    if (modifiedIndex !== undefined && modifiedIndex >= 0) {
      cache.users[modifiedIndex] = {
        ...cache.users[modifiedIndex],
        customClaims: response.claims,
      };
    }
    return cache;
  };
}
