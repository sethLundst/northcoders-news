import { useState, useEffect } from "react";
import { getArticles } from "../api";
import { useParams } from "../contexts";

export default function useFetchArticles(articleParams) {
  const { params, setParams } = useParams();
  const [articles, setArticles] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  if (articleParams.length) {
    setParams(articleParams);
  }

  useEffect(() => {
    async function fetchArticles() {
      console.log(params);
      try {
        const response = await getArticles(params);
        setArticles(response.data.articles);
        setIsLoading(false);
      } catch (error) {
        setError({ error });
      }
    }
    fetchArticles();
  }, [params]);

  return { articles, setArticles, error, isLoading };
}
