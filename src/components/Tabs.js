import "../styles/Tabs.css";
import { cloneElement, useRef, useState } from "react";
import { Dropdown, TopicDropdown, TopicDropdownButton, Search } from ".";
import { useOnClickOutside } from "../hooks";
import {
  ArrowUpIcon,
  ArrowDownIcon,
  BarChartIcon,
  ChevronDown,
  MessageIcon,
  StarIcon,
  SearchIcon,
} from "../icons";

export default function Tabs({ setFilter, params, setParams }) {
  const ref = useRef();
  const [active, setActive] = useState("New");
  const [isDesc, setIsDesc] = useState(true);
  const [open, setOpen] = useState(false);
  // const categories = ["New", "Popular", "Most Comments"];
  const icons = {
    new: <StarIcon />,
    popular: <BarChartIcon />,
    most_comments: <MessageIcon />,
  };

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

  useOnClickOutside(ref, () => {
    setOpen(false);
  });

  function TabButton(props) {
    return (
      <button
        className={`${active === props.name ? "active " : ""} tab-item `}
        onClick={() => {
          setOpen(false);
          handleSort(props);
        }}
      >
        <span className="tab-icon">{props.icon}</span>
        <span>{props.name}</span>
      </button>
    );
  }

  return (
    <>
      <div className="tabs">
        <div className="mobile-tabs" ref={ref}>
          <Dropdown icon={<TopicDropdownButton />}>
            <TopicDropdown />
          </Dropdown>
          <a
            className={`tb-drpd-btn ${open ? "open" : ""}`}
            onClick={() => {
              setOpen(!open);
            }}
            href="/"
          >
            {active === "New" ? (
              <StarIcon className="home" />
            ) : (
              cloneElement(icons[active.toLowerCase().replace(/\s/g, "_")], {
                className: "icon",
              })
            )}
            <div className="topic">{active}</div>
            <ChevronDown className="topic-chevron" />
            {open ? (
              <div className="tb-drpd">
                <div className="tb-drpd-menu">
                  <TabButton
                    name={"New"}
                    icon={<StarIcon />}
                    sort="created_at"
                  />
                  <TabButton
                    name={"Popular"}
                    icon={<BarChartIcon />}
                    sort="votes"
                  />
                  <TabButton
                    name={"Most Comments"}
                    icon={<MessageIcon />}
                    sort="comment_count"
                  />
                </div>
              </div>
            ) : (
              ""
            )}
          </a>
        </div>

        <div className="desktop-tabs">
          <div className="tab-buttons">
            <TabButton name={"New"} icon={<StarIcon />} sort="created_at" />
            <TabButton name={"Popular"} icon={<BarChartIcon />} sort="votes" />
            <TabButton
              name={"Most Comments"}
              icon={<MessageIcon />}
              sort="comment_count"
            />
          </div>

          <div className="tablet-tabs">
            <div className="tab-search">
              <div className="tab-search-icon">
                <SearchIcon className="tab-search-svg" />
              </div>
              <input
                type="search"
                className="tab-search-box"
                placeholder="Filter articles by user..."
                onChange={handleFilter}
              />
            </div>
            <TabButton
              name={isDesc ? "Descending" : "Ascending"}
              icon={isDesc ? <ArrowDownIcon /> : <ArrowUpIcon />}
              sort="order"
            />
          </div>
        </div>
      </div>
      <div className="mobile-search">
        <Search />
      </div>
    </>
  );
}
