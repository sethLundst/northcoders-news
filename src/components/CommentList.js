import "../styles/CommentList.css";
import { DeleteButton } from ".";
import { useUser } from "../contexts";
import { UserIcon } from "../icons";
import { cloneElement } from "react";

export default function CommentList({
  article,
  setArticle,
  comments,
  setComments,
  setParams,
  children,
}) {
  const { user } = useUser();

  return (
    <div>
      <div className="comment-list">
        {comments.map((comment) => (
          <div className="comment-card" key={comment.comment_id}>
            <div className="left-container">
              <div>
                <UserIcon className="comment-user-icon" />
              </div>

              <button className="thread-button">
                <div className="thread"></div>
              </button>
            </div>

            <div className="right-container">
              <h2>
                {comment.author} ·{" "}
                <span className="comment-details">
                  {`on ${comment.created_at.substring(
                    0,
                    comment.created_at.indexOf("T")
                  )}`}
                </span>
              </h2>

              <div className="comment-body">
                <p className="comment-body">{comment.body} ·</p>
                <div className="comment-buttons">
                  {cloneElement(children, {
                    id: comment.comment_id,
                    votes: comment.votes,
                  })}
                  {comment.author === user ? (
                    <DeleteButton
                      article={article}
                      setArticle={setArticle}
                      item={{ comment: comment }}
                      comments={comments}
                      setComments={setComments}
                      setParams={setParams}
                    />
                  ) : (
                    ""
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
