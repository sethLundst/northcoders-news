import { createContext, useContext, useEffect, useReducer } from "react";
import {
  patchArticle,
  patchComment,
  postArticleVote,
  postCommentVote,
  deleteArticleVote,
  deleteCommentVote,
} from "../api";
import { useFetchVotes } from "../hooks";
import { useUser } from "./UserContext";
import { votesReducer } from "./votesReducer";

const initialState = {
  articleVotes: {
    upvotes: [],
    downvotes: [],
  },
  commentVotes: {
    upvotes: [],
    downvotes: [],
  },
};

const VotesContext = createContext(initialState);

export const VotesProvider = ({ children }) => {
  const { user } = useUser();
  const { votes } = useFetchVotes(user);
  const [state, dispatch] = useReducer(votesReducer, initialState);

  useEffect(() => {
    dispatch({
      type: "INITIALIZE_VOTES",
      payload: votes,
    });
  }, [votes]);

  async function handleVote(isUpvote, id, data, setData, dataType) {
    console.log(dataType);
    const isArticleVote = dataType === "article";
    const post = isArticleVote ? postArticleVote : postCommentVote;
    const patch = isArticleVote ? patchArticle : patchComment;
    const del = isArticleVote ? deleteArticleVote : deleteCommentVote;
    const votes = isArticleVote ? state.articleVotes : state.commentVotes;
    const isUpvoted = votes.upvotes.includes(id);
    const isDownvoted = votes.downvotes.includes(id);
    const item = isArticleVote ? "ARTICLE" : "COMMENT";
    let type = "";

    function render(vote) {
      if (Array.isArray(data)) {
        setData(
          data.map((element) =>
            element[`${item.toLowerCase()}_id`] === id
              ? { ...element, votes: element.votes + vote }
              : element
          )
        );
      } else {
        setData({ ...data, votes: data.votes + vote });
      }
    }

    if (isUpvote) {
      if (isUpvoted) {
        render(-1);
        del(user, id);
        patch(id, -1);
        type = `REMOVE_${item}_UPVOTE`;
      } else if (isDownvoted) {
        render(2);
        post(user, id, 1);
        patch(id, 2);
        type = `ADD_${item}_UPVOTE`;
      } else {
        render(1);
        post(user, id, 1);
        patch(id, 1);
        type = `ADD_${item}_UPVOTE`;
      }
      dispatch({
        type: type,
        id: id,
      });
    } else {
      if (isDownvoted) {
        render(1);
        del(user, id);
        patch(id, 1);
        type = `REMOVE_${item}_DOWNVOTE`;
      } else if (isUpvoted) {
        render(-2);
        post(user, id, 0);
        patch(id, -2);
        type = `ADD_${item}_DOWNVOTE`;
      } else {
        render(-1);
        post(user, id, 0);
        patch(id, -1);
        type = `ADD_${item}_DOWNVOTE`;
      }
      dispatch({
        type: type,
        id: id,
      });
    }
  }

  return (
    <VotesContext.Provider value={{ state, dispatch, handleVote }}>
      {children}
    </VotesContext.Provider>
  );
};

export function useVotes() {
  const context = useContext(VotesContext);

  if (context === undefined) {
    throw new Error("useVotes must be used within VotesContext");
  }

  return context;
}
