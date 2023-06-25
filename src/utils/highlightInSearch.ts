function formatLines(
  type: "addedLines" | "removedLines",
  lines: number[]
): string[] {
  if (type === "addedLines") {
    return lines.map((line) => `R-${line}`);
  } else {
    return lines.map((line) => `L-${line}`);
  }
}

export function findLineNumber(
  type: "addedLines" | "removedLines",
  lines: string,
  searchQuery: string
): string[] {
  try {
    if (!searchQuery) return [];

    const regex = new RegExp(searchQuery, "i");
    const arrayLines = lines.split("\n");
    const lineNumbers: number[] = [];

    arrayLines.forEach((line, index) => {
      if (regex.test(line)) {
        lineNumbers.push(index + 1); // Adding 1 to index to match line number
      }
    });

    const formattedLineNumbers = formatLines(type, lineNumbers);

    return formattedLineNumbers;
  } catch (error) {
    console.error(error);
    return [];
  }
}
