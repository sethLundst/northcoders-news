import "../styles/Pagination.css";
import { useFetchPageTotal } from "../hooks";
import { ChevronRightIcon, ChevronLeftIcon } from "../icons";
import { useLocation, useNavigate } from "react-router-dom";
import { useScreen } from "../contexts";

export default function Pagination({
  articles,
  comments,
  filter,
  params,
  setParams,
}) {
  const elements = articles === undefined ? comments : articles;
  const { pageTotal, error, isLoading } = useFetchPageTotal(filter, params);
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const { isGreaterThan992px } = useScreen();

  const pages = [];
  for (let i = 1; i <= pageTotal.pages; i++) {
    pages.push(i);
  }

  function handlePage(page) {
    window.scrollTo(0, 0);
    document.querySelector("header").scrollTo(0, 0);
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
  console.log(pathname);
  function handleNext() {
    return handlePage(params.p === pageTotal.pages ? params.p : params.p + 1);
  }

  function handlePrev() {
    return handlePage(params.p === 1 ? 1 : params.p - 1);
  }

  if (error) navigate("/error", { state: error.data });
  if (isLoading) {
    return (
      <div className="page-container">
        <div className="page-card">
          <div></div>
          <div>
            <div className="page-buttons space">
              <button className="page-button prev">
                <ChevronLeftIcon className="page-icon" />
              </button>
              <button className="page-button next">
                <ChevronRightIcon className="page-icon" />
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  } else if (!isGreaterThan992px) {
    return (
      <div
        className="page-container"
        style={{
          backgroundColor: pathname === "/" ? "" : "var(--mob-article)",
          justifyContent: params.p === 1 ? "flex-end" : "space-between",
        }}
      >
        {params.p !== 1 && (
          <button className="page-btn-mob" onClick={handlePrev}>
            Previous
          </button>
        )}
        <button className="page-btn-mob" onClick={handleNext}>
          Next
        </button>
      </div>
    );
  } else {
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
                <b> {pageTotal.items}</b> results
              </p>
            )}
          </div>
          <div>
            <div className="page-buttons space">
              <button
                onClick={handlePrev}
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
                onClick={handleNext}
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
}
