import "./ArticleView.css";
import {
  CommentList,
  DeleteModal,
  Error,
  Pagination,
  ExpandButton,
  VoteButtons,
  CommentForm,
} from ".";
import { UserContext } from "../contexts/UserContext";
import { ParamsContext } from "../contexts/ParamsContext";
import { useFetchArticle, useFetchArticles, useFetchComments } from "../hooks";
import { useContext, useState } from "react";
import { useLocation, useParams } from "react-router-dom";

export default function ArticleView() {
  const { article_id } = useParams();
  // const { params, setParams } = useContext(ParamsContext);
  const [params, setParams] = useState({
    limit: 10,
    p: 1,
  });
  const { article, setArticle, error, isLoading } = useFetchArticle(article_id);
  const [open, setOpen] = useState(true);
  const [showModal, setShowModal] = useState({ bool: false, type: null });
  const [status, setStatus] = useState("Submit");

  if (error) return <Error message={error.err.response}></Error>;
  if (isLoading) return <></>;

  return (
    <div>
      <div className="article-view-card">
        <div className="article-view-votes">
          <VoteButtons
            item={{ id: article.article_id, votes: article.votes }}
            data={article}
            setData={setArticle}
          />
        </div>
        <div className="article-view-details">
          <h5>
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
          </h5>
          <h4 className="article-view-title">{article.title}</h4>

          <p className="article-body">{article.body}</p>
        </div>
      </div>
      <CommentForm
        setParams={setParams}
        article={article}
        setArticle={setArticle}
        status={status}
        setStatus={setStatus}
      />
      <CommentList article={article} params={params} setParams={setParams} />
    </div>
  );
}
