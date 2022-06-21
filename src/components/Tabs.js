import "./Tabs.css";
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
  const categories = ["New", "Popular", "Most Comments"];

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
        class={`${
          active === props.name ? "active " : ""
        } tab-item font-bold py-2 px-4 rounded inline-flex items-center`}
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
    <div class="tabs card">
      <div class="inline-block relative w-fit">
        <select
          onChange={(event) => {
            handleSort(event.target.value);
          }}
          class="sort-select block appearance-none w-full h-full bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded-xl shadow leading-tight focus:outline-none focus:shadow-outline"
        >
          {categories.map((category, index) => (
            <option value={index}>{category}</option>
          ))}
        </select>
        <div class="sort-icon pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
          <svg
            class="fill-current h-4 w-4"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
          >
            <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
          </svg>
        </div>
      </div>
      <div className="tab-buttons flex">
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
