import { ThemePicker } from "./ThemePicker";

type Props = {
  tab: "search" | "settings";
  setTab: React.Dispatch<React.SetStateAction<"search" | "settings">>;
};

export function NavBar({ tab, setTab }: Props) {
  return (
    <div className="py-6 border-b flex justify-between items-center">
      <div className="flex gap-2 items-center">
        <img
          src="/src/assets/detective.png"
          alt="moving detective microsft emoji"
          className="w-12 h-12"
        />
        <div>
          <h1
            className="font-bold text-2xl text-primary cursor-pointer"
            onClick={() => setTab("search")}
          >
            B<span className="italic text-secondary-focus font-serif">lam</span>
            e Detective
          </h1>
          <span className="text-sm text-base-content/70 block -mt-1">
            Empowering Developers to Track and Expose Code Alterations!
          </span>
        </div>
      </div>
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
      <ThemePicker />
    </div>
  );
}
