import "../styles/NewPost.css";
import { useRef, useState, cloneElement } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { postArticle } from "../api";
import { useParams, useUser } from "../contexts";
import { useFetchTopics, useOnClickOutside } from "../hooks";
import { handleKeyPress } from "../utils";
import { ChevronDown, Coding, Cooking, Football, TopicIcon } from "../icons";

function NewPost() {
  const { user } = useUser();
  const ref = useRef();
  const location = useLocation();
  const navigate = useNavigate();
  const { setParams } = useParams();
  const { topics } = useFetchTopics();
  const [open, setOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [newArticle, setNewArticle] = useState({});
  const [selected, setSelected] = useState("Select a Topic");
  const [status, setStatus] = useState("Submit");
  const [isValid, setIsValid] = useState({
    title: true,
    body: true,
    topic: true,
  });

  const icons = {
    "select a topic": <TopicIcon />,
    coding: <Coding />,
    cooking: <Cooking />,
    football: <Football />,
  };

  function closeModal() {
    setIsValid({ title: true, body: true, topic: true });
    setOpen(false);
    setDropdownOpen(false);
    setStatus("Submit");
    setTimeout(function () {
      setSelected("Select a Topic");
    }, 100);
  }
  function openModal() {
    setOpen(true);
  }

  function handleArticleChange(event) {
    setNewArticle({
      ...newArticle,
      [event.target.id]: event.target.value,
    });
  }

  async function handleArticleSubmit(event) {
    event.preventDefault();
    if (newArticle.title && newArticle.body && selected !== "Select a Topic") {
      setStatus("Posting...");
      console.log(
        user,
        newArticle.title,
        newArticle.body,
        selected.toLowerCase()
      );
      await postArticle(
        user,
        newArticle.title,
        newArticle.body,
        selected.toLowerCase()
      );
      setStatus("Submitted!");
      setNewArticle({ title: "", body: "", topic: "" });
      setTimeout(function () {
        setOpen(false);
        if (location.pathname === "/") {
          setParams({
            limit: 15,
            p: 1,
            clicked: "most recent",
          });
        } else {
          navigate("/");
        }
        setTimeout(function () {
          closeModal();
        }, 1000);
      }, 1000);
    } else {
      setIsValid({
        title: Boolean(newArticle.title),
        body: Boolean(newArticle.body),
        topic: selected === "Select a Topic" ? false : true,
      });
    }
  }

  useOnClickOutside(ref, () => {
    closeModal();
  });

  return (
    <>
      <button className="new-article" onClick={openModal}>
        New Post
      </button>
      {open && (
        <div className="new-post-container">
          <form
            className="new-post-modal"
            ref={ref}
            onSubmit={handleArticleSubmit}
          >
            <input
              className={`title-input ${
                !isValid.title && !newArticle.title ? "invalid" : ""
              }`}
              maxLength="100"
              placeholder="Enter the title of your article..."
              id={"title"}
              onChange={handleArticleChange}
            />
            <button
              type="button"
              className={`new-post-tp-bt ${
                !isValid.topic && selected === "Select a Topic" ? "invalid" : ""
              }`}
              onClick={() => {
                setDropdownOpen(!dropdownOpen);
              }}
            >
              {cloneElement(icons[selected.toLowerCase()], {
                className: "icon",
              })}
              <div className="topic">{selected}</div>
              <ChevronDown className="topic-chevron" />
            </button>
            {dropdownOpen && (
              <div className="new-post-tp-drp">
                <div className="topic-menu">
                  {topics
                    .sort((a, b) => (a.slug < b.slug ? -1 : 1))
                    .map((topic) => {
                      const topicName =
                        topic.slug.charAt(0).toUpperCase() +
                        topic.slug.slice(1);
                      return (
                        <li
                          className={`topic-menu-option ${
                            selected === topicName ? "selected" : ""
                          }`}
                          key={topic.slug}
                          onClick={() => {
                            setSelected(topicName);
                            setDropdownOpen(false);
                          }}
                        >
                          {cloneElement(icons[topic.slug], {
                            className: "topic-icon",
                          })}
                          {topicName}
                        </li>
                      );
                    })}
                </div>
              </div>
            )}

            <textarea
              id="body"
              className={`new-post-textarea ${
                !newArticle.body && !isValid.body ? "invalid" : ""
              }`}
              placeholder="Enter the content of your article...."
              onKeyDown={(event) => {
                handleKeyPress(event, handleArticleSubmit);
              }}
              onChange={handleArticleChange}
              disabled={status !== "Submit" ? "disabled" : ""}
              rows="4"
              cols="50"
            />
            <div className="modal-buttons">
              <button
                className="new-post-btn"
                style={{ backgroundColor: "var(--pagination)" }}
                onClick={closeModal}
              >
                Cancel
              </button>
              <button
                className="new-post-btn"
                style={{ backgroundColor: "var(--green)" }}
                onClick={() => {}}
              >
                Submit
              </button>
            </div>
          </form>
        </div>
      )}
    </>
  );
}

export default NewPost;
