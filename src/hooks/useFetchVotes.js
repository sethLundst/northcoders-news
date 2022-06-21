import { useState, useEffect } from "react";
import { getVotes, postVote } from "../api";

export default function useFetchVotes(username) {
  const [votes, setVotes] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  postVote(username, 1);

  useEffect(() => {
    async function fetchVotes() {
      try {
        const response = await getVotes(username);
        setVotes(response.data);
        console.log(response);
        setIsLoading(false);
      } catch (error) {
        setError({ error });
      }
    }
    fetchVotes();
  }, [username]);

  return { votes, setVotes, error, isLoading };
}
