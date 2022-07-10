import { createContext, useContext, useEffect, useState } from "react";

const ScreenContext = createContext();

export function ScreenProvider({ children }) {
  const [isGreaterThan992px, setIsGreaterThan992px] = useState(false);

  useEffect(() => {
    function handleResize() {
      if (window.innerWidth > 992) {
        setIsGreaterThan992px(true);
      } else {
        setIsGreaterThan992px(false);
      }
    }
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <ScreenContext.Provider value={{ isGreaterThan992px }}>
      {children}
    </ScreenContext.Provider>
  );
}

export function useScreen() {
  const context = useContext(ScreenContext);

  if (context === undefined) {
    throw new Error("useUser must be used within ScreenContext");
  }

  return context;
}
