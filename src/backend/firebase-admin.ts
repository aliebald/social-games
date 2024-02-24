import { getApps, initializeApp, getApp, App, cert } from "firebase-admin/app";

if (!process.env.FIREBASE_SERVICE_ACCOUNT) {
  console.error("Missing FIREBASE_SERVICE_ACCOUNT environment variable");
}

const { clientEmail, privateKey } = JSON.parse(
  process.env.FIREBASE_SERVICE_ACCOUNT ?? "{}"
);

export function initFirebaseAdminApp(): App {
  if (getApps().length > 0) {
    return getApp();
  }
  return initializeApp({
    credential: cert({
      projectId: process.env.NEXT_PUBLIC_PROJECT_ID,
      clientEmail,
      privateKey,
    }),
  });
}
