import { redirect } from "next/navigation";

export async function GET() {
  const validUser = process.env.BASIC_AUTH_USER ?? "";
  const validPassWord = process.env.BASIC_AUTH_PASSWORD ?? "";
  const doesNotUseBasicAuth = validUser === "" && validPassWord === "";

  if (doesNotUseBasicAuth) {
    redirect("/");
  }

  return new Response("Authentication Required", {
    status: 401,
    headers: {
      "WWW-Authenticate": "Basic realm='private'",
    },
  });
}
