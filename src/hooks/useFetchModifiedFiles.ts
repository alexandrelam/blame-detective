import { FetchContext } from "../Context/FetchContext";
import { useTypedContext } from "./useTypedContext";
import { createModifiedFile } from "../db/actions/createModifiedFile";
import { GithubCommitResponse, ModifiedFile } from "../types";

export function getDatesFromRange(start_date: Date, end_date: Date): Date[] {
  const dates: Date[] = [];
  const current_date = new Date(start_date);
  while (current_date <= end_date) {
    dates.push(new Date(current_date));
    current_date.setDate(current_date.getDate() + 1);
  }
  return dates;
}

export function useFetchModifiedFiles() {
  const {
    setModifiedFiles,
    setIsLoading,
    setTotalCommitsToFetch,
    setTotalCommitsFetched,
  } = useTypedContext(FetchContext);

  async function fetchModifiedFiles(
    owner: string,
    repo: string,
    date: string,
    accessToken: string
  ): Promise<void> {
    const searchCommitsUrl = `https://api.github.com/repos/${owner}/${repo}/commits`;
    const searchCommitsParams = new URLSearchParams({
      since: `${date}T00:00:00Z`,
      until: `${date}T23:59:59Z`,
    });
    const searchCommitsOptions = {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
        Accept: "application/vnd.github.v3+json",
      },
    };
    const commitsDatas = [];

    let commitsResponse = await fetch(
      `${searchCommitsUrl}?${searchCommitsParams}`,
      searchCommitsOptions
    );
    let commitsData = await commitsResponse.json();
    commitsDatas.push(...commitsData);

    for (;;) {
      const link = commitsResponse.headers.get("link");
      if (!link) break;

      const nextLink = link
        .split(",")
        .find((link) => link.includes('rel="next"'));
      if (!nextLink) break;

      const nextLinkUrl = nextLink.split(";")[0].slice(1, -1);

      const nextLinkParams = new URLSearchParams(nextLinkUrl.split("?")[1]);
      searchCommitsParams.set("page", nextLinkParams.get("page") || "");

      if (!nextLinkParams.get("page")) break;

      try {
        commitsResponse = await fetch(
          `${searchCommitsUrl}?${searchCommitsParams}`,
          searchCommitsOptions
        );

        commitsData = await commitsResponse.json();
        commitsDatas.push(...commitsData);
      } catch (error) {
        console.error(error);
        break;
      }
    }

    setTotalCommitsToFetch(commitsDatas.length);

    for (const commit of commitsDatas) {
      const commitUrl = commit.url;
      const commitOptions = {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
          Accept: "application/vnd.github.v3+json",
        },
      };
      const commitResponse = await fetch(commitUrl, commitOptions);
      const commitData: GithubCommitResponse = await commitResponse.json();
      const formattedData: Omit<ModifiedFile, "id">[] = commitData.files.map(
        (file) => {
          return {
            owner,
            repo,
            filename: file.filename,
            status: file.status,
            additions: file.additions,
            deletions: file.deletions,
            changes: file.changes,
            patch: file.patch || null,
            date: new Date(date),
            sha: commitData.sha,
            html_url: commitData.html_url,
            author_login: commitData.author?.login,
            author_avatar_url: commitData.author?.avatar_url,
            author_html_url: commitData.author?.html_url,
          };
        }
      );

      setTotalCommitsFetched((prev) => prev + 1);
      setModifiedFiles((prev) => [...prev, ...formattedData]);
      setIsLoading(false);

      for (const file of formattedData) {
        await createModifiedFile(file);
      }
    }
  }

  return { fetchModifiedFiles };
}
