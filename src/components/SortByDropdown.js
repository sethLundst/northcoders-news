import "../styles/SortByDropdown.css";
import { cloneElement, useState } from "react";
import { Dropdown } from ".";
import {
  BarChartIcon,
  ChevronDown,
  ClockIcon,
  StarIcon,
  ThumbDownIcon,
} from "../icons";

function SortByDropdown2({
  params,
  setParams,
  setOpen,
  selected,
  setSelected,
}) {
  const categories = ["Most Recent", "Oldest", "Most Votes", "Fewest Votes"];

  const icons = {
    "Most Recent": <StarIcon />,
    Oldest: <ClockIcon />,
    "Most Votes": <BarChartIcon />,
    "Fewest Votes": <ThumbDownIcon />,
  };

  function handleClick(category, index) {
    setOpen(false);
    setSelected(category);
    setParams({
      ...params,
      sort_by: index < 2 ? "created_at" : index < 4 ? "votes" : "comment_count",
      order: index % 2 === 0 ? "DESC" : "ASC",
      p: 1,
    });
  }

  return (
    <div className="sort-by-dropdown">
      <div className="topic-menu">
        {categories.map((category, index) => {
          return (
            <li
              className={`topic-menu-option ${
                selected === category ? "selected" : ""
              }`}
              value={index}
              key={category}
              onClick={(event) => {
                handleClick(category, event.target.value);
              }}
            >
              {cloneElement(icons[category], { className: "topic-icon" })}
              {category}
            </li>
          );
        })}
      </div>
    </div>
  );
}

function SortByDropdown({ params, setParams }) {
  const [selected, setSelected] = useState("Most Recent");
  const icons = {
    "Most Recent": <StarIcon />,
    Oldest: <ClockIcon />,
    "Most Votes": <BarChartIcon />,
    "Fewest Votes": <ThumbDownIcon />,
  };
  return (
    <div className="sort-by-button-container">
      <Dropdown
        icon={
          <button className="sort-by-button">
            {cloneElement(icons[selected], { className: "topic-icon" })}
            <div className="sort-by">Sort By: {selected}</div>
            <ChevronDown className="sort-by-chevron" />
          </button>
        }
      >
        <SortByDropdown2
          params={params}
          setParams={setParams}
          selected={selected}
          setSelected={setSelected}
        />
      </Dropdown>
    </div>
  );
}

export default SortByDropdown;
