import { useEffect, useState } from "react";
import { getArticlesByTopic } from "../api";

export default function useFetchArticlesByTopic(params) {
  const [articles, setArticles] = useState([]);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchArticlesByTopic() {
      try {
        const response = await getArticlesByTopic(params);
        setArticles(response.data.articles);
        setIsLoading(false);
      } catch (err) {
        setError({ err });
      }
    }

    fetchArticlesByTopic();
  }, [params]);

  return { articles, error, isLoading };
}
