type Props = {
  tab: "search" | "settings";
  setTab: React.Dispatch<React.SetStateAction<"search" | "settings">>;
};

export function NavBar({ tab, setTab }: Props) {
  return (
    <div className="py-6 border-b flex justify-between items-center">
      <h1
        className="font-bold text-2xl text-primary cursor-pointer"
        onClick={() => setTab("search")}
      >
        🕵️ &nbsp; GitHunt
      </h1>
      <div className="tabs tabs-boxed">
        <a
          className={`tab ${tab === "search" && "tab-active"}`}
          onClick={() => setTab("search")}
        >
          Search
        </a>
        <a
          className={`tab ${tab === "settings" && "tab-active"}`}
          onClick={() => setTab("settings")}
        >
          Settings
        </a>
      </div>
    </div>
  );
}
