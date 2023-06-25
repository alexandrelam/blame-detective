import { CURRENT_VERSION } from "../../app_version";
import { PatchNoteModal } from "../PatchNoteModal";
import { ThemePicker } from "./ThemePicker";

type Props = {
  tab: "search" | "settings";
  setTab: React.Dispatch<React.SetStateAction<"search" | "settings">>;
};

export function NavBar({ tab, setTab }: Props) {
  const patchNoteVersion = localStorage.getItem("patchNoteVersion");

  return (
    <div className="py-6 border-b flex justify-between items-center">
      <PatchNoteModal />
      <div
        className="flex gap-2 cursor-pointer items-center"
        onClick={() => setTab("search")}
      >
        <img
          src="detective.png"
          alt="moving detective microsft emoji"
          className="w-12 h-12"
        />
        <div>
          <h1 className="font-bold text-2xl text-primary">
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
      <div className="flex items-center join">
        <ThemePicker />
        <div className="indicator">
          {(!patchNoteVersion || patchNoteVersion !== CURRENT_VERSION) && (
            <span className="indicator-item indicator-center badge badge-secondary">
              new
            </span>
          )}

          <button
            className="btn join-item"
            onClick={() => {
              window.patch_note_modal.showModal();
              localStorage.setItem("patchNoteVersion", CURRENT_VERSION);
            }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 7.5h1.5m-1.5 3h1.5m-7.5 3h7.5m-7.5 3h7.5m3-9h3.375c.621 0 1.125.504 1.125 1.125V18a2.25 2.25 0 01-2.25 2.25M16.5 7.5V18a2.25 2.25 0 002.25 2.25M16.5 7.5V4.875c0-.621-.504-1.125-1.125-1.125H4.125C3.504 3.75 3 4.254 3 4.875V18a2.25 2.25 0 002.25 2.25h13.5M6 7.5h3v3H6v-3z"
              />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}
