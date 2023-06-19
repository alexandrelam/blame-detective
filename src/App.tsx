import { useState } from "react";
import { GlobalLayout } from "./components/Layout/GlobalLayout";
import { NavBar } from "./components/Navbar/Navbar";
import { SettingsPage } from "./components/Pages/SettingsPage";
import { SearchPage } from "./components/Pages/SearchPage";

function App() {
  const [tab, setTab] = useState<"search" | "settings">("search");
  return (
    <GlobalLayout>
      <NavBar tab={tab} setTab={setTab} />
      {tab === "search" ? <SearchPage /> : <SettingsPage />}
    </GlobalLayout>
  );
}

export default App;

