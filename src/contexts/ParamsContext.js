import { createContext, useContext, useState } from "react";

const ParamsContext = createContext();

function ParamsProvider({ children }) {
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

function useParams() {
  const context = useContext(ParamsContext);

  if (context === undefined) {
    throw new Error("useParams must be used within ParamsContext");
  }

  return context;
}

export { ParamsProvider, useParams };
