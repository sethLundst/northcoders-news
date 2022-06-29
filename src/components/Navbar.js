import "../styles/Navbar.css";
import { Link } from "react-router-dom";
import {
  Dropdown,
  NewPost,
  Search,
  TopicDropdown,
  TopicDropdownButton,
  UserDropdown,
  UserDropdownButton,
} from ".";
import { Logo } from "../icons";

export default function Navbar() {
  return (
    <header>
      <div className="header-container">
        <Link to="/" className="header" onClick={() => {}}>
          <Logo className="logo" />
          <h1 className="title">Northcoders News</h1>
        </Link>
        <nav>
          <Dropdown icon={<TopicDropdownButton />}>
            <TopicDropdown />
          </Dropdown>

          <div className="nav-search">
            <Search />
          </div>
        </nav>

        <div className="flex-end">
          <NewPost />
          <Dropdown icon={<UserDropdownButton />}>
            <UserDropdown />
          </Dropdown>
        </div>
      </div>
    </header>
  );
}
