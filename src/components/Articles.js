import "../styles/Articles.css";
import { cloneElement } from "react";
import { Link } from "react-router-dom";
import { Collapsible } from "./index";

function Articles({ articles, children }) {
  return (
    <>
      <div className="arts-list">
        {articles.map((article) => (
          <Link to={`/${article.article_id}`} key={article.article_id}>
            <div className="arts-card">
              <div className="arts-votes">
                {cloneElement(children, {
                  id: article.article_id,
                  votes: article.votes,
                })}
              </div>

              <Collapsible id={article.article_id}>
                <div className="arts-link">
                  <div>
                    <h2 className="arts-title">{article.title}</h2>
                    <h3>
                      nc/{article.topic} ·
                      <span className="arts-details">
                        {" "}
                        posted by{" "}
                        <span className="arts-author">{article.author} </span>
                        {`on ${article.created_at.substring(
                          0,
                          article.created_at.indexOf("T")
                        )}`}
                      </span>
                    </h3>
                  </div>
                </div>
              </Collapsible>
            </div>
          </Link>
        ))}
      </div>
    </>
  );
}

export default Articles;
