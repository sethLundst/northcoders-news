import { useState, useEffect } from "react";
import { getVotes } from "../api";

export default function useFetchVotes(user) {
  const [votes, setVotes] = useState({
    articleVotes: {
      upvotes: [],
      downvotes: [],
    },
    commentVotes: {
      upvotes: [],
      downvotes: [],
    },
  });
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchVotes() {
      try {
        const response = await getVotes(user);
        const votes = response.data.votes;

        const upvotedArticles = [];
        const downvotedArticles = [];
        const upvotedComments = [];
        const downvotedComments = [];

        votes.articleVotes.forEach((vote) => {
          if (vote.downvote_upvote === 1) {
            upvotedArticles.push(vote.article_id);
          } else {
            downvotedArticles.push(vote.article_id);
          }
        });

        votes.commentVotes.forEach((vote) => {
          if (vote.downvote_upvote === 1) {
            upvotedComments.push(vote.comment_id);
          } else {
            downvotedComments.push(vote.comment_id);
          }
        });

        setVotes({
          articleVotes: {
            upvotes: upvotedArticles,
            downvotes: downvotedArticles,
          },
          commentVotes: {
            upvotes: upvotedComments,
            downvotes: downvotedComments,
          },
        });

        setIsLoading(false);
      } catch (error) {
        setError({ error });
      }
    }

    fetchVotes();
  }, [user]);

  return { votes, setVotes, error, isLoading };
}
