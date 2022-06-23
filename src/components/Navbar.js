import "./Navbar.css";
import { Link } from "react-router-dom";
import {
  Dropdown,
  Search,
  TopicDropdown,
  TopicDropdownButton,
  UserDropdown,
  UserDropdownButton,
} from ".";
import { Logo } from "../icons";

export default function Navbar({ params, setParams, selected, setSelected }) {
  return (
    <header>
      <div className="header-container">
        <Link to="/" className="header">
          <Logo className="logo" />
          <h1>Northcoders News</h1>
        </Link>

        <nav>
          <Dropdown icon={<TopicDropdownButton selected={selected} />}>
            <TopicDropdown
              params={params}
              setParams={setParams}
              selected={selected}
              setSelected={setSelected}
            />
          </Dropdown>

          <Search />

          <button className="new-article">Post Article</button>

          <Dropdown icon={<UserDropdownButton />}>
            <UserDropdown />
          </Dropdown>
        </nav>
      </div>
    </header>
  );
}