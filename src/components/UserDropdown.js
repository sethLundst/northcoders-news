import "../styles/UserDropdown.css";
import { Switch } from ".";
import { Settings } from "../icons";
import { useTheme } from "../contexts/ThemeContext";

export default function UserDropdown() {
  const { dark, setDark } = useTheme();

  const toggleDark = () => setDark(!dark);

  return (
    <div className="user-dropdown">
      <div className="user-menu">
        {/* <li className="user-menu-category">
          <UserIcon className="user-menu-icon" />
          Profile
        </li> */}
        {/* <div className="divider"></div> */}
        <li className="user-menu-category">
          <Settings className="user-menu-icon" />
          Settings
        </li>
        <button className="user-menu-option" onClick={toggleDark}>
          Dark Mode
          <Switch state={dark} setState={setDark} />
        </button>
      </div>
    </div>
  );
}
