import "../styles/CommentForm.css";
import { useState } from "react";
import { useParams } from "react-router-dom";
import { postComment } from "../api";
import { useScreen, useUser } from "../contexts";
import { XIcon } from "../icons";
import { handleKeyPress } from "../utils";

export default function CommentForm({
  article,
  setArticle,
  setParams,
  status,
  setStatus,
}) {
  const { article_id } = useParams();
  const { user } = useUser();
  const { isGreaterThan992px } = useScreen();
  const [open, setOpen] = useState(false);
  const [invalid, setInvalid] = useState(false);
  const [newComment, setNewComment] = useState("");

  function handleCommentChange(event) {
    setNewComment(event.target.value);
    setInvalid(false);
  }

  function handleFocus() {
    if (!isGreaterThan992px) {
      setOpen(true);
    }
  }

  async function handleCommentSubmit(event) {
    event.preventDefault();
    if (newComment) {
      setStatus("Submitting...");
      await postComment(article_id, newComment, user);
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

  return (
    <form id="form" className="form" onSubmit={handleCommentSubmit}>
      {isGreaterThan992px && (
        <p>
          Comment as{" "}
          <span style={{ color: "var(--switch-blue)" }}>anonymous</span>
        </p>
      )}
      <textarea
        id="textarea"
        className={`comment-box2${open ? "-mobile" : ""} ${
          !newComment && invalid ? "invalid" : ""
        }`}
        placeholder="What are your thoughts?"
        maxLength="10000"
        onKeyDown={(event) => {
          handleKeyPress(event, handleCommentSubmit);
        }}
        onFocus={handleFocus}
        value={newComment}
        onChange={handleCommentChange}
        disabled={status !== "Submit" ? "disabled" : ""}
        rows="4"
        cols="50"
      />
      {open && (
        <div className="comment-box-buttons">
          <button
            className="cancel-button"
            onClick={() => {
              setOpen(false);
            }}
          >
            <XIcon className="cancel-icon" />
          </button>
          <button
            className={`mob-comment-btn  ${
              newComment === "" ? "empty" : "unempty"
            }`}
          >
            ADD COMMENT
          </button>
        </div>
      )}
      {isGreaterThan992px ? (
        <>
          <div className="comment-box-buttons">
            <div className="btn-container">
              <button
                style={{ backgroundColor: "var(--green)" }}
                className={`comment-submit ${newComment === "" ? "empty" : ""}`}
              >
                Comment
              </button>
            </div>
          </div>
        </>
      ) : (
        <></>
      )}
    </form>
  );
}
