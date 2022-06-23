import "./Pagination.css";

import { useFetchPageTotal } from "../hooks";
import { ChevronRightIcon, ChevronLeftIcon } from "../icons";
import { useNavigate } from "react-router-dom";
import { ParamsContext } from "../contexts/ParamsContext";
import { useContext } from "react";

export default function Pagination({ articles, comments }) {
  const elements = articles === undefined ? comments : articles;
  const { filter, params, setParams } = useContext(ParamsContext);
  const { pageTotal, error, isLoading } = useFetchPageTotal(filter, params);
  const navigate = useNavigate();

  console.log(filter, params);

  const pages = [];
  for (let i = 1; i <= pageTotal.pages; i++) {
    pages.push(i);
  }

  function handlePage(page) {
    window.scrollTo(0, 0);
    filter.hasOwnProperty("topic")
      ? setParams({
          ...params,
          p: page,
          topic: filter.topic,
        })
      : setParams({
          ...params,
          p: page,
          author: filter,
        });
  }

  if (error) navigate("/error", { state: error.data });
  if (isLoading) return <p>Loading... </p>;

  return (
    <div className="page-container">
      <div className="page-card">
        <div>
          {elements.length === 0 ? (
            <p>
              No
              <b>
                {filter.hasOwnProperty("comments")
                  ? " comments "
                  : " articles "}
              </b>
              found.
            </p>
          ) : (
            <p className="page-text">
              Showing <b>{params.p}</b> to <b>{pageTotal.pages}</b> of
              <b> {pageTotal.elements}</b> results
            </p>
          )}
        </div>
        <div>
          <div className="page-buttons space">
            <button
              onClick={() => handlePage(params.p === 1 ? 1 : params.p - 1)}
              className="page-button prev"
              title="Previous Page"
              aria-label="previous page"
            >
              <ChevronLeftIcon className="page-icon" />
            </button>
            {pages.map((page) => {
              return (
                <button
                  key={page}
                  onClick={() => handlePage(page)}
                  className={`page-number ${
                    params.p === page ? "active-page" : "number"
                  }`}
                >
                  {page}
                </button>
              );
            })}
            <button
              onClick={() =>
                handlePage(
                  params.p === pageTotal.pages ? params.p : params.p + 1
                )
              }
              className="page-button next"
              title="next page"
              aria-label="next page"
            >
              <ChevronRightIcon className="page-icon" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
