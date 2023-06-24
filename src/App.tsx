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

export const TabContext = createContext<TabContextType | null>(null);

function App() {
  const [tab, setTab] = useState<"search" | "settings">("search");
  const { isDBReady } = useIndexedDB();

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
        <NavBar tab={tab} setTab={setTab} />
        {tab === "search" ? <SearchPage /> : <SettingsPage />}
      </TabContext.Provider>
    </GlobalLayout>
  );
}

export default App;

