import { useEffect } from "react";
import { ModifiedFile } from "../types";
import {
  getDatesFromRange,
  useFetchModifiedFiles,
} from "./useFetchModifiedFiles";
import { findByDateModifiedFile } from "../db/actions/findByDateModifiedFile";
import { useTypedContext } from "./useTypedContext";
import { SearchContext } from "../Context/SearchContext";
import { FetchContext } from "../Context/FetchContext";
import { findByRangeDateModifiedFile } from "../db/actions/findByRangeDateModifiedFile";

export function useSearch() {
  const {
    modifiedFiles,
    setModifiedFiles,
    searchedFiles,
    setSearchedFiles,
    isLoading,
    setIsLoading,
    isError,
    setIsError,
    setTotalCommitsFetched,
    setTotalCommitsToFetch,
  } = useTypedContext(FetchContext);

  const { searchQuery, searchFile, excludeFile } =
    useTypedContext(SearchContext);

  const { fetchModifiedFiles } = useFetchModifiedFiles();

  useEffect(() => {
    (async () => {
      const refinedSearch = await refineSearch();
      setSearchedFiles(refinedSearch);
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
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

    try {
      const dates = getDatesFromRange(new Date(start_date), new Date(end_date));
      for (const date of dates) {
        const entries = await findByDateModifiedFile(date, owner, repo);

        if (entries.length < 1) {
          await fetchModifiedFiles(
            owner,
            repo,
            date.toISOString(),
            token?.toString() || ""
          );
        } else {
          const files = await findByRangeDateModifiedFile(
            new Date(start_date),
            new Date(end_date)
          );

          setModifiedFiles(files);
          setIsLoading(false);
        }
      }
    } catch (error) {
      setIsError(true);
      console.log(error);
    }

    setIsLoading(false);
    setTotalCommitsFetched(0);
    setTotalCommitsToFetch(0);
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
