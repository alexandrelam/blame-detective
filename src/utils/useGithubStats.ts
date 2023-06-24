import { useState } from "react";
import { GithubAPIRate } from "../types";

export function useGithubStats() {
  const [data, setData] = useState<GithubAPIRate | null>(null);

  async function fetchGithubStats(token: string) {
    if (!token) return console.log("missing token");
    try {
      const res = await fetch("https://api.github.com/rate_limit", {
        method: "GET",
        headers: {
          Accept: "application/vnd.github+json",
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await res.json();
      setData(data.rate);
    } catch (error) {
      console.log(error);
    }
  }

  return { data, fetchGithubStats };
}
