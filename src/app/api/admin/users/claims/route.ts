import { initFirebaseAdminApp } from "@/backend/firebase-admin";
import { handleAdminRequest } from "@/backend/request-handler";
import { UpdateClaimsRequestBody, UserRecord } from "@/networking/admin/types";
import { getAuth } from "firebase-admin/auth";
import { isBoolean, isObject, isString } from "lodash";
import { NextResponse, NextRequest } from "next/server";

initFirebaseAdminApp();

/**
 * Update a users claims.
 *
 * Will update only claims within request. Returns all claims for user.
 */
export async function POST(request: NextRequest) {
  return handleAdminRequest(request, updateClaims);
}

async function updateClaims(request: NextRequest): Promise<NextResponse> {
  const data = await request.json();
  if (!isValidUpdateClaimsRequestBody(data)) {
    console.warn("Invalid UpdateClaimsRequestBody", data);
    return NextResponse.json({ message: "Invalid request" }, { status: 400 });
  }

  const auth = await getAuth();

  let user: UserRecord;
  try {
    user = await auth.getUser(data.uid);
  } catch (error) {
    console.log(`No user with id "${data.uid}" found.`);
    return NextResponse.json({ message: "User not found" }, { status: 404 });
  }

  const newClaims = { ...user.customClaims, ...data.claims };
  await auth.setCustomUserClaims(data.uid, newClaims);

  return NextResponse.json(
    { uid: data.uid, claims: newClaims },
    { status: 200 }
  );
}

function isValidUpdateClaimsRequestBody(
  body: unknown
): body is UpdateClaimsRequestBody {
  return (
    isObject(body) &&
    Object.keys(body).length === 2 &&
    "uid" in body &&
    "claims" in body &&
    isString(body.uid) &&
    isValidClaimsObject(body.claims)
  );
}

function isValidClaimsObject(
  obj: unknown
): obj is UpdateClaimsRequestBody["claims"] {
  return (
    isObject(obj) &&
    objectHasOnlyAllowedKeys(obj, ["admin", "member"]) &&
    (!("admin" in obj) || isBoolean(obj.admin)) &&
    (!("member" in obj) || isBoolean(obj.member))
  );
}

function objectHasOnlyAllowedKeys(obj: object, allowedKeys: string[]) {
  return Object.keys(obj).reduce(
    (prev, current) => prev && allowedKeys.includes(current),
    true
  );
}
