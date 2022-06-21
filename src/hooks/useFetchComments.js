import { useState, useEffect } from "react";
import { getComments } from "../api";

export default function useFetchComments(article_id, params) {
  const [comments, setComments] = useState([]);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchComments() {
      try {
        const response = await getComments(article_id, params);
        setComments(response.data.comments);
        setIsLoading(false);
      } catch (err) {
        setError({ err });
      }
    }
    fetchComments();
  }, [article_id, params]);

  return { comments, setComments, error, setError, isLoading };
}
