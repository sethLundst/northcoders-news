import "../styles/ArticleView.css";
import { cloneElement } from "react";
import { useScreen, useUser } from "../contexts";
import { DeleteButton } from ".";

export default function ArticleView({ article, setParams, children }) {
  document.getElementsByClassName("App")[0].style.backgroundColor =
    "var(--mob-article-bg)";

  const { isGreaterThan992px } = useScreen();
  const { user } = useUser();
  return (
    <div>
      <div className="mob-article-background"> </div>
      <div className="article-view-card" id="article-view-card">
        {isGreaterThan992px && (
          <div className="art-view-votes">
            {cloneElement(children, {
              id: article.article_id,
              votes: article.votes,
            })}
          </div>
        )}

        <div className="article-view-details">
          <h5>
            nc/{article.topic} ·
            <span className="article-details"> posted by </span>
            <span className="article-author">{article.author} </span>
            <span className="article-details">
              {`on ${article.created_at.substring(
                0,
                article.created_at.indexOf("T")
              )}`}
            </span>
            <div className="article-delete">
              <div className="article-delete-button">
                {article.author === user && (
                  <DeleteButton
                    item={{ article: article }}
                    setParams={setParams}
                  />
                )}
              </div>
            </div>
          </h5>
          <h4 className="article-view-title">{article.title}</h4>
          <p className="article-body">{article.body}</p>
        </div>
      </div>
    </div>
  );
}
