import { NextRequest, NextResponse } from "next/server";
import { isAdmin } from "./auth";

export async function handleAdminRequest(
  request: NextRequest,
  handler: (request: NextRequest) => Promise<NextResponse>
) {
  const endpointSummary = `${request.method.padEnd(4)} ${
    request.nextUrl.pathname
  }`;
  console.log(endpointSummary);

  if (!(await isAdmin(request))) {
    console.log("Unauthorized request");
    return NextResponse.json({ message: "Forbidden" }, { status: 403 });
  }

  let response: NextResponse<unknown>;
  try {
    response = await handler(request);
  } catch (error) {
    console.error("Request handler threw error:", error);
    response = NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
  console.log(`${endpointSummary} responding with ${response.status}`);
  return response;
}
