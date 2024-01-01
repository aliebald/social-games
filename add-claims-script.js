/* eslint-disable @typescript-eslint/no-var-requires */

/*
 * Node script that adds the admin claim to a given user.
 *
 * To use this script, you must:
 * 1) Get a `serviceAccountKey.json` from firebase 
 *    (Project settings -> Service accounts -> Generate New Private Key)
 * 2) Set the `UID` constant bellow
 */

// TODO: set user id before running the script.
const UID = null;

setAdminClaim()

function setAdminClaim() {
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
		.setCustomUserClaims(UID, { admin: true })
		.then(() => {
			// The new custom claims will propagate to the user's ID token the
			// next time a new one is issued.
			console.log(`Admin claim added to ${UID}`)
		});
}
