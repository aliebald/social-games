import type { UserRecord as FirebaseUserRecord } from "firebase-admin/auth";

export interface CustomClaims {
  readonly admin?: boolean;
  readonly member?: boolean;
}

export interface UserRecord extends Omit<FirebaseUserRecord, "customClaims"> {
  readonly customClaims?: CustomClaims;
}

export interface UpdateClaimsRequestBody {
  uid: string;
  claims: CustomClaims;
}

export interface UpdateClaimsResponseBody {
  uid: string;
  claims: Required<CustomClaims>;
}

export interface UserRecordCache {
  users: UserRecord[];
}
