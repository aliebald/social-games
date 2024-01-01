import { useEffect, useState } from "react";
import {
  User as FirebaseUser,
  getAuth,
  onAuthStateChanged,
} from "firebase/auth";

export interface User extends FirebaseUser {
  admin: boolean;
}

export default function useUser() {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user === null) {
        setUser(null);
        return;
      }

      const admin: boolean =
        (await user.getIdTokenResult()).claims.admin === true;

      setUser({ ...user, admin });
    });
    return unsubscribe;
  }, []);

  return user;
}
