import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  ArticleView,
  CommentForm,
  CommentList,
  Pagination,
  SortByDropdown,
  VoteButtons,
  Loading,
} from "../components";
import { useFetchArticle, useFetchComments } from "../hooks";

function Post() {
  const navigate = useNavigate();
  const { article_id } = useParams();
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
      <ArticleView article={article} setArticle={setArticle}>
        <VoteButtons data={article} setData={setArticle} />
      </ArticleView>
      <CommentForm
        comments={comments}
        setComments={setComments}
        setParams={setParams}
        article={article}
        setArticle={setArticle}
        status={status}
        setStatus={setStatus}
      />
      <SortByDropdown params={params} setParams={setParams} />
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
        <VoteButtons data={comments} setData={setComments} />
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
