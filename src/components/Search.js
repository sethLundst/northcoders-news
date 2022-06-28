import "../styles/Search.css";
import { useRef, useState } from "react";
import { useFetchArticles, useOnClickOutside } from "../hooks";
import { SearchIcon } from "../icons";
import { Link, useNavigate } from "react-router-dom";

function Search() {
  const [isFocused, setIsFocused] = useState(false);
  const navigate = useNavigate();
  const ref = useRef();
  const { articles, error } = useFetchArticles({
    limit: 1000,
    p: 1,
  });
  const [filterText, setFilterText] = useState("");

  function toggleFocus() {
    setIsFocused(!isFocused);
  }

  function handleChange(event) {
    setFilterText(event.target.value.toLowerCase());
  }

  const filteredArticles = articles.filter((article) => {
    let regex = new RegExp(filterText, "i");
    let keys = ["title", "author", "topic"];

    for (let key in article) {
      if (keys.includes(key)) {
        return (
          regex.test(
            article[key].replace(/[^\w\s']|_/g, "").replace(/\s+/g, " ")
          ) || regex.test(article[key])
        );
      }
    }
    return false;
  });

  const articlesToDisplay = filteredArticles ? filteredArticles : articles;

  useOnClickOutside(ref, () => {
    setIsFocused(false);
  });

  if (error) navigate("/error", { state: error.data });

  return (
    <div className="search">
      <div className="search-icon">
        <SearchIcon className="search-svg" />
      </div>
      <input
        type="search"
        className="search-box"
        placeholder="Search Northcoders News"
        onChange={handleChange}
        value={filterText}
        onFocus={toggleFocus}
      />
      {isFocused ? (
        <div className="search-dropdown" ref={ref}>
          {!filteredArticles.length && (
            <div className="search-empty"> No matches found... </div>
          )}
          {articlesToDisplay.map((article) => (
            <Link
              to={`/articles/${article.article_id}`}
              key={article.article_id}
              onClick={toggleFocus}
            >
              <div className="search-article-card">
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
            </Link>
          ))}
        </div>
      ) : (
        ""
      )}
    </div>
  );
}

export default Search;
