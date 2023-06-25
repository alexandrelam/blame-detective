import { useSearch } from "../../hooks/useSearch";
import { PageLayout } from "../layouts/PageLayout";
import { Tree } from "../Treeview";
import { buildTree } from "../../utils/tree";
import { useState } from "react";
import ReactDiffViewer, { DiffMethod } from "react-diff-viewer";
import { extractGitDiffLines } from "../../utils/extractGitDiffLines";
import { BobLoader } from "../BobLoader";
import { SearchForm } from "../SearchForm";
import { findLineNumber } from "../../utils/highlightInSearch";
import { useTypedContext } from "../../hooks/useTypedContext";
import { SearchContext } from "../../Context/SearchContext";

export function SearchPage() {
  const { makeSearch, isLoading, modifiedFiles, searchedFiles } = useSearch();
  const [selectedFilename, setSelectedFilename] = useState<string | null>(null);
  const { searchQuery } = useTypedContext(SearchContext);

  const selectedFile = modifiedFiles.find(
    (file) => file.filename === selectedFilename
  );

  const { addedLines, removedLines } = extractGitDiffLines(
    selectedFile?.patch || ""
  );

  const highlightAddedLines = findLineNumber(
    "addedLines",
    addedLines,
    searchQuery
  );

  const highlightRemovedLines = findLineNumber(
    "removedLines",
    removedLines,
    searchQuery
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
        <div className="flex flex-col gap-2 flex-1 h-full-custom overflow-y-scroll">
          <SearchForm makeSearch={makeSearch} modifiedFiles={modifiedFiles} />
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
                    className="link-primary-content text-sm"
                    href={selectedFile.author_html_url}
                  >
                    {selectedFile.author_login}
                  </a>
                </div>
                <div>
                  <a
                    className="link text-sm text-primary-content"
                    target="_blank"
                    href={selectedFile.html_url}
                  >
                    {selectedFile.sha}
                  </a>
                </div>
              </div>
            )}
            <div className="flex-grow text-xs leading-none! rounded-xl overflow-hidden">
              {!isLoading && !!selectedFile && (
                <ReactDiffViewer
                  oldValue={removedLines}
                  newValue={addedLines}
                  compareMethod={DiffMethod.WORDS}
                  highlightLines={[
                    ...highlightAddedLines,
                    ...highlightRemovedLines,
                  ]}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </PageLayout>
  );
}
