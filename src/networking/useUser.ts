import { useEffect, useState } from "react";
import { User as FirebaseUser, getAuth, onIdTokenChanged } from "firebase/auth";
import { merge } from "lodash";

export interface User extends FirebaseUser {
  admin: boolean;
  member: boolean;
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
      const claims = (await firebaseUser.getIdTokenResult()).claims;
      const user: User = merge(firebaseUser, {
        admin: claims.admin === true,
        member: claims.member === true,
      });
      setUser(user);
    });
    return unsubscribe;
  }, []);

  return user;
}
