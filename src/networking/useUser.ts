import { useEffect, useState } from "react";
import { User as FirebaseUser, getAuth, onIdTokenChanged } from "firebase/auth";
import { set } from "lodash";

export interface User extends FirebaseUser {
  admin: boolean;
}

export default function useUser() {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onIdTokenChanged(auth, async (firebaseUser) => {
      if (firebaseUser === null) {
        setUser(null);
        return;
      }

      const admin: boolean =
        (await firebaseUser.getIdTokenResult()).claims.admin === true;

      setUser(set(firebaseUser, "admin", admin) as User);
    });
    return unsubscribe;
  }, []);

  return user;
}
