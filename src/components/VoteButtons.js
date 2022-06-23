import useVotes from "../contexts/VotesContext";
import { ArrowUpIcon, ArrowDownIcon } from "../icons";

export default function VoteButtons({ item, data, setData }) {
  const { state, handleUpvote, handleDownvote } = useVotes();
  const { article_id, votes } = item;

  return (
    <>
      <button
        id={article_id}
        onClick={(event) => {
          event.preventDefault();
          handleUpvote(article_id, data, setData);
        }}
      >
        <ArrowUpIcon
          id="upvote"
          className={`article-vote upvote${
            state.upvotes.includes(article_id) ? "-clicked" : ""
          }`}
        />
      </button>
      <p className="article-vote-count">{votes}</p>
      <button
        id={article_id}
        onClick={(event) => {
          event.preventDefault();
          handleDownvote(article_id, data, setData);
        }}
      >
        <ArrowDownIcon
          id="downvote"
          className={`article-vote downvote${
            state.downvotes.includes(article_id) ? "-clicked" : ""
          }`}
        />
      </button>
    </>
  );
}
