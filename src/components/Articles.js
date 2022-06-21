import "./Articles.css";
import { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getArticle, patchArticle } from "../api";
import { ExpandButton, Pagination, Tabs } from "../components";
import { UserContext } from "../contexts/UserContext";
import { Loading } from "../components";
import { useFetchArticles } from "../hooks";
import { ArrowUpIcon, ArrowDownIcon } from "../icons";
import { handleVote } from "../utils";
import useFetchVotes from "../hooks/useFetchVotes";

function Articles({ filter, setFilter, params, setParams, selected }) {
  const { username } = useContext(UserContext);
  const { articles, setArticles, error, isLoading } = useFetchArticles(params);
  // const { votes, setVotes } = useFetchVotes(username);
  const navigate = useNavigate();

  // useEffect(() => {
  //   const articlesUpvoted = localStorage.getItem("articlesUpvoted");
  //   const articlesDownvoted = localStorage.getItem("articlesDownvoted");
  //   if (articlesUpvoted) {
  //     setArticlesUpvoted(JSON.parse(articlesUpvoted));
  //   }
  //   if (articlesDownvoted) {
  //     setArticlesDownvoted(JSON.parse(articlesDownvoted));
  //   }
  // }, [setArticlesUpvoted, setArticlesDownvoted]);

  // useEffect(() => {
  //   localStorage.setItem("articlesUpvoted", JSON.stringify(articlesUpvoted));
  //   localStorage.setItem(
  //     "articlesDownvoted",
  //     JSON.stringify(articlesDownvoted)
  //   );
  // });

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
                <button
                  onClick={(event) => {
                    // handleVote(event, article.article_id, ...voteParams, true);
                  }}
                >
                  <ArrowUpIcon
                  // className={`article-vote upvote${
                  //   votes.includes(article.article_id) ? "-clicked" : ""
                  // }`}
                  />
                </button>

                <p className="article-vote-count">{article.votes}</p>
                <button
                  onClick={(event) => {
                    // handleVote(event, article.article_id, ...voteParams);
                  }}
                >
                  <ArrowDownIcon
                  // className={`article-vote downvote${
                  //   articlesDownvoted.includes(article.article_id)
                  //     ? "-clicked"
                  //     : ""
                  // }`}
                  />
                </button>
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
      <Pagination
        articles={articles}
        params={params}
        setParams={setParams}
        filter={filter}
      />
    </>
  );
}

export default Articles;
