import "./ArticleView.css";
import { Error } from ".";
import { patchArticle } from "../api";
import { UserContext } from "../contexts/UserContext";
import { useFetchArticle } from "../hooks";
import { useContext, useState } from "react";
import { useParams } from "react-router-dom";
import { ChatIcon, ThumbDownIcon, ThumbUpIcon, TrashIcon } from "../icons";

export default function ArticleView({
  articleDownVoteClicked,
  setArticleDownVoteClicked,
  articleUpVoteClicked,
  setArticleUpVoteClicked,
  commentDownVoteClicked,
  setCommentDownVoteClicked,
  commentUpVoteClicked,
  setCommentUpVoteClicked,
}) {
  const { article_id } = useParams();
  const { article, setArticle, error, setError, isLoading } =
    useFetchArticle(article_id);
  const user = useContext(UserContext);
  const [open, setOpen] = useState(true);
  const [showModal, setShowModal] = useState({ bool: false, type: null });

  function handleClick(type) {
    if (type === "upVote") {
      if (!articleUpVoteClicked && !articleDownVoteClicked) {
        setArticleUpVoteClicked(true);
        handleArticleVote(1);
      } else if (articleUpVoteClicked && !articleDownVoteClicked) {
        setArticleUpVoteClicked(false);
        handleArticleVote(-1);
      }
    } else {
      if (!articleUpVoteClicked && !articleDownVoteClicked) {
        setArticleDownVoteClicked(true);
        handleArticleVote(-1);
      } else if (articleDownVoteClicked && !articleUpVoteClicked) {
        setArticleDownVoteClicked(false);
        handleArticleVote(1);
      }
    }
  }

  async function handleArticleVote(vote) {
    setArticle({ ...article, votes: article.votes + vote });
    try {
      await patchArticle(article_id, vote);
    } catch (err) {
      setError({ err });
    }
  }

  if (error) return <Error message={error.err.response}></Error>;
  if (isLoading) return <></>;
  return (
    <div className="article-view">
      <div className="background">
        <h4 className="posted-by">
          {`${article.topic} · Posted by ${article.author} on
            ${article.created_at.substring(
              0,
              article.created_at.indexOf("T")
            )}`}{" "}
        </h4>
        <div className="view-title">{article.title} </div>
        <p className="view-body">{article.body}</p>
        <div className="button-container">
          <ChatIcon
            className="comment-view-button"
            onClick={() => {
              document
                .getElementById("comments")
                .scrollIntoView({ behavior: "smooth" });
            }}
          ></ChatIcon>
          {article.comment_count} Comments
          <ThumbUpIcon
            className={`upvote ${articleUpVoteClicked ? "upvote-clicked" : ""}`}
            onClick={() => handleClick("upVote")}
          />
          <ThumbDownIcon
            className={`downvote ${
              articleDownVoteClicked ? "downvote-clicked" : ""
            }`}
            onClick={handleClick}
          />
          {article.votes} Votes
          {article.author === user ? (
            <button
              onClick={() => {
                setOpen(true);
                setShowModal({ bool: true, type: "article" });
              }}
            >
              <TrashIcon className="article-trash-icon" />
              {article.author === user ? "Delete" : ""}
            </button>
          ) : null}
        </div>
        {/* <CommentList
          article={article}
          setArticle={setArticle}
          commentDownVoteClicked={commentDownVoteClicked}
          setCommentDownVoteClicked={setCommentDownVoteClicked}
          commentUpVoteClicked={commentUpVoteClicked}
          setCommentUpVoteClicked={setCommentUpVoteClicked}
        />
        <DeleteModal
          showModal={showModal}
          setShowModal={setShowModal}
          error={error}
          setError={setError}
          open={open}
          setOpen={setOpen}
        /> */}
      </div>
    </div>
  );
}
