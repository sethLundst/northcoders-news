import "../styles/Articles.css";
import { cloneElement } from "react";
import { Link } from "react-router-dom";
import { MessageIcon } from "../icons";
import { Collapsible } from "./index";
import { useScreen } from "../contexts";

function Articles({ articles, children }) {
  const { isGreaterThan992px } = useScreen();

  function ArticleLink({ article }) {
    return (
      <div className="arts-link ">
        <div>
          <h2 className="arts-title">{article.title}</h2>
          <h3>
            nc/{article.topic} ·
            <span className="arts-details">
              {" "}
              posted by <span className="arts-author">{article.author} </span>
              {`on ${article.created_at.substring(
                0,
                article.created_at.indexOf("T")
              )}`}
            </span>
          </h3>
          {!isGreaterThan992px && (
            <div className="arts-buttons">
              <div className="voting-box">
                {cloneElement(children, {
                  id: article.article_id,
                  votes: article.votes,
                })}
              </div>
              <div className="comment-box">
                <MessageIcon className="vote" />
                <p className="comment-count">{article.comment_count}</p>
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="arts-list">
        {articles.map((article) => (
          <Link to={`/${article.article_id}`} key={article.article_id}>
            <div className="arts-card">
              {isGreaterThan992px ? (
                <>
                  <div className="arts-votes">
                    {cloneElement(children, {
                      id: article.article_id,
                      votes: article.votes,
                    })}
                  </div>
                  <Collapsible id={article.article_id}>
                    <ArticleLink article={article} />
                  </Collapsible>
                </>
              ) : (
                <ArticleLink article={article} />
              )}
            </div>
          </Link>
        ))}
      </div>
    </>
  );
}

export default Articles;
