import { createContext, useState } from "react";

export const ParamsContext = createContext();

export function ParamsProvider({ children }) {
  const [selected, setSelected] = useState("All");
  const [filter, setFilter] = useState("");
  const [params, setParams] = useState({
    limit: 15,
    p: 1,
    topic: selected === "All" ? "" : selected.toLowerCase(),
  });
  return (
    <ParamsContext.Provider
      value={{ selected, setSelected, filter, setFilter, params, setParams }}
    >
      {children}
    </ParamsContext.Provider>
  );
}
