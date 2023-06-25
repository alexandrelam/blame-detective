import { useEffect } from "react";
import { CURRENT_VERSION } from "../app_version";

export function PatchNoteModal() {
  useEffect(() => {
    window.patch_note_modal = document.getElementById(
      "patch_note_modal"
    ) as HTMLDialogElement;

    const patchNoteVersion = localStorage.getItem("patchNoteVersion");

    if (!patchNoteVersion || patchNoteVersion !== CURRENT_VERSION) {
      window.patch_note_modal.showModal();
      localStorage.setItem("patchNoteVersion", CURRENT_VERSION);
    }
  }, []);

  return (
    <dialog id="patch_note_modal" className="modal">
      <form method="dialog" className="modal-box p-10 h-[80vh]">
        <h2 className="font-bold text-xl text-primary-content">
          Patch Note 🚀
        </h2>
        <h3 className="font-medium text-lg mt-4 text-primary-content">
          V0.1 Nashor's tooth
        </h3>
        <span className="text-sm -mt-1 text-base-content block">
          Release Date: June 24, 2023
        </span>
        <h4 className="font-bold mt-2 text-secondary-content">New ✨</h4>
        <ul className="list-decimal mx-5 text-secondary-content">
          <li>
            File Modification History: You can now view all files that have been
            modified within a specified range of dates. This powerful
            functionality aids in debugging and tracking down the source of bugs
            more effectively.
          </li>
          <li>
            Enhanced Search Capabilities: The search feature has been expanded
            to allow you to find specific text within files. Additionally, you
            can include or exclude files using regular expressions, providing
            greater control over the search results.
          </li>
          <li>
            GitHub Integration: Blame Detective now integrates with GitHub,
            allowing you to search for files within a specified date range
            directly from your GitHub repositories.
          </li>
          <li>
            Customizable Themes: Personalize your Blame Detective experience by
            selecting from a range of themes. Choose a theme that suits your
            preferences and enhances your workflow.
          </li>
          <li>
            File Tree View: The app now features a file tree view, enabling you
            to navigate and explore your project's file structure more
            intuitively. This hierarchical representation enhances your
            understanding of the codebase and assists in locating specific
            files.
          </li>
          <li>
            Git Diffs: View detailed Git diffs within Blame Detective, providing
            a clear overview of changes made to files. This functionality helps
            you track modifications and identify potential causes of bugs more
            efficiently.
          </li>
        </ul>

        <h4 className="font-bold mt-2 text-secondary-content">Bug fix 🐛</h4>
        <ul className="list-decimal mx-5 text-secondary-content">
          <li>
            Bug Fixes and Improvements: Various bug fixes and performance
            enhancements to ensure a smoother and more reliable user experience.
            We hope these new features and improvements enhance your debugging
            process and streamline your workflow with Blame Detective. If you
            have any feedback or suggestions, please don't hesitate to reach out
            to us. Happy debugging!
          </li>
        </ul>
      </form>
      <form method="dialog" className="modal-backdrop">
        <button>close</button>
      </form>
    </dialog>
  );
}
