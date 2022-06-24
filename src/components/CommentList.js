import "./CommentList.css";

import {
  Error,
  SortTabs,
  Pagination,
  CommentForm,
  VoteButtons,
  DeleteButton,
} from ".";
import { patchComment } from "../api";
import { UserContext } from "../contexts/UserContext";
import { useFetchComments } from "../hooks";
import { useParams } from "react-router-dom";
import { useContext, useState } from "react";
import { UserIcon } from "../icons";
import { ParamsContext } from "../contexts/ParamsContext";

export default function CommentList({ article, params, setParams }) {
  const { article_id } = useParams();
  const categories = ["Most Recent", "Oldest", "Most Votes", "Fewest Votes"];

  const { user } = useContext(UserContext);
  const [blur, setBlur] = useState(false);

  const [showModal, setShowModal] = useState({ bool: false, type: null });
  const [status, setStatus] = useState("Submit");
  const { comments, setComments, error, isLoading } = useFetchComments(
    article_id,
    params
  );
  function handleClick() {
    console.log("SADHUIHQENFK");
  }

  if (error) return <Error message={error.err.response}></Error>;
  if (isLoading) return <></>;
  return (
    <div>
      {/* <SortTabs categories={categories} params={params} setParams={setParams} /> */}
      <div className="comment-list">
        {comments.map((comment) => (
          <div className="comment-card" key={comment.comment_id}>
            <div className="left-container">
              <div>
                <UserIcon className="comment-user-icon" />
              </div>

              <button className="thread-button">
                <div className="thread"></div>
              </button>
            </div>

            <div className="right-container">
              <h2>
                {comment.author} ·{" "}
                <span className="comment-details">
                  {/* {`on ${comment.created_at.substring(
                    0,
                    comment.created_at.indexOf("T")
                  )}`} */}
                </span>
              </h2>

              <div className="comment-body">
                <p className="comment-body">{comment.body} ·</p>
                <div className="comment-buttons">
                  <VoteButtons
                    item={{ id: comment.comment_id, votes: comment.votes }}
                    data={comments}
                    setData={setComments}
                  />

                  {comment.author === user ? (
                    <button
                      onClick={() => {
                        setBlur(true);
                      }}
                    >
                      <DeleteButton
                        item={{ comment: comment }}
                        state={comments}
                        setState={setComments}
                        setParams={setParams}
                      />
                    </button>
                  ) : (
                    ""
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <Pagination
        comments={comments}
        filter={{ comment: article.comment_count }}
        params={params}
        setParams={setParams}
      />
      {/* <DeleteModal
          showModal={showModal}
          setShowModal={setShowModal}
          open={open}
          setOpen={setOpen}
          article={article}
          setArticle={setArticle}
          setError={setError}
          setParams={setParams}
          status={status}
          setStatus={setStatus}
        ></DeleteModal> */}
    </div>
  );
}
