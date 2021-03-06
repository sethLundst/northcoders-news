import "../styles/DeleteButton.css";
import { useRef, useState } from "react";
import { useOnClickOutside } from "../hooks";
import { AlertIcon, TrashIcon } from "../icons";
import { deleteArticle, deleteComment } from "../api";
import { useNavigate } from "react-router-dom";

export default function DeleteButton({
  article,
  setArticle,
  item,
  setParams,
  setStatus,
}) {
  const ref = useRef();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  useOnClickOutside(ref, (e) => {
    setOpen(false);
  });

  async function handleDelete() {
    if (Object.keys(item)[0] === "comment") {
      await deleteComment(item.comment.comment_id);
      setArticle({
        ...article,
        comment_count: Number(article.comment_count) - 1,
      });
      setParams({
        limit: 10,
        p: 1,
        clicked: "most recent",
      });
      setOpen(false);
      setStatus("Submit");
    } else {
      setOpen(false);
      await deleteArticle(item.article.article_id);
      navigate("/");
    }
  }

  // if (open) {
  //   document.getElementById("center").style.zIndex = "1";
  // } else {
  //   document.getElementById("center").style.zIndex = "-1";
  // }

  return (
    <div ref={ref}>
      <button
        className="delete-button"
        onClick={() => {
          setOpen(!open);
        }}
      >
        <TrashIcon className="delete-icon" /> Delete
      </button>

      {open ? (
        <div className="delete-modal-container">
          <div className="delete-modal">
            <AlertIcon className="alert-icon" />
            <p className="modal-message">{`Are you sure you want to delete your ${
              Object.keys(item)[0]
            }?`}</p>
            <div className="modal-buttons">
              <button
                className="modal-button cancel"
                onClick={() => {
                  setOpen(false);
                }}
              >
                Cancel
              </button>
              <button className="modal-button delete" onClick={handleDelete}>
                Delete
              </button>
            </div>
          </div>
        </div>
      ) : (
        ""
      )}
    </div>
  );
}
