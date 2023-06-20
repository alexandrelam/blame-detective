import { useState } from "react";
import { GlobalLayout } from "./components/layouts/GlobalLayout";
import { NavBar } from "./components/navbar/Navbar";
import { SettingsPage } from "./components/pages/SettingsPage";
import { SearchPage } from "./components/pages/SearchPage";

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

