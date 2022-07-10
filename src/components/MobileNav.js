import "../styles/MobileNav.css";
import { MenuIcon, SunIcon, MoonIcon, XIcon } from "../icons";
import { useState } from "react";
import { Switch } from ".";
import { useTheme } from "../contexts";

function MobileNav() {
  const [open, setOpen] = useState(false);
  const { dark, setDark } = useTheme();

  const toggleDark = () => setDark(!dark);

  return (
    <div className="mobile-nav-container">
      {open ? (
        <XIcon
          className="menu-icon"
          style={{ color: "var(--text-gray)" }}
          onClick={() => {
            setOpen(false);
          }}
        />
      ) : (
        <MenuIcon
          className="menu-icon"
          onClick={() => {
            setOpen(true);
          }}
        />
      )}
      {open && (
        <div className="mobile-nav">
          {/* <input
            type="search"
            className="mob-search"
            placeholder="Search Northcoders News..."
          /> */}
          <button className="mob-menu-option" onClick={toggleDark}>
            {dark ? (
              <MoonIcon className="mob-menu-icon" />
            ) : (
              <SunIcon className="mob-menu-icon" />
            )}
            Dark Mode
            <Switch state={dark} setState={setDark} />
          </button>
        </div>
      )}
    </div>
  );
}

export default MobileNav;
