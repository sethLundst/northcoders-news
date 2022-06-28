export const votesReducer = (state, action) => {
  const { type, id, payload } = action;

  switch (type) {
    case "INITIALIZE_VOTES":
      return payload;

    case "ADD_ARTICLE_UPVOTE":
      return {
        ...state,
        articleVotes: {
          upvotes: [...state.articleVotes.upvotes, id],
          downvotes: [
            ...state.articleVotes.downvotes.filter((vote) => vote !== id),
          ],
        },
      };

    case "ADD_COMMENT_UPVOTE":
      return {
        ...state,
        commentVotes: {
          upvotes: [...state.commentVotes.upvotes, id],
          downvotes: [
            ...state.commentVotes.downvotes.filter((vote) => vote !== id),
          ],
        },
      };

    case "ADD_ARTICLE_DOWNVOTE":
      return {
        ...state,
        articleVotes: {
          upvotes: [
            ...state.articleVotes.upvotes.filter((vote) => vote !== id),
          ],
          downvotes: [...state.articleVotes.downvotes, id],
        },
      };

    case "ADD_COMMENT_DOWNVOTE":
      return {
        ...state,
        commentVotes: {
          upvotes: [
            ...state.commentVotes.upvotes.filter((vote) => vote !== id),
          ],
          downvotes: [...state.commentVotes.downvotes, id],
        },
      };

    case "REMOVE_ARTICLE_UPVOTE":
      return {
        ...state,
        articleVotes: {
          upvotes: [
            ...state.articleVotes.upvotes.filter((vote) => vote !== id),
          ],
          downvotes: [...state.articleVotes.downvotes],
        },
      };

    case "REMOVE_COMMENT_UPVOTE":
      return {
        ...state,
        commentVotes: {
          upvotes: [
            ...state.commentVotes.upvotes.filter((vote) => vote !== id),
          ],
          downvotes: [...state.commentVotes.downvotes],
        },
      };

    case "REMOVE_ARTICLE_DOWNVOTE":
      return {
        ...state,
        articleVotes: {
          downvotes: [
            ...state.articleVotes.downvotes.filter((vote) => vote !== id),
          ],
          upvotes: [...state.articleVotes.upvotes],
        },
      };

    case "REMOVE_COMMENT_DOWNVOTE":
      return {
        ...state,
        commentVotes: {
          downvotes: [
            ...state.commentVotes.downvotes.filter((vote) => vote !== id),
          ],
          upvotes: [...state.commentVotes.upvotes],
        },
      };

    default:
      throw new Error(`No case for type ${type}`);
  }
};
