import "./Articles.css";
import { Link, useNavigate } from "react-router-dom";
import {
  ExpandButton,
  Loading,
  Pagination,
  Tabs,
  VoteButtons,
} from "../components";
import { useFetchArticles } from "../hooks";
import { ParamsContext } from "../contexts/ParamsContext";
import { useContext } from "react";

function Articles() {
  const navigate = useNavigate();
  const { params } = useContext(ParamsContext);
  const { articles, setArticles, error, isLoading } = useFetchArticles(params);

  if (error) navigate("/error", { state: error.data });
  if (isLoading) return <Loading />;

  return (
    <>
      {/* <Tabs
        filter={filter}
        params={params}
        setParams={setParams}
        setFilter={setFilter}
      /> */}
      <div className="article-list">
        {articles.map((article) => (
          <Link to={`/articles/${article.article_id}`} key={article.article_id}>
            <div className="article-card">
              <div className="article-votes">
                <VoteButtons
                  item={{ id: article.article_id, votes: article.votes }}
                  data={articles}
                  setData={setArticles}
                />
              </div>
              <div className="collapsible">
                <ExpandButton id={article.article_id}>
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
                </ExpandButton>
              </div>
            </div>
          </Link>
        ))}
      </div>
      <Pagination articles={articles} />
    </>
  );
}

export default Articles;
