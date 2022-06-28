import "../styles/TopicDropdownButton.css";
import { cloneElement } from "react";
import { useParams } from "../contexts";
import { ChevronDown, Coding, Cooking, Football, Home } from "../icons";

export default function TopicDropdownButton({ open }) {
  const { selected } = useParams();

  const icons = {
    all: <Home />,
    coding: <Coding />,
    cooking: <Cooking />,
    football: <Football />,
  };
  return (
    <div className="topic-button-container">
      <button className={`topic-button ${open ? "open" : ""}`}>
        {selected === "All" ? (
          <Home className="home" />
        ) : (
          cloneElement(icons[selected.toLowerCase()], { className: "icon" })
        )}
        <div className="topic">{selected}</div>
        <ChevronDown className="topic-chevron" />
      </button>
    </div>
  );
}
