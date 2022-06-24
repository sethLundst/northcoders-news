import "./DeleteButton.css";
import { useEffect, useRef, useState } from "react";
import { useOnClickOutside } from "../hooks";
import { AlertIcon, TrashIcon } from "../icons";
import { deleteArticle, deleteComment } from "../api";
import { useNavigate } from "react-router-dom";

export default function DeleteButton({ item, state, setState, setParams }) {
  const ref = useRef();
  const [open, setOpen] = useState(false);
  useOnClickOutside(ref, () => {
    setOpen(false);
  });

  function handleDelete() {
    if (Object.keys(item)[0] === "comment") {
      console.log(item);
      deleteComment(item.comment.comment_id);
      setState([
        ...state,
        state.filter(
          (element) => element.comment_id !== item.comment.comment_id
        ),
      ]);
      setOpen(false);
    } else {
      deleteArticle(item.article_id);
    }
  }

  if (open) {
    document.getElementById("center").style.zIndex = "1";
  } else {
    document.getElementById("center").style.zIndex = "-1";
  }

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
        <>
          <div className="modal-container">
            <div className="modal99">
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
        </>
      ) : (
        ""
      )}
    </div>
  );
}
