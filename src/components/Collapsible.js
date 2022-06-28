import "../styles/Collapsible.css";
import { useState } from "react";
import { useFetchArticle } from "../hooks";
import { DocumentIcon, MaximiseIcon, MinimiseIcon } from "../icons";

function Collapsible({ children, id }) {
  const [isHovered, setIsHovered] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const { article } = useFetchArticle(id);

  return (
    <div className="collapsible">
      <div
        onMouseEnter={() => {
          setIsHovered(true);
        }}
        onMouseLeave={() => {
          setIsHovered(false);
        }}
      >
        <button
          className="clps-button"
          onClick={(event) => {
            event.preventDefault();
            setIsHovered(false);
            setIsCollapsed(!isCollapsed);
          }}
        >
          {!isHovered && !isCollapsed ? (
            <DocumentIcon className="clps-icon" />
          ) : isHovered && isCollapsed ? (
            <MinimiseIcon className="clps-icon" />
          ) : (
            <MaximiseIcon className="clps-icon" />
          )}
        </button>
      </div>
      <div>
        {children}
        {isCollapsed ? <p className="clps-preview">{article.body}</p> : ""}
      </div>
    </div>
  );
}

export default Collapsible;
