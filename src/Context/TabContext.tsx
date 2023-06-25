import React, { createContext } from "react";

type TabContextType = {
  tab: "search" | "settings";
  setTab: React.Dispatch<React.SetStateAction<"search" | "settings">>;
};

export const TabContext = createContext<TabContextType | null>(null);

export function TabContextProvider({
  tab,
  setTab,
  children,
}: {
  tab: "search" | "settings";
  setTab: React.Dispatch<React.SetStateAction<"search" | "settings">>;
  children: React.ReactNode;
}) {
  const contextValue: TabContextType = {
    tab,
    setTab,
  };

  return (
    <TabContext.Provider value={contextValue}>{children}</TabContext.Provider>
  );
}
