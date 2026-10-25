"use client";

import { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { usePathname, useRouter } from "next/navigation";
import { useNPCAFirebase } from "../firebase.js";

export default function AuthGuard({ children }) {
  const { auth } = useNPCAFirebase();
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (!user && pathname !== "/login") router.replace("/login");
      if (user && pathname === "/login") router.replace("/");
      setLoading(false);
    });
    return unsubscribe;
  }, [auth, pathname, router]);

  if (loading) {
    return <main className="center-container"><p>Carregando...</p></main>;
  }
  return children;
}
