import "./Articles.css";
import { cloneElement } from "react";
import { Link } from "react-router-dom";
import { Collapsible } from "../components";

function Articles({ articles, children }) {
  return (
    <>
      <div className="article-list">
        {articles.map((article) => (
          <Link to={`/${article.article_id}`} key={article.article_id}>
            <div className="article-card">
              <div className="article-votes">
                {cloneElement(children, {
                  id: article.article_id,
                  votes: article.votes,
                })}
              </div>
              <div className="collapsible">
                <Collapsible id={article.article_id}>
                  <div className="article-link">
                    <div>
                      <h2 className="article-title">{article.title}</h2>
                      <div className="article-details-container">
                        <h3>
                          nc/{article.topic} ·
                          <span className="article-details">
                            {" "}
                            posted by{" "}
                            <span className="article-author">
                              {article.author}{" "}
                            </span>
                            {`on ${article.created_at.substring(
                              0,
                              article.created_at.indexOf("T")
                            )}`}
                          </span>
                        </h3>
                      </div>
                    </div>
                  </div>
                </Collapsible>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </>
  );
}

export default Articles;
