import { NextResponse, NextRequest } from "next/server";
import { UserRecord, getAuth } from "firebase-admin/auth";
import { initFirebaseAdminApp } from "@/backend/firebase-admin";
import { handleAdminRequest } from "@/backend/request-handler";

initFirebaseAdminApp();

export async function GET(request: NextRequest) {
  return handleAdminRequest(request, getUsers);
}

async function getUsers(): Promise<NextResponse> {
  const users: UserRecord[] = [];
  let nextPageToken: string | undefined = undefined;
  let iteration = 0;
  do {
    const response = await getAuth().listUsers(1000, nextPageToken);
    users.push(...response.users);
    nextPageToken = response.pageToken;
    ++iteration;
  } while (nextPageToken !== undefined && iteration <= 6);

  console.log(`Found ${users.length} users after ${iteration} iterations.`);
  return NextResponse.json({ users }, { status: 200 });
}
