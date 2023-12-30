import { useEffect, useState } from "react";
import { User, getAuth, onAuthStateChanged } from "firebase/auth";

export default function useUser() {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user ?? null);
    });
    return unsubscribe;
  }, []);

  return user;
}
