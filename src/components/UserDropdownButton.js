import "./UserDropdownButton.css";
import { useContext } from "react";
import { UserContext } from "../contexts/UserContext";
import { ChevronDown, MenuIcon, RatingIcon, UserIcon, Home } from "../icons";
import { useFetchArticles } from "../hooks";

export default function UserDropdownButton({ open }) {
  const { articles, error, isLoading } = useFetchArticles({
    limit: 1000,
    p: 1,
  });
  const { username } = useContext(UserContext);

  function getVotes() {
    let total = 0;
    for (let i = 0; i < articles.length; i++) {
      if (articles.author === username) {
        total += articles.votes;
      }
      return total;
    }
  }

  return (
    <div className="user-button-container">
      <button className={`user-button ${open ? "bordered" : ""}`}>
        <div className="user-background">
          <UserIcon className="user" />
        </div>
        <div className="user-details">
          <div className="user-name">{username}</div>
          <div className="user-name2">
            <RatingIcon className="rating-icon" />
            {getVotes()} votes
          </div>
        </div>
        <ChevronDown className="user-chevron2" />
        <MenuIcon className="menu-icon" />
      </button>
    </div>
  );
}
