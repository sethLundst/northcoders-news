import { useNavigate } from "react-router-dom";
import {
  Articles,
  Loading,
  LoadingArticles,
  SortPosts,
  Pagination,
  Tabs,
  VoteButtons,
} from "../components";
import { useParams, useScreen } from "../contexts";
import { useFetchArticles } from "../hooks";

function Home() {
  const navigate = useNavigate();
  const { isGreaterThan992px } = useScreen();
  const { params, setParams, filter, setFilter } = useParams();
  const { articles, setArticles, error, isLoading, isReloading } =
    useFetchArticles(params);
  if (error) navigate("/error", { state: error.data });
  if (isLoading) return <Loading />;

  return (
    <>
      {isGreaterThan992px ? (
        <Tabs
          filter={filter}
          params={params}
          setParams={setParams}
          setFilter={setFilter}
        />
      ) : (
        <SortPosts />
      )}
      {isReloading ? (
        <LoadingArticles />
      ) : (
        <Articles articles={articles} setArticles={setArticles}>
          <VoteButtons data={articles} setData={setArticles} type={"article"} />
        </Articles>
      )}
      <Pagination
        articles={articles}
        params={params}
        setParams={setParams}
        filter={filter}
      />
    </>
  );
}

export default Home;
