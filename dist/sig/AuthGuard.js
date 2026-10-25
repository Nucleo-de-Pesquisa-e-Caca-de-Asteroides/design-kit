"use client";

import { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { usePathname, useRouter } from "next/navigation";
import { useNPCAFirebase } from "../firebase.js";
import { jsx as _jsx } from "react/jsx-runtime";
export default function AuthGuard({
  children
}) {
  const {
    auth
  } = useNPCAFirebase();
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const pathname = usePathname();
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, user => {
      if (!user && pathname !== "/login") router.replace("/login");
      if (user && pathname === "/login") router.replace("/");
      setLoading(false);
    });
    return unsubscribe;
  }, [auth, pathname, router]);
  if (loading) {
    return /*#__PURE__*/_jsx("main", {
      className: "center-container",
      children: /*#__PURE__*/_jsx("p", {
        children: "Carregando..."
      })
    });
  }
  return children;
}
