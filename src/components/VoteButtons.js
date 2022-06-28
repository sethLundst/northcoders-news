import { useVotes } from "../contexts";
import { ArrowUpIcon, ArrowDownIcon } from "../icons";

export default function VoteButtons({ id, votes, data, setData, type }) {
  const { state, handleVote } = useVotes();
  const { articleVotes, commentVotes } = state;

  const { upvotes, downvotes } =
    type === "articles" ? articleVotes : commentVotes;

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
          className={`article-vote upvote${
            upvotes.includes(id) ? "-clicked" : ""
          }`}
        />
      </button>
      <p className="article-vote-count">{votes}</p>
      <button
        id={id}
        onClick={(event) => {
          event.preventDefault();
          handleVote(false, id, data, setData, type);
        }}
      >
        <ArrowDownIcon
          id="downvote"
          className={`article-vote downvote${
            downvotes.includes(id) ? "-clicked" : ""
          }`}
        />
      </button>
    </>
  );
}
