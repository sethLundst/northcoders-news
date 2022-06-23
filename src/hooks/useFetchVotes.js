import { useState, useEffect } from "react";
import { getVotes } from "../api";

export default function useFetchVotes(username) {
  const [likes, setLikes] = useState({ upvotes: [], downvotes: [] });
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchVotes() {
      try {
        const response = await getVotes(username);
        const likes = response.data.likes;
        console.log("RUNNING FETCH VOTES");
        const articlesLiked = likes
          .filter((element) => element.like_dislike === 1)
          .map((element) => element.article_id);

        const articlesDisliked = likes
          .filter((element) => element.like_dislike === 0)
          .map((element) => element.article_id);

        setLikes({ upvotes: articlesLiked, downvotes: articlesDisliked });
        setIsLoading(false);
      } catch (error) {
        setError({ error });
      }
    }

    fetchVotes();
  }, [username]);

  return { likes, setLikes, error, isLoading };
}
