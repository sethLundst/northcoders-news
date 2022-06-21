import { createContext, useState } from "react";

export const UserContext = createContext();

export function UserProvider({ children }) {
  const [username, setUsername] = useState("anonymous");

  return (
    <UserContext.Provider value={{ username }}>{children}</UserContext.Provider>
  );
}
