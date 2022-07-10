import "../styles/Navbar.css";
import { Link, useLocation } from "react-router-dom";
import {
  Dropdown,
  NewPost,
  Search,
  TopicDropdown,
  TopicDropdownButton,
  UserDropdown,
  UserDropdownButton,
  MobileNav,
} from ".";
import { Logo } from "../icons";
import { useScreen } from "../contexts";

export default function Navbar() {
  const { pathname } = useLocation();
  const { isGreaterThan992px } = useScreen();

  return (
    <header>
      <div className="header-container">
        <Link
          to="/"
          className="header"
          onClick={() => {
            if (pathname === "/") {
              window.location.reload();
            }
          }}
        >
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
          {isGreaterThan992px ? (
            <Dropdown icon={<UserDropdownButton />}>
              <UserDropdown />
            </Dropdown>
          ) : (
            <MobileNav />
          )}
        </div>
      </div>
    </header>
  );
}
