import { useState, useEffect } from "react";
import { getArticles } from "../api";
import { useParams } from "../contexts";

export default function useFetchArticles(articleParams) {
  const { params } = useParams();
  const [articles, setArticles] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isReloading, setIsReloading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchArticles() {
      try {
        const response = await getArticles(params);
        setArticles(response.data.articles);
        setIsLoading(false);
        setIsReloading(false);
      } catch (error) {
        setError({ error });
      }
    }
    if (!isLoading) setIsReloading(true);
    fetchArticles();
  }, [isLoading, params]);

  return { articles, setArticles, error, isLoading, isReloading };
}
