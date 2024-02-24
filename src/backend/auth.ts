import { DecodedIdToken, getAuth } from "firebase-admin/auth";
import { NextRequest } from "next/server";

export async function isAdmin(request: NextRequest): Promise<boolean> {
  const rawIdToken = request.headers.get("authorization");
  if (!rawIdToken?.startsWith("Bearer ")) return false;
  const idToken = rawIdToken.substring(7);

  let decodedToken: DecodedIdToken;
  try {
    decodedToken = await getAuth().verifyIdToken(idToken);
  } catch (error) {
    console.warn("Failed to verifyIdToken. Error:", error);
    return false;
  }
  return decodedToken.admin === true;
}
