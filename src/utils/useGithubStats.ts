import { useState } from "react";
import { GithubAPIRate } from "../types";

export function useGithubStats() {
  const [data, setData] = useState<GithubAPIRate | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isError, setIsError] = useState<boolean>(false);

  async function fetchGithubStats(token: string) {
    if (!token) return console.log("missing token");
    try {
      setIsError(false);
      setIsLoading(true);
      const res = await fetch("https://api.github.com/rate_limit", {
        method: "GET",
        headers: {
          Accept: "application/vnd.github+json",
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await res.json();
      setData(data.rate);
      setIsLoading(false);
    } catch (error) {
      setIsError(true);
      setIsLoading(false);
    }
  }

  return { data, isLoading, isError, fetchGithubStats };
}
