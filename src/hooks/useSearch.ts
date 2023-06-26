import { useEffect, useState } from "react";
import { ModifiedFile } from "../types";
import { fetchModifiedFiles, getDatesFromRange } from "../utils/search";
import { findByDateModifiedFile } from "../db/actions/findByDateModifiedFile";
import { createModifiedFile } from "../db/actions/createModifiedFile";
import { findByRangeDateModifiedFile } from "../db/actions/findByRangeDateModifiedFile";
import { useTypedContext } from "./useTypedContext";
import { SearchContext } from "../Context/SearchContext";

export function useSearch() {
  const [modifiedFiles, setModifiedFiles] = useState<ModifiedFile[]>([]);
  const [searchedFiles, setSearchedFiles] = useState<ModifiedFile[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isError, setIsError] = useState<boolean>(false);

  const { searchQuery, searchFile, excludeFile } =
    useTypedContext(SearchContext);

  useEffect(() => {
    (async () => {
      const refinedSearch = await refineSearch();
      setSearchedFiles(refinedSearch);
    })();
  }, [searchFile, excludeFile, searchQuery]);

  function refineSearch(): Promise<ModifiedFile[]> {
    return new Promise((resolve) => {
      let refinedSearch: ModifiedFile[] = modifiedFiles;

      if (searchFile) {
        const regex = new RegExp(searchFile, "i"); // 'i' flag for case-insensitive matching
        refinedSearch = refinedSearch.filter((file) =>
          regex.test(file.filename)
        );
      }

      if (excludeFile) {
        const regex = new RegExp(excludeFile, "i"); // 'i' flag for case-insensitive matching
        refinedSearch = refinedSearch.filter(
          (file) => !regex.test(file.filename)
        );
      }

      if (searchQuery) {
        const regex = new RegExp(searchQuery, "i"); // 'i' flag for case-insensitive matching
        refinedSearch = refinedSearch.filter(
          (file) => !!file.patch && regex.test(file.patch)
        );
      }

      resolve(refinedSearch);
    });
  }

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
    const owner = localStorage.getItem("owner");
    const repo = localStorage.getItem("repo");

    if (!start_date || !end_date || !owner || !repo) {
      console.log("missing fields");
      console.log(start_date, end_date, owner, repo);
      return;
    }

    const dates = getDatesFromRange(new Date(start_date), new Date(end_date));
    for (const date of dates) {
      const entries = await findByDateModifiedFile(date, owner, repo);

      if (entries.length < 1) {
        try {
          const modifiedFiles = await fetchModifiedFiles(
            owner,
            repo,
            date.toISOString(),
            token?.toString() || ""
          );

          if (!modifiedFiles) {
            throw new Error("No modified files found");
          }

          for (const file of modifiedFiles) {
            await createModifiedFile(file);
          }
        } catch (error) {
          setIsError(true);
          setIsLoading(false);
          console.log(error);
          return;
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

  return {
    modifiedFiles,
    isLoading,
    isError,
    makeSearch,
    searchedFiles,
    refineSearch,
  };
}
