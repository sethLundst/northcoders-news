import "./SortTabs.css";

export default function SortTabs({ params, setParams }) {
  const categories = ["Most Recent", "Oldest", "Most Votes", "Fewest Votes"];
  function handleSort(index) {
    setParams({
      ...params,
      sort_by: index < 2 ? "created_at" : index < 4 ? "votes" : "comment_count",
      order: index % 2 === 0 ? "DESC" : "ASC",
      p: 1,
    });
  }

  function classNames(...classes) {
    return classes.filter(Boolean).join(" ");
  }

  return (
    <div className="tabs-container">
      <div>
        <div className="tabs">
          {categories.map((category, index) => (
            <li
              id={index}
              key={category}
              onClick={() => {
                console.log(index);
                handleSort(index);
              }}
              className={({ selected }) =>
                classNames("tab", "focused", selected ? `${""}` : `${""}`)
              }
            >
              {category}
            </li>
          ))}
        </div>
      </div>
    </div>
  );
}
