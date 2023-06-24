import { useState } from "react";
import { ModifiedFile } from "../../types";
import { fetchModifiedFiles, getDatesFromRange } from "../utils/search";
import { findByDateModifiedFile } from "../db/actions/findByDateModifiedFile";
import { createModifiedFile } from "../db/actions/createModifiedFile";
import { findByRangeDateModifiedFile } from "../db/actions/findByRangeDateModifiedFile";

export function useSearch() {
  const [modifiedFiles, setModifiedFiles] = useState<ModifiedFile[]>([]);
  const [searchedFiles, setSearchedFiles] = useState<ModifiedFile[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isError, setIsError] = useState<boolean>(false);

  async function makeSearch(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setIsLoading(true);
    setIsError(false);

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

    const dates = getDatesFromRange(new Date(start_date), new Date(end_date));
    for (const date of dates) {
      const entries = await findByDateModifiedFile(date);

      if (entries.length >= 1) {
        console.log("fetch db");
      } else {
        console.log("fetch api");
        const modifiedFiles = await fetchModifiedFiles(
          "doctolib",
          "doctolib",
          date.toISOString(),
          token?.toString() || ""
        );

        if (!modifiedFiles) {
          setIsError(true);
          return;
        }

        for (const file of modifiedFiles) {
          await createModifiedFile(file);
        }
      }
    }

    const files = await findByRangeDateModifiedFile(
      new Date(start_date),
      new Date(end_date)
    );

    setModifiedFiles(files);
    setIsLoading(false);
  }

  function refineSearch(event: React.ChangeEvent<HTMLInputElement>) {
    const { value } = event.target;
    const regex = new RegExp(value, "i"); // 'i' flag for case-insensitive matching
    setSearchedFiles(modifiedFiles.filter((file) => regex.test(file.filename)));
  }

  return {
    modifiedFiles,
    isLoading,
    isError,
    makeSearch,
    searchedFiles,
    refineSearch,
  };
}
