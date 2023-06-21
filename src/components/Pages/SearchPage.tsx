import { useSearch } from "../../hooks/useSearch";
import { PageLayout } from "../layouts/PageLayout";
import { Tree } from "../Treeview";
import { buildTree } from "../../utils/tree";
import { useState } from "react";
import ReactDiffViewer, { DiffMethod } from "react-diff-viewer";
import { extractGitDiffLines } from "../../utils/extractGitDiffLines";

export function SearchPage() {
  const { makeSearch, isLoading, modifiedFiles, searchedFiles, refineSearch } =
    useSearch();
  const [selectedFilename, setSelectedFilename] = useState<string | null>(null);

  const { addedLines, removedLines } = extractGitDiffLines(
    modifiedFiles.find((file) => file.filename === selectedFilename)?.patch ||
      ""
  );

  const files = searchedFiles.length ? searchedFiles : modifiedFiles;
  const paths = files.map((file) => file.filename);
  const tree = buildTree(paths);

  return (
    <PageLayout title="Search">
      <div className="flex gap-2 h-full">
        <div className="w-96 border-r">
          {isLoading ? (
            <span>loading</span>
          ) : (
            <Tree tree={tree} setSelectedFilename={setSelectedFilename} />
          )}
        </div>
        <div className="flex flex-col gap-2 flex-grow">
          <form className="flex items-center join" onSubmit={makeSearch}>
            <input
              id="filepath"
              name="filepath"
              type="text"
              placeholder="Search /file/path..."
              className="input input-bordered flex-grow join-item"
              onChange={refineSearch}
            />
            <input
              id="start_date"
              name="start_date"
              type="date"
              className="input input-bordered join-item"
            />
            <input
              id="end_date"
              name="end_date"
              type="date"
              className="input input-bordered join-item"
            />
            <button className="btn btn-primary join-item" type="submit">
              Search
            </button>
          </form>
          <div className="flex-grow">
            <ReactDiffViewer
              oldValue={addedLines}
              newValue={removedLines}
              splitView={false}
              compareMethod={DiffMethod.WORDS}
            />
          </div>
        </div>
      </div>
    </PageLayout>
  );
}
