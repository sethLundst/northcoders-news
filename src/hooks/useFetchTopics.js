import { useEffect, useState } from "react";
import { getTopics } from "../api";

export default function useFetchTopics() {
  const [topics, setTopics] = useState([]);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchTopics() {
      console.log("fetching topics");
      try {
        const response = await getTopics();
        setTopics(response.data.topics);
        setIsLoading(false);
      } catch (err) {
        setError({ err });
      }
    }
    fetchTopics();
  }, []);

  return { topics, error, isLoading };
}
