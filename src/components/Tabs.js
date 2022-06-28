import "../styles/Tabs.css";
import { useState } from "react";
import {
  ArrowUpIcon,
  ArrowDownIcon,
  BarChartIcon,
  MessageIcon,
  StarIcon,
} from "../icons";

export default function Tabs({ setFilter, params, setParams }) {
  const [active, setActive] = useState("New");
  const [isDesc, setIsDesc] = useState(true);
  // const categories = ["New", "Popular", "Most Comments"];

  function handleFilter(event) {
    setFilter(event.target.value);
    setParams({
      ...params,
      author: event.target.value,
      p: 1,
    });
  }

  function handleSort(props) {
    if (props.sort === "order") {
      setIsDesc(!isDesc);
      setParams({
        ...params,
        order: isDesc ? "ASC" : "DESC",
      });
    } else {
      setActive(props.name);
      setParams({
        ...params,
        sort_by: props.sort,
        p: 1,
      });
    }
  }

  function TabButton(props) {
    return (
      <button
        className={`${active === props.name ? "active " : ""} tab-item `}
        onClick={() => {
          handleSort(props);
        }}
      >
        <span className="tab-icon">{props.icon}</span>
        <span>{props.name}</span>
      </button>
    );
  }

  return (
    <div className="tabs">
      <div className="tab-buttons">
        <TabButton name={"New"} icon={<StarIcon />} sort="created_at" />
        <TabButton name={"Popular"} icon={<BarChartIcon />} sort="votes" />
        <TabButton
          name={"Most Comments"}
          icon={<MessageIcon />}
          sort="comment_count"
        />
      </div>
      <input
        className="tab-search"
        placeholder="Search articles by user..."
        onChange={handleFilter}
      ></input>
      <TabButton
        name={isDesc ? "Descending" : "Ascending"}
        icon={isDesc ? <ArrowDownIcon /> : <ArrowUpIcon />}
        sort="order"
      />
    </div>
  );
}
