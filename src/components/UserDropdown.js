import "./UserDropdown.css";
import { Switch } from ".";
import { useTheme } from "../hooks";
import { Settings, UserIcon } from "../icons";

export default function UserDropdown() {
  const { dark, setDark } = useTheme();

  return (
    <div className="user-dropdown">
      <div className="user-menu">
        <li className="user-menu-category">
          <UserIcon className="user-menu-icon" />
          Profile
        </li>
        <div className="divider"></div>
        <li className="user-menu-category">
          <Settings className="user-menu-icon" />
          Settings
        </li>
        <button
          className="user-menu-option"
          onClick={() => {
            setDark(!dark);
          }}
        >
          Dark Mode
          <Switch state={dark} setState={setDark} />
        </button>
      </div>
    </div>
  );
}
