import { useEffect, useState } from "react";
import { ThemeContext } from "../contexts/ThemeContext";

export default function ThemeProvider({ children }) {
  const [dark, setDark] = useState(
    window.matchMedia("(prefers-color-scheme: dark)").matches
  );

  useEffect(() => {
    const theme = localStorage.getItem("theme");
    if (theme) {
      setDark(JSON.parse(theme));
    }
  }, [setDark]);

  useEffect(() => {
    localStorage.setItem("theme", JSON.stringify(dark));
  });

  return (
    <ThemeContext.Provider value={{ dark, setDark }}>
      <div className="App" id="App" data-theme={dark ? "dark" : "light"}>
        {children}
      </div>
    </ThemeContext.Provider>
  );
}
