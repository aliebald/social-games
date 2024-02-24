/* eslint-disable @typescript-eslint/no-var-requires */

/*
 * Node script that adds claims to a given user.
 *
 * To use this script, you must:
 * 1) Get a `serviceAccountKey.json` from firebase 
 *    (Project settings -> Service accounts -> Generate New Private Key)
 * 2) Set the `UID` constant bellow
 * 3) Set the `claims` constant bellow
 */

// TODO: set user id before running the script.
const UID = null;

// TODO: specify which claims the user should have
const claims = { admin: false, member: false }

setClaims()

function setClaims() {
	if (UID === null) {
		console.warn("Specify UID to set admin claim")
		return;
	}

	const admin = require("firebase-admin")

	admin.initializeApp({
		credential: admin.credential.cert("./serviceAccountKey.json"),
	})

	admin
		.auth()
		.setCustomUserClaims(UID, claims)
		.then(() => {
			// The new custom claims will propagate to the user's ID token the
			// next time a new one is issued.
			console.log(`${JSON.stringify(claims)} claims added to ${UID}`)
		});
}
