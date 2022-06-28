import "../styles/ArticleView.css";
import { cloneElement } from "react";

export default function ArticleView({ article, children }) {
  return (
    <div>
      <div className="center" id="center"></div>
      <div className="article-view-card" id="article-view-card">
        <div className="article-view-votes">
          {cloneElement(children, {
            id: article.article_id,
            votes: article.votes,
          })}
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
    </div>
  );
}
