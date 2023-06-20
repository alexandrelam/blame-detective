import { ModifiedFile } from "@prisma/client";
import { GithubCommitResponse } from "../../types";

export function getDatesFromRange(start_date: Date, end_date: Date): Date[] {
  const dates: Date[] = [];
  const current_date = new Date(start_date);
  while (current_date <= end_date) {
    dates.push(new Date(current_date));
    current_date.setDate(current_date.getDate() + 1);
  }
  return dates;
}

export async function fetchModifiedFiles(
  owner: string,
  repo: string,
  date: string,
  accessToken: string
): Promise<Omit<ModifiedFile, "id" | "createdAt" | "updatedAt">[]> {
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
  const commitsResponse = await fetch(
    `${searchCommitsUrl}?${searchCommitsParams}`,
    searchCommitsOptions
  );
  const commitsData = await commitsResponse.json();
  const files: Omit<ModifiedFile, "id" | "createdAt" | "updatedAt">[] = [];
  for (const commit of commitsData) {
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
    const formattedData: Omit<
      ModifiedFile,
      "id" | "createdAt" | "updatedAt"
    >[] = commitData.files.map((file) => {
      return {
        filename: file.filename,
        status: file.status,
        additions: file.additions,
        deletions: file.deletions,
        changes: file.changes,
        patch: file.patch || null,
        date: new Date(date),
        sha: commitData.sha,
        html_url: commitData.html_url,
        author_login: commitData.author.login,
        author_avatar_url: commitData.author.avatar_url,
        author_html_url: commitData.author.html_url,
      };
    });

    files.push(...formattedData);
  }
  return files;
}
