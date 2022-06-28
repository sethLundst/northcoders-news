import "../styles/UserDropdownButton.css";
import { Loading } from ".";
import { useUser } from "../contexts";
import { useFetchArticles } from "../hooks";
import { ChevronDown, RatingIcon, UserIcon } from "../icons";
import { useNavigate } from "react-router-dom";

export default function UserDropdownButton({ open }) {
  const navigate = useNavigate();
  const { user } = useUser();
  const { articles, error, isLoading } = useFetchArticles({
    limit: 1000,
    p: 1,
  });

  function getVotes() {
    let total = 0;
    for (let i = 0; i < articles.length; i++) {
      if (articles.author === user) {
        total += articles.votes;
      }
      return total;
    }
  }

  if (error) navigate("/error", { state: error.data });
  if (isLoading) return <Loading />;

  return (
    <div className="user-button-container">
      <button className={`user-button ${open ? "bordered" : ""}`}>
        <div className="user-background">
          <UserIcon className="user" />
        </div>
        <div className="user-details">
          <div className="user-name">{user}</div>
          <div className="user-name2">
            <RatingIcon className="rating-icon" />
            {getVotes()} votes
          </div>
        </div>
        <ChevronDown className="user-chevron2" />
      </button>
    </div>
  );
}
