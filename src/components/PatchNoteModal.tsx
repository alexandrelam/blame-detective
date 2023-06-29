import { useEffect } from "react";
import { CURRENT_VERSION } from "../app_version";
import { PatchNoteEntry } from "./PatchNoteEntry";
import { Separator } from "./Separator";

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
        <PatchNoteEntry
          title="V0.3 Shadowflame"
          releaseDate="June 29, 2023"
          features={
            <>
              <li>
                Implemented a GitHub API next reset time feature, displaying the
                time in a human-readable format instead of a Unix timestamp.
              </li>
              <li>
                Added a "Clear Cache Database" button, allowing users to easily
                delete cached data.
              </li>
              <li>
                Enhanced user experience by introducing a loading progress bar,
                making long loading times more tolerable.
              </li>
            </>
          }
          bugFixes={
            <>
              <li>
                Resolved an issue where only the first 30 commits were fetched.
                The app now fetches all commits as intended.
              </li>
              <li>
                Ensured that all required parameters are necessary for launching
                the app. The GitHub token is now mandatory.
              </li>
              <li>
                Improved error handling by displaying an error banner when a
                fetch operation fails.
              </li>
              <li>
                Enhanced the settings page functionality by disabling the form
                if the owner, repository, or token fields are left unfilled.
              </li>
            </>
          }
        />
        <Separator />
        <PatchNoteEntry
          title="V0.2 Hextech Protobelt-01"
          releaseDate="June 25, 2023"
          features={
            <>
              <li>
                Git Diff Enhancements: We have added a highly requested feature
                that allows you to easily navigate and analyze changes in your
                Git repositories. When performing a regex text search, the app
                now highlights the lines in the Git diff that match your search
                criteria. This makes it even more convenient to track specific
                changes within your codebase.
              </li>
              <li>
                Stay Up-to-Date: We understand the importance of keeping our
                users informed about new releases and exciting updates. To
                achieve this, we have introduced a new patch note component.
                This component will provide you with timely information about
                the latest features, improvements, and bug fixes in each
                release. Now, you can stay up to date with the app's progress
                and never miss out on any important announcements.
              </li>
              <li>
                Improved Calendar Input Validation: Our calendar feature now
                includes enhanced validation to ensure accurate and logical date
                selection. We have implemented a validation mechanism that
                prevents users from choosing a second date that falls in the
                past. This enhancement eliminates any confusion or unintended
                selections, making the calendar input more intuitive and
                error-free.
              </li>
            </>
          }
          bugFixes={
            <>
              <li>
                Default Theme Stability: We have addressed an issue that caused
                the default theme to malfunction when launching the app for the
                first time. The bug has been fixed, ensuring a seamless and
                visually pleasing experience right from the start.
              </li>
              <li>
                React Icons Warning Resolved: We have resolved a warning related
                to the usage of icons in React. This fix eliminates any
                potential issues or conflicts that may have occurred, resulting
                in a smoother and error-free app performance.
              </li>
              <li>
                Improved Context Organization: In our ongoing efforts to improve
                code structure and maintainability, we have moved the context to
                their own dedicated folder. This reorganization enhances the
                clarity and organization of the app's architecture, making it
                easier for developers to navigate and maintain the codebase.
              </li>
            </>
          }
        />
        <Separator />
        <PatchNoteEntry
          title="V0.1 Nashor's tooth"
          releaseDate="June 24, 2023"
          features={
            <>
              <li>
                File Modification History: You can now view all files that have
                been modified within a specified range of dates. This powerful
                functionality aids in debugging and tracking down the source of
                bugs more effectively.
              </li>
              <li>
                Enhanced Search Capabilities: The search feature has been
                expanded to allow you to find specific text within files.
                Additionally, you can include or exclude files using regular
                expressions, providing greater control over the search results.
              </li>
              <li>
                GitHub Integration: Blame Detective now integrates with GitHub,
                allowing you to search for files within a specified date range
                directly from your GitHub repositories.
              </li>
              <li>
                Customizable Themes: Personalize your Blame Detective experience
                by selecting from a range of themes. Choose a theme that suits
                your preferences and enhances your workflow.
              </li>
              <li>
                File Tree View: The app now features a file tree view, enabling
                you to navigate and explore your project's file structure more
                intuitively. This hierarchical representation enhances your
                understanding of the codebase and assists in locating specific
                files.
              </li>
              <li>
                Git Diffs: View detailed Git diffs within Blame Detective,
                providing a clear overview of changes made to files. This
                functionality helps you track modifications and identify
                potential causes of bugs more efficiently.
              </li>
            </>
          }
          bugFixes={
            <>
              <li>
                Bug Fixes and Improvements: Various bug fixes and performance
                enhancements to ensure a smoother and more reliable user
                experience. We hope these new features and improvements enhance
                your debugging process and streamline your workflow with Blame
                Detective. If you have any feedback or suggestions, please don't
                hesitate to reach out to us. Happy debugging!
              </li>
            </>
          }
        />
      </form>
      <form method="dialog" className="modal-backdrop">
        <button>close</button>
      </form>
    </dialog>
  );
}
