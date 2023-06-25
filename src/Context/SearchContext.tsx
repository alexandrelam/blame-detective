import React, { createContext, useState } from "react";

type SearchContextType = {
  searchQuery: string;
  setSearchQuery: React.Dispatch<React.SetStateAction<string>>;
  searchFile: string;
  setSearchFile: React.Dispatch<React.SetStateAction<string>>;
  excludeFile: string;
  setExcludeFile: React.Dispatch<React.SetStateAction<string>>;
};

export const SearchContext = createContext<SearchContextType | null>(null);

export function SearchContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [searchFile, setSearchFile] = useState<string>("");
  const [excludeFile, setExcludeFile] = useState<string>("");

  const contextValue: SearchContextType = {
    searchQuery,
    setSearchQuery,
    searchFile,
    setSearchFile,
    excludeFile,
    setExcludeFile,
  };

  return (
    <SearchContext.Provider value={contextValue}>
      {children}
    </SearchContext.Provider>
  );
}
