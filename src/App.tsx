import { GlobalLayout } from "./components/layouts/GlobalLayout";
import { NavBar } from "./components/navbar/Navbar";
import { SettingsPage } from "./components/pages/SettingsPage";
import { SearchPage } from "./components/pages/SearchPage";
import { useIndexedDB } from "./db/useIndexedDB";
import { TabContextProvider } from "./Context/TabContext";
import { SearchContextProvider } from "./Context/SearchContext";
import { useState } from "react";
import { FetchContextProvider } from "./Context/FetchContext";

function App() {
  const { isDBReady } = useIndexedDB();
  const [tab, setTab] = useState<"search" | "settings">("search");

  if (!isDBReady) {
    return;
  }

  return (
    <GlobalLayout>
      <TabContextProvider tab={tab} setTab={setTab}>
        <SearchContextProvider>
          <FetchContextProvider>
            <NavBar tab={tab} setTab={setTab} />
            {tab === "search" ? <SearchPage /> : <SettingsPage />}
          </FetchContextProvider>
        </SearchContextProvider>
      </TabContextProvider>
    </GlobalLayout>
  );
}

export default App;

