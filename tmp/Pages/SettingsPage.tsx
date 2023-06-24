import React, { useState, useEffect } from "react";
import { PageLayout } from "../layouts/PageLayout";
import { useGithubStats } from "../../utils/useGithubStats";

export function SettingsPage() {
  const [owner, setOwner] = useState("");
  const [repo, setRepo] = useState("");
  const [githubToken, setGithubToken] = useState("");

  const { data, fetchGithubStats } = useGithubStats();

  useEffect(() => {
    const savedOwner = localStorage.getItem("owner");
    const savedRepo = localStorage.getItem("repo");
    const savedToken = localStorage.getItem("githubToken");

    if (savedOwner) {
      setOwner(savedOwner);
    }

    if (savedRepo) {
      setRepo(savedRepo);
    }

    if (savedToken) {
      setGithubToken(savedToken);
      fetchGithubStats(savedToken);
    }
  }, [githubToken]);

  const handleOwnerChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setOwner(value);
    localStorage.setItem("owner", value);
  };

  const handleRepoChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setRepo(value);
    localStorage.setItem("repo", value);
  };

  const handleTokenChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setGithubToken(value);
    localStorage.setItem("githubToken", value);
  };

  return (
    <PageLayout title="Settings">
      <>
        <div className="grid grid-cols-2 gap-4">
          <label htmlFor="ownerInput" className="font-medium">
            Owner:
          </label>
          <input
            id="ownerInput"
            type="text"
            value={owner}
            onChange={handleOwnerChange}
            className="border rounded-md p-2"
          />

          <label htmlFor="repoInput" className="font-medium">
            Repo:
          </label>
          <input
            id="repoInput"
            type="text"
            value={repo}
            onChange={handleRepoChange}
            className="border rounded-md p-2"
          />

          <label htmlFor="tokenInput" className="font-medium">
            GitHub Token (optional):
          </label>
          <input
            id="tokenInput"
            type="text"
            value={githubToken}
            onChange={handleTokenChange}
            className="border rounded-md p-2"
          />
        </div>
        <div>
          <h2 className="mt-4 font-bold text-xl text-secondary">
            Github API Stats
          </h2>
          {!githubToken && (
            <div className="alert alert-warning mt-8">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="stroke-current shrink-0 h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                />
              </svg>
              <span>
                Please provide a Github token to get your Github api stats
              </span>
            </div>
          )}
          {!!data && (
            <table className="table w-96 mt-8">
              <thead>
                <tr>
                  <th className="py-2">Limit</th>
                  <th className="py-2">Used</th>
                  <th className="py-2">Remaining</th>
                  <th className="py-2">Reset</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="py-2">{data.limit}</td>
                  <td className="py-2">{data.used}</td>
                  <td className="py-2">{data.remaining}</td>
                  <td className="py-2">{data.reset}</td>
                </tr>
              </tbody>
            </table>
          )}
        </div>
      </>
    </PageLayout>
  );
}
