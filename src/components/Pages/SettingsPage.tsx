import React, { useState, useEffect } from "react";
import { PageLayout } from "../layouts/PageLayout";
import { ThemePicker } from "../navbar/ThemePicker";

export function SettingsPage() {
  const [owner, setOwner] = useState("");
  const [repo, setRepo] = useState("");
  const [githubToken, setGithubToken] = useState("");

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
    }
  }, []);

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
        <div className="mt-4">
          <h2 className="font-bold text-xl text-secondary">Theme</h2>
          <ThemePicker />
        </div>
      </>
    </PageLayout>
  );
}
