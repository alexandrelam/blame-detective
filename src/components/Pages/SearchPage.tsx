import { useSearch } from "../../hooks/useSearch";
import { PageLayout } from "../layouts/PageLayout";
import { Tree } from "../Treeview";
import { buildTree } from "../../utils/tree";
import { useState } from "react";
import ReactDiffViewer, { DiffMethod } from "react-diff-viewer";
import { extractGitDiffLines } from "../../utils/extractGitDiffLines";
import { BobLoader } from "../BobLoader";

export function SearchPage() {
  const { makeSearch, isLoading, modifiedFiles, searchedFiles, refineSearch } =
    useSearch();
  const [selectedFilename, setSelectedFilename] = useState<string | null>(null);

  const selectedFile = modifiedFiles.find(
    (file) => file.filename === selectedFilename
  );

  const { addedLines, removedLines } = extractGitDiffLines(
    selectedFile?.patch || ""
  );

  const files = searchedFiles.length ? searchedFiles : modifiedFiles;
  const paths = files.map((file) => file.filename);
  const tree = buildTree(paths);

  return (
    <PageLayout title="Search">
      <div className="flex gap-2 h-full-custom">
        <div className="w-96 border-r overflow-y-scroll">
          {!isLoading && (
            <Tree
              tree={tree}
              selectedFilename={selectedFilename}
              setSelectedFilename={setSelectedFilename}
            />
          )}
        </div>
        <div className="flex flex-col gap-2 flex-grow h-full-custom overflow-y-scroll">
          <form className="flex items-center join" onSubmit={makeSearch}>
            <input
              id="filepath"
              name="filepath"
              type="text"
              placeholder="/^regex\/path$/i"
              className="input input-bordered flex-grow join-item"
              onChange={refineSearch}
              disabled={modifiedFiles.length === 0}
            />
            <input
              id="start_date"
              name="start_date"
              type="date"
              required
              className="input input-bordered join-item"
            />
            <input
              id="end_date"
              name="end_date"
              type="date"
              required
              className="input input-bordered join-item"
            />
            <button className="btn btn-primary join-item" type="submit">
              Search
            </button>
          </form>
          <div>
            {isLoading && <BobLoader />}
            {!!selectedFile && !isLoading && (
              <div className="p-2 rounded-xl bg-secondary/20 flex justify-between items-center mb-2">
                <div className="flex items-center">
                  <img
                    src={selectedFile.author_avatar_url}
                    alt="author profile image"
                    className="w-6 h-6 rounded-full inline-block mr-2"
                  />
                  <a
                    className="link-neutral text-sm"
                    href={selectedFile.author_html_url}
                  >
                    {selectedFile.author_login}
                  </a>
                </div>
                <div>
                  <a
                    className="link text-sm text-neutral"
                    target="_blank"
                    href={selectedFile.html_url}
                  >
                    {selectedFile.sha}
                  </a>
                </div>
              </div>
            )}
            <div className="flex-grow text-xs leading-none! rounded-xl overflow-hidden">
              <ReactDiffViewer
                oldValue={removedLines}
                newValue={addedLines}
                splitView={false}
                compareMethod={DiffMethod.WORDS}
              />
            </div>
          </div>
        </div>
      </div>
    </PageLayout>
  );
}
