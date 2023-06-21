export const extractGitDiffLines = (
  diffString: string
): {
  addedLines: string;
  removedLines: string;
} => {
  let addedLines = "";
  let removedLines = "";

  const lines = diffString.split("\n");
  for (const line of lines) {
    const trimmedLine = line.trim();

    if (trimmedLine.startsWith("+")) {
      addedLines += trimmedLine.slice(1) + "\n";
    } else if (trimmedLine.startsWith("-")) {
      removedLines += trimmedLine.slice(1) + "\n";
    } else {
      addedLines += trimmedLine + "\n";
      removedLines += trimmedLine + "\n";
    }
  }

  return { addedLines, removedLines };
};
