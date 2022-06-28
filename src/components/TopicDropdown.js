import "../styles/TopicDropdown.css";
import { cloneElement } from "react";
import { useNavigate } from "react-router-dom";
import { useParams } from "../contexts";
import { useFetchTopics } from "../hooks";
import { Coding, Cooking, Football, Home } from "../icons";

export default function TopicDropdown({ setOpen }) {
  const navigate = useNavigate();
  const { params, setParams, selected, setSelected } = useParams();
  const { topics, error, isLoading } = useFetchTopics();

  function handleClick(topic) {
    setSelected(topic);
    setParams({ ...params, topic: topic === "All" ? "" : topic.toLowerCase() });
    setOpen(false);
  }

  const icons = {
    coding: <Coding />,
    cooking: <Cooking />,
    football: <Football />,
  };

  if (error) navigate("/error", { state: error.data });
  if (isLoading) return <></>;

  return (
    <div className="topic-dropdown">
      <div className="topic-menu">
        <li
          className={`topic-menu-option ${
            selected === "All" ? "selected" : ""
          }`}
          key="all"
          onClick={() => {
            handleClick("All");
          }}
        >
          <Home className="topic-icon" />
          All
        </li>
        {topics
          .sort((a, b) => (a.slug < b.slug ? -1 : 1))
          .map((topic) => {
            const topicName =
              topic.slug.charAt(0).toUpperCase() + topic.slug.slice(1);
            return (
              <li
                className={`topic-menu-option ${
                  selected === topicName ? "selected" : ""
                }`}
                key={topic.slug}
                onClick={() => {
                  handleClick(topicName);
                }}
              >
                {cloneElement(icons[topic.slug], { className: "topic-icon" })}
                {topicName}
              </li>
            );
          })}
      </div>
    </div>
  );
}
