"use client";
import { createContext, useContext } from 'react';

const FirebaseContext = createContext(null);
export function NPCAFirebaseProvider({ auth, database, children }) {
  return <FirebaseContext.Provider value={{ auth, database }}>{children}</FirebaseContext.Provider>;
}
export function useNPCAFirebase() {
  const value = useContext(FirebaseContext);
  if (!value?.auth) throw new Error('Envolva os componentes em NPCAFirebaseProvider com a instância auth do seu projeto.');
  return value;
}
