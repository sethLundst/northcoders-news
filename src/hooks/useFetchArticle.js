import { useEffect, useState } from "react";
import { getArticle } from "../api";

export default function useFetchArticle(article_id) {
  const [article, setArticle] = useState({ comment_count: "" });
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchArticle() {
      try {
        const response = await getArticle(article_id);
        setArticle(response.data.article);
        setIsLoading(false);
      } catch (err) {
        setError({ err });
      }
    }
    fetchArticle();
  }, [article_id]);

  return { article, setArticle, error, setError, isLoading };
}
