import { createContext, useContext, useEffect, useReducer } from "react";
import votesReducer from "./votesReducer";
import useFetchVotes from "../hooks/useFetchVotes";
import useUser from "./UserContext";
import { patchArticle, postVote, deleteVote } from "../api";

const initialState = {
  upvotes: [],
  downvotes: [],
};
const VotesContext = createContext(initialState);

export const VotesProvider = ({ children, likes }) => {
  const { user } = useUser();
  const [state, dispatch] = useReducer(votesReducer, likes);
  console.log(state);
  // useEffect(() => {
  //   dispatch({
  //     type: "INITIALIZE_VOTES",
  //     payload: {
  //       upvotes: likes.upvotes,
  //       downvotes: likes.downvotes,
  //     },
  //   });
  // }, [likes]);

  const handleUpvote = (id, data, setData) => {
    const vote = state.downvotes.includes(id)
      ? 2
      : state.upvotes.includes(id)
      ? -1
      : 1;
    const type = state.upvotes.includes(id) ? "REMOVE_UPVOTE" : "ADD_UPVOTE";

    if (state.upvotes.includes(id)) {
      deleteVote(user, id);
    } else {
      postVote(user, id, 1);
    }

    patchArticle(id, vote);
    setData(
      data.map((element) =>
        element.article_id === id
          ? { ...element, votes: element.votes + vote }
          : element
      )
    );

    dispatch({
      type: type,
      id: id,
      user: user,
    });
  };

  const handleDownvote = (id, data, setData) => {
    const vote = state.upvotes.includes(id)
      ? -2
      : state.downvotes.includes(id)
      ? 1
      : -1;
    const type = state.downvotes.includes(id)
      ? "REMOVE_DOWNVOTE"
      : "ADD_DOWNVOTE";

    if (state.downvotes.includes(id)) {
      deleteVote(user, id);
    } else {
      postVote(user, id, 0);
    }

    patchArticle(id, vote);
    setData(
      data.map((element) =>
        element.article_id === id
          ? { ...element, votes: element.votes + vote }
          : element
      )
    );

    dispatch({
      type: type,
      id: id,
      user: user,
    });
  };

  return (
    <>
      {state.upvotes && state.downvotes && (
        <VotesContext.Provider
          value={{
            state,
            dispatch,
            handleUpvote,
            handleDownvote,
          }}
        >
          {children}
        </VotesContext.Provider>
      )}
    </>
  );
};

const useVotes = () => {
  const context = useContext(VotesContext);

  if (context === undefined) {
    throw new Error("useVotes must be used within VotesContext");
  }

  return context;
};

export default useVotes;
