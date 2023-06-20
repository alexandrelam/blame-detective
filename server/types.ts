type GithubFile = {
  filename: string;
  status: string;
  additions: number;
  deletions: number;
  changes: number;
  patch?: string;
};

export type GithubCommitResponse = {
  sha: string;
  html_url: string;
  author: {
    login: string;
    avatar_url: string;
    html_url: string;
  };
  files: GithubFile[];
};
