import "./TopicDropdownButton.css";
import { ChevronDown, Home } from "../icons";
import { Coding, Cooking, Football } from "../icons";
import { cloneElement } from "react";

export default function TopicDropdownButton({ open, selected }) {
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
