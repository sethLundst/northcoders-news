import { useState, useEffect } from "react";
import { getArticles, getArticlesByTopic } from "../api";

export default function useFetchPageTotal(filter, params) {
  const [pageTotal, setPageTotal] = useState({ items: "", pages: "" });
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function getPageTotal() {
      try {
        const response = await getArticles({
          author: filter,
          limit: 10000,
          topic: params.topic,
        });
        const topicResponse = await getArticlesByTopic({
          topic: filter.topic,
          limit: 10000,
        });
        filter.hasOwnProperty("comment")
          ? setPageTotal({
              items: filter.comment,
              pages: Math.ceil(filter.comment / params.limit),
            })
          : filter.hasOwnProperty("topic")
          ? setPageTotal({
              items: topicResponse.data.articles.length,
              pages: Math.ceil(
                topicResponse.data.articles.length / params.limit
              ),
            })
          : setPageTotal({
              items: response.data.articles.length,
              pages: Math.ceil(response.data.articles.length / params.limit),
            });
        setIsLoading(false);
      } catch (err) {
        setError({ err });
      }
    }
    getPageTotal();
  }, [filter, params.limit, params.topic]);

  return { pageTotal, error, isLoading };
}
