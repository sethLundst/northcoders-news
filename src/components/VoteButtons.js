import useVotes from "../contexts/VotesContext";
import { ArrowUpIcon, ArrowDownIcon } from "../icons";

export default function VoteButtons({ item, data, setData }) {
  const { state, handleUpvote, handleDownvote } = useVotes();
  const { id, votes } = item;

  return (
    <>
      <button
        id={id}
        onClick={(event) => {
          event.preventDefault();
          handleUpvote(id, data, setData);
        }}
      >
        <ArrowUpIcon
          id="upvote"
          className={`article-vote upvote${
            state.upvotes.includes(id) ? "-clicked" : ""
          }`}
        />
      </button>
      <p className="article-vote-count">{votes}</p>
      <button
        id={id}
        onClick={(event) => {
          event.preventDefault();
          handleDownvote(id, data, setData);
        }}
      >
        <ArrowDownIcon
          id="downvote"
          className={`article-vote downvote${
            state.downvotes.includes(id) ? "-clicked" : ""
          }`}
        />
      </button>
    </>
  );
}
