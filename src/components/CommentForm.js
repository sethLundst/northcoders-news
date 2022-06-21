import "../css/CommentForm.css";
import { Error } from ".";
import { postComment } from "../api";
import { UserContext } from "../contexts/UserContext";
import { handleKeyPress } from "../utils";
import { useContext, useState } from "react";
import { useParams } from "react-router-dom";

export default function CommentForm({
  article,
  setArticle,
  setParams,
  status,
  setStatus,
}) {
  const { article_id } = useParams();
  const user = useContext(UserContext);
  const [error, setError] = useState(null);
  const [invalid, setInvalid] = useState(false);
  const [newComment, setNewComment] = useState();

  function handleCommentChange(event) {
    setNewComment(event.target.value);
    setInvalid(false);
  }

  async function handleCommentSubmit(event) {
    event.preventDefault();
    if (newComment) {
      setStatus("Submitting...");
      try {
        await postComment(article_id, newComment, user);
      } catch (err) {
        setError({ err });
      }
      setStatus("Submitted");
      setArticle({
        ...article,
        comment_count: Number(article.comment_count) + 1,
      });
      setNewComment("");
      setParams({
        limit: 10,
        p: 1,
        clicked: "most recent",
      });
    } else setInvalid(true);
  }

  if (error) return <Error message={error.err.response}></Error>;
  return (
    <div className="container">
      <form id="form" className="form" onSubmit={handleCommentSubmit}>
        <textarea
          id="textarea"
          className={`comment-box ${!newComment && invalid ? "invalid" : ""}`}
          placeholder="What are your thoughts?"
          maxLength="10000"
          onKeyDown={(event) => {
            handleKeyPress(event, handleCommentSubmit);
          }}
          value={newComment}
          onChange={handleCommentChange}
          disabled={status !== "Submit" ? "disabled" : ""}
        />
        <div>
          <button type="button" className="button cancel-button">
            Cancel
          </button>
          <button onClick={handleCommentSubmit} className="button green">
            {status}
          </button>
        </div>
      </form>
    </div>
  );
}
