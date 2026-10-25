"use client";

import { createContext, useContext } from 'react';
import { jsx as _jsx } from "react/jsx-runtime";
const FirebaseContext = createContext(null);
export function NPCAFirebaseProvider({
  auth,
  database,
  children
}) {
  return /*#__PURE__*/_jsx(FirebaseContext.Provider, {
    value: {
      auth,
      database
    },
    children: children
  });
}
export function useNPCAFirebase() {
  const value = useContext(FirebaseContext);
  if (!value?.auth) throw new Error('Envolva os componentes em NPCAFirebaseProvider com a instância auth do seu projeto.');
  return value;
}
