import "../styles/SortTabs.css";

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
      {/* <div className="inline-block relative w-fit">
        <select
          onChange={(event) => {
            handleSort(event.target.value);
          }}
          className="sort-select block appearance-none w-full h-full bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded-xl shadow leading-tight focus:outline-none focus:shadow-outline"
        >
          {categories.map((category, index) => (
            <option value={index}>{category}</option>
          ))}
        </select>
        <div className="sort-icon pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
          <svg
            className="fill-current h-4 w-4"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
          >
            <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
          </svg>
        </div>
          </div>*/}

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
