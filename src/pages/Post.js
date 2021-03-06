import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  ArticleView,
  CommentForm,
  CommentList,
  Pagination,
  SortByDropdown,
  SortComments,
  VoteButtons,
  Loading,
} from "../components";
import { useScreen } from "../contexts";
import { useFetchArticle, useFetchComments } from "../hooks";

function Post() {
  const navigate = useNavigate();
  const { article_id } = useParams();
  const { isGreaterThan992px } = useScreen();
  const [params, setParams] = useState({
    limit: 10,
    p: 1,
  });
  const [status, setStatus] = useState("Submit");
  const { article, setArticle, error, isLoading } = useFetchArticle(article_id);
  const { comments, setComments } = useFetchComments(article_id, params);

  if (error) navigate("/error", { state: error.data });
  if (isLoading) return <Loading />;

  return (
    <>
      <ArticleView
        article={article}
        setArticle={setArticle}
        setParams={setParams}
      >
        <VoteButtons data={article} setData={setArticle} type={"article"} />
      </ArticleView>
      {!isGreaterThan992px && (
        <SortComments params={params} setParams={setParams} />
      )}
      <CommentForm
        comments={comments}
        setComments={setComments}
        setParams={setParams}
        article={article}
        setArticle={setArticle}
        status={status}
        setStatus={setStatus}
      />
      {isGreaterThan992px && (
        <SortByDropdown params={params} setParams={setParams} />
      )}
      <CommentList
        article={article}
        setArticle={setArticle}
        comments={comments}
        setComments={setComments}
        params={params}
        setParams={setParams}
        status={status}
        setStatus={setStatus}
      >
        <VoteButtons data={comments} setData={setComments} type={"comment"} />
      </CommentList>
      <Pagination
        comments={comments}
        filter={{ comment: article.comment_count }}
        params={params}
        setParams={setParams}
      />
    </>
  );
}

export default Post;
