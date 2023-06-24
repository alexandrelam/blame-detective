import { createContext, useState } from "react";
import { GlobalLayout } from "./components/layouts/GlobalLayout";
import { NavBar } from "./components/navbar/Navbar";
import { SettingsPage } from "./components/pages/SettingsPage";
import { SearchPage } from "./components/pages/SearchPage";
import { useIndexedDB } from "./db/useIndexedDB";

type TabContextType = {
  tab: "search" | "settings";
  setTab: React.Dispatch<React.SetStateAction<"search" | "settings">>;
};

type SearchContextType = {
  searchQuery: string;
  setSearchQuery: React.Dispatch<React.SetStateAction<string>>;
  searchFile: string;
  setSearchFile: React.Dispatch<React.SetStateAction<string>>;
  excludeFile: string;
  setExcludeFile: React.Dispatch<React.SetStateAction<string>>;
};

export const TabContext = createContext<TabContextType | null>(null);
export const SearchContext = createContext<SearchContextType | null>(null);

function App() {
  const [tab, setTab] = useState<"search" | "settings">("search");
  const { isDBReady } = useIndexedDB();

  const [searchQuery, setSearchQuery] = useState<string>("");
  const [searchFile, setSearchFile] = useState<string>("");
  const [excludeFile, setExcludeFile] = useState<string>("");

  if (!isDBReady) {
    return;
  }

  return (
    <GlobalLayout>
      <TabContext.Provider
        value={{
          tab: tab,
          setTab: setTab,
        }}
      >
        <SearchContext.Provider
          value={{
            searchQuery: searchQuery,
            setSearchQuery: setSearchQuery,
            searchFile: searchFile,
            setSearchFile: setSearchFile,
            excludeFile: excludeFile,
            setExcludeFile: setExcludeFile,
          }}
        >
          <NavBar tab={tab} setTab={setTab} />
          {tab === "search" ? <SearchPage /> : <SettingsPage />}
        </SearchContext.Provider>
      </TabContext.Provider>
    </GlobalLayout>
  );
}

export default App;

