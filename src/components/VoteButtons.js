import "../styles/VoteButtons.css";
import { useVotes } from "../contexts";
import { ArrowUpIcon, ArrowDownIcon } from "../icons";

export default function VoteButtons({ id, votes, data, setData, type }) {
  const { state, handleVote } = useVotes();
  const { articleVotes, commentVotes } = state;
  console.log(type);
  return (
    <>
      <button
        id={id}
        onClick={(event) => {
          event.preventDefault();
          handleVote(true, id, data, setData, type);
        }}
      >
        <ArrowUpIcon
          id="upvote"
          className={`vote upvote${
            type === "article"
              ? articleVotes.upvotes.includes(id)
                ? "-clicked"
                : ""
              : commentVotes.upvotes.includes(id)
              ? "-clicked"
              : ""
          }`}
        />
      </button>
      <div className="vote-count">{votes ? votes : "Vote"}</div>
      <button
        id={id}
        onClick={(event) => {
          event.preventDefault();
          handleVote(false, id, data, setData, type);
        }}
      >
        <ArrowDownIcon
          id="downvote"
          className={`vote downvote${
            type === "article"
              ? articleVotes.downvotes.includes(id)
                ? "-clicked"
                : ""
              : commentVotes.downvotes.includes(id)
              ? "-clicked"
              : ""
          }`}
        />
      </button>
    </>
  );
}
