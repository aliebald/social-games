interface FetcherInputObj {
  url: string;
  params: { [key: string]: string };
}

type UrlInput = string | FetcherInputObj;

export interface JsonFetcherArgs {
  url: UrlInput;
  init?: RequestInit | (() => Promise<RequestInit>);
}

/**
 * Fetcher for SWR
 * @See https://swr.vercel.app/docs/
 */
export default async function jsonFetcher({
  url: urlInput,
  init: initInput,
}: JsonFetcherArgs) {
  const url = parseFetcherUrl(urlInput);
  const init = typeof initInput === "function" ? await initInput() : initInput;

  console.log(`jsonFetcher("${url}", ${init ?? ""})`);
  const response = await fetch(url, init);
  if (!response.ok) {
    const err = await response.text();
    console.error("JsonFetcher ERROR:", err);
    throw Error(err);
  }
  return await response.json();
}

function parseFetcherUrl(urlInput: UrlInput): string {
  if (typeof urlInput === "string") return urlInput;
  const params = Object.entries(urlInput.params).map(
    ([key, value]) => `${key}=${value}`
  );
  return `${urlInput.url}?${params.join("&")}`;
}
