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

export type ModifiedFile = {
  id: number;
  owner: string;
  repo: string;
  author_login?: string;
  author_avatar_url?: string;
  author_html_url?: string;
  date: Date;
  filename: string;
  html_url: string;
  sha: string;
  status: string;
  changes: number;
  additions: number;
  deletions: number;
  patch: string | null;
};

export type TreeNode = {
  name: string;
  fullPath: string;
  children?: TreeNode[];
};

export type TreeProps = {
  tree: TreeNode;
  selectedFilename: string | null;
  setSelectedFilename: React.Dispatch<React.SetStateAction<string | null>>;
};

export type GithubAPIRate = {
  limit: number;
  remaining: number;
  reset: number;
  used: number;
};
