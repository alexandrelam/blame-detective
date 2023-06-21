import { useState } from "react";
import { ModifiedFile } from "../../types";

export function useSearch() {
  const [modifiedFiles, setModifiedFiles] = useState<ModifiedFile[]>([]);
  const [searchedFiles, setSearchedFiles] = useState<ModifiedFile[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  async function makeSearch(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setIsLoading(true);

    const filepath = (
      e.currentTarget.elements.namedItem("filepath") as HTMLInputElement
    ).value;
    const start_date = (
      e.currentTarget.elements.namedItem("start_date") as HTMLInputElement
    ).value;
    const end_date = (
      e.currentTarget.elements.namedItem("end_date") as HTMLInputElement
    ).value;
    const token = localStorage.getItem("githubToken");

    if (!start_date || !end_date) {
      console.log("missing fields");
      console.log(start_date, end_date);
      return;
    }

    const params = new URLSearchParams();
    params.append("filepath", filepath);
    params.append("start_date", start_date);
    params.append("end_date", end_date);
    if (token) params.append("token", token);

    const response = await fetch(
      `http://localhost:5175/files?${params.toString()}`
    );

    if (response.status === 200) {
      const json = await response.json();
      setModifiedFiles(json);
      console.log(json);
    }

    setIsLoading(false);
  }

  function refineSearch(event: React.ChangeEvent<HTMLInputElement>) {
    const { value } = event.target;
    setSearchedFiles(
      modifiedFiles.filter((file) =>
        file.filename.toLowerCase().includes(value.toLowerCase())
      )
    );
  }

  return { modifiedFiles, isLoading, makeSearch, searchedFiles, refineSearch };
}
