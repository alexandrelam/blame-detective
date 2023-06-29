import React, { createContext, useState } from "react";
import { ModifiedFile } from "../types";

type FetchContextType = {
  modifiedFiles: ModifiedFile[];
  setModifiedFiles: React.Dispatch<React.SetStateAction<ModifiedFile[]>>;
  searchedFiles: ModifiedFile[];
  setSearchedFiles: React.Dispatch<React.SetStateAction<ModifiedFile[]>>;
  isLoading: boolean;
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
  isError: boolean;
  setIsError: React.Dispatch<React.SetStateAction<boolean>>;
  totalCommitsToFetch: number;
  setTotalCommitsToFetch: React.Dispatch<React.SetStateAction<number>>;
  totalCommitsFetched: number;
  setTotalCommitsFetched: React.Dispatch<React.SetStateAction<number>>;
};

export const FetchContext = createContext<FetchContextType | null>(null);

export function FetchContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [modifiedFiles, setModifiedFiles] = useState<ModifiedFile[]>([]);
  const [searchedFiles, setSearchedFiles] = useState<ModifiedFile[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isError, setIsError] = useState<boolean>(false);
  const [totalCommitsToFetch, setTotalCommitsToFetch] = useState<number>(0);
  const [totalCommitsFetched, setTotalCommitsFetched] = useState<number>(0);

  const contextValue: FetchContextType = {
    modifiedFiles,
    setModifiedFiles,
    searchedFiles,
    setSearchedFiles,
    isLoading,
    setIsLoading,
    isError,
    setIsError,
    totalCommitsToFetch,
    setTotalCommitsToFetch,
    totalCommitsFetched,
    setTotalCommitsFetched,
  };

  return (
    <FetchContext.Provider value={contextValue}>
      {children}
    </FetchContext.Provider>
  );
}
