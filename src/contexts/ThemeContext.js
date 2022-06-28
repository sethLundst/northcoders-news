import { createContext, useContext, useEffect, useState } from "react";

const ThemeContext = createContext();

export function ThemeProvider({ children }) {
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

export function useTheme() {
  const context = useContext(ThemeContext);

  if (context === undefined) {
    throw new Error("useTheme must be used within ThemeContext");
  }

  return context;
}
