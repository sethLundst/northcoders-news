import { useState } from "react";
import { useFetchArticle } from "../hooks";
import { DocumentIcon, MaximiseIcon, MinimiseIcon } from "../icons";

function Collapsible({ children, id }) {
  const [isHovered, setIsHovered] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const { article } = useFetchArticle(id);

  return (
    <>
      <div
        onMouseEnter={() => {
          setIsHovered(true);
        }}
        onMouseLeave={() => {
          setIsHovered(false);
        }}
      >
        <button
          className="article-button"
          onClick={(event) => {
            event.preventDefault();
            setIsHovered(false);
            setIsCollapsed(!isCollapsed);
          }}
        >
          {!isHovered && !isCollapsed ? (
            <DocumentIcon className="article-icon" />
          ) : isHovered && isCollapsed ? (
            <MinimiseIcon className="article-icon" />
          ) : (
            <MaximiseIcon className="article-icon" />
          )}
        </button>
      </div>
      <div>
        {children}
        {isCollapsed ? <p className="article-preview">{article.body}</p> : ""}
      </div>
    </>
  );
}

export default Collapsible;
