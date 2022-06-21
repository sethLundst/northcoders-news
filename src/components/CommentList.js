import "../css/CommentList.css";
import { Error, SortTabs, Pagination, CommentForm } from ".";
import { patchComment } from "../api";
import { UserContext } from "../contexts/UserContext";
import { useFetchComments } from "../hooks";
import { useParams } from "react-router-dom";
import { useContext, useState } from "react";
import { ThumbUpIcon, ThumbDownIcon, TrashIcon } from "../icons";

export default function CommentList({
  article,
  setArticle,
  commentDownVoteClicked,
  setCommentDownVoteClicked,
  commentUpVoteClicked,
  setCommentUpVoteClicked,
}) {
  const { article_id } = useParams();
  const categories = ["Most Recent", "Oldest", "Most Votes", "Fewest Votes"];
  const user = useContext(UserContext);
  const [params, setParams] = useState({
    limit: 10,
    p: 1,
  });
  const [open, setOpen] = useState(true);
  const [showModal, setShowModal] = useState({ bool: false, type: null });
  const [status, setStatus] = useState("Submit");
  const { comments, setComments, error, setError, isLoading } =
    useFetchComments(article_id, params);

  function handleClick(id, type) {
    if (type === "upVote") {
      if (!commentUpVoteClicked.bool && !commentDownVoteClicked.bool) {
        setCommentUpVoteClicked({
          bool: true,
          id: id,
        });
        handleCommentVote(id, 1);
      } else if (commentUpVoteClicked.bool && !commentDownVoteClicked.bool) {
        setCommentUpVoteClicked({
          bool: false,
          id: "",
        });
        handleCommentVote(id, -1);
      }
    } else if (type === "downVote") {
      if (!commentUpVoteClicked.bool && !commentDownVoteClicked.bool) {
        setCommentDownVoteClicked({
          bool: true,
          id: id,
        });
        handleCommentVote(id, -1);
      } else if (commentDownVoteClicked.bool && !commentUpVoteClicked.bool) {
        setCommentDownVoteClicked({
          bool: false,
          id: "",
        });
        handleCommentVote(id, 1);
      }
    }
  }

  async function handleCommentVote(id, vote) {
    setComments(
      comments.map((comment) =>
        comment.comment_id === id
          ? { ...comment, votes: comment.votes + vote }
          : comment
      )
    );
    try {
      await patchComment(id, vote);
    } catch (err) {
      setError({ err });
    }
  }

  if (error) return <Error message={error.err.response}></Error>;
  if (isLoading) return <></>;
  return (
    <div className="comment-list-container">
      <CommentForm
        setParams={setParams}
        article={article}
        setArticle={setArticle}
        status={status}
        setStatus={setStatus}
      />
      <SortTabs categories={categories} params={params} setParams={setParams} />
      <div className="comments-container">
        <div className="comments-card">
          {comments.forEach((comment) => console.log(comment.comment_id))}
          {comments.map((comment) => (
            <div className="comment-container" key={comment.comment_id}>
              <div className="comment-author">
                {comment.author} ·{" "}
                <h4 className="comment-date">{comment.created_at}</h4>
              </div>
              <div className="comment-body">{comment.body}</div>
              <div className="comment-buttons-container">
                <button
                  id={`${comment.comment_id}UV`}
                  aria-label="Up-vote button"
                  disabled={
                    commentDownVoteClicked.id === comment.comment_id
                      ? "disabled"
                      : ""
                  }
                  className={`comment-upvote ${
                    commentUpVoteClicked.id === comment.comment_id
                      ? "comment-upvote-clicked"
                      : ""
                  }`}
                  onClick={() => handleClick(comment.comment_id, "upVote")}
                >
                  <ThumbUpIcon />
                </button>
                <button
                  id={`${comment.comment_id}DV`}
                  aria-label="Down-vote button"
                  disabled={
                    commentUpVoteClicked.id === comment.comment_id
                      ? "disabled"
                      : ""
                  }
                  className={`comment-downvote ${
                    commentDownVoteClicked.id === comment.comment_id
                      ? "comment-downvote-clicked"
                      : ""
                  }`}
                  onClick={() => handleClick(comment.comment_id, "downVote")}
                >
                  <ThumbDownIcon id={comment.comment_id} aria-hidden="true" />
                </button>
                <button className="comment-votes">
                  {comment.votes} {comment.votes === 1 ? "vote" : "votes"}
                </button>
                {comment.author === user ? (
                  <button
                    aria-label="Delete comment button"
                    className="comment-trash-icon"
                    onClick={() => {
                      setOpen(true);
                      setShowModal({ bool: true, type: comment.comment_id });
                    }}
                  >
                    <TrashIcon />
                  </button>
                ) : null}
              </div>
            </div>
          ))}
        </div>
        {/* <DeleteModal
          showModal={showModal}
          setShowModal={setShowModal}
          open={open}
          setOpen={setOpen}
          article={article}
          setArticle={setArticle}
          setError={setError}
          setParams={setParams}
          status={status}
          setStatus={setStatus}
        ></DeleteModal> */}
        <Pagination
          comments={comments}
          filter={{ comment: article.comment_count }}
          params={params}
          setParams={setParams}
        />
      </div>
    </div>
  );
}
