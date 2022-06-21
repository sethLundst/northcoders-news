import { useState, useEffect } from "react";
import { getArticles } from "../api";

export default function useFetchArticles(articlesParams) {
  const [articles, setArticles] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchArticles() {
      try {
        const response = await getArticles(articlesParams);
        setArticles(response.data.articles);
        setIsLoading(false);
      } catch (error) {
        setError({ error });
      }
    }
    fetchArticles();
  }, [articlesParams]);

  return { articles, setArticles, error, isLoading };
}
