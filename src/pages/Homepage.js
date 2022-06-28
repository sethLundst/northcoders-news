import { useNavigate } from "react-router-dom";
import {
  Articles,
  Loading,
  Pagination,
  Tabs,
  VoteButtons,
} from "../components";
import { useParams } from "../contexts";
import { useFetchArticles } from "../hooks";

function Homepage() {
  const navigate = useNavigate();
  const { params, setParams, filter, setFilter } = useParams();
  const { articles, setArticles, error, isLoading } = useFetchArticles(params);

  if (error) navigate("/error", { state: error.data });
  if (isLoading) return <Loading />;

  return (
    <>
      <Tabs
        filter={filter}
        params={params}
        setParams={setParams}
        setFilter={setFilter}
      />
      <Articles articles={articles} setArticles={setArticles}>
        <VoteButtons data={articles} setData={setArticles} type={"article"} />
      </Articles>
      <Pagination
        articles={articles}
        params={params}
        setParams={setParams}
        filter={filter}
      />
    </>
  );
}

export default Homepage;
