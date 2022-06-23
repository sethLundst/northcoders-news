import { patchArticle, postVote, deleteVote } from "../api";

const votesReducer = (state, action) => {
  const { type, id, payload, user } = action;

  switch (type) {
    // case "INITIALIZE_VOTES":
    //   return {
    //     ...state,
    //     upvotes: payload.upvotes,
    //     downvotes: payload.downvotes,
    //   };

    case "ADD_UPVOTE":
      return {
        ...state,
        upvotes: [...state.upvotes, id],
        downvotes: [...state.downvotes.filter((vote) => vote !== id)],
      };

    case "ADD_DOWNVOTE":
      return {
        ...state,
        upvotes: [...state.upvotes.filter((vote) => vote !== id)],
        downvotes: [...state.downvotes, id],
      };

    case "REMOVE_UPVOTE":
      return {
        ...state,
        upvotes: [...state.upvotes.filter((vote) => vote !== id)],
      };

    case "REMOVE_DOWNVOTE":
      return {
        ...state,
        downvotes: [...state.downvotes.filter((vote) => vote !== id)],
      };

    default:
      throw new Error(`No case for type ${type}`);
  }
};

export default votesReducer;
