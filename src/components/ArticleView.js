import "./ArticleView.css";
import { CommentList, DeleteModal, Error, ExpandButton, VoteButtons } from ".";
import { patchArticle } from "../api";
import { UserContext } from "../contexts/UserContext";
import { useFetchArticle } from "../hooks";
import { useContext, useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import {
  ArrowUpIcon,
  ArrowDownIcon,
  ChatIcon,
  ThumbDownIcon,
  ThumbUpIcon,
  TrashIcon,
} from "../icons";
import { handleVote } from "../utils";

export default function ArticleView({
  articles,
  setArticles,
  articlesUpvoted,
  articlesDownvoted,
  setArticlesUpvoted,
  setArticlesDownvoted,
}) {
  const { article_id } = useParams();
  const voteParams = [
    articlesUpvoted,
    articlesDownvoted,
    setArticlesUpvoted,
    setArticlesDownvoted,
    articles,
    setArticles,
    patchArticle,
  ];
  const { article, setArticle, error, setError, isLoading } =
    useFetchArticle(article_id);
  const user = useContext(UserContext);
  const [open, setOpen] = useState(true);
  const [showModal, setShowModal] = useState({ bool: false, type: null });

  if (error) return <Error message={error.err.response}></Error>;
  if (isLoading) return <></>;
  return (
    <div>
      <div className="article-view-card">
        <div className="article-view-votes">
          <button
            onClick={(event) => {
              handleVote(event, article.article_id, ...voteParams, true);
            }}
          >
            <ArrowUpIcon
              className={`article-vote upvote${
                articlesUpvoted.includes(article.article_id) ? "-clicked" : ""
              }`}
            />
          </button>

          <p className="article-vote-count">{article.votes}</p>
          <button
            onClick={(event) => {
              handleVote(event, article.article_id, ...article);
            }}
          >
            <ArrowDownIcon
              className={`article-vote downvote${
                articlesDownvoted.includes(article.article_id) ? "-clicked" : ""
              }`}
            />
          </button>
        </div>

        <div className="article-details-container">
          <h3>
            nc/{article.topic} ·
            <span className="article-details">
              {" "}
              posted by{" "}
              <span className="article-author">{article.author} </span>
              {`on ${article.created_at.substring(
                0,
                article.created_at.indexOf("T")
              )}`}
            </span>
          </h3>
        </div>
        <h2 className="article-title">{article.title}</h2>
      </div>
      <ExpandButton id={article.article_id} />
    </div>
  );
}
