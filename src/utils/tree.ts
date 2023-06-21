import { TreeNode } from "../../types";

export function buildTree(paths: string[]): TreeNode {
  const root: TreeNode = { name: "", fullPath: "" };

  for (const path of paths) {
    const segments = path.split("/").filter((segment) => segment !== "");

    let currentNode = root;
    for (const segment of segments) {
      let childNode = currentNode.children?.find(
        (node) => node.name === segment
      );

      if (!childNode) {
        childNode = { name: segment, fullPath: path };
        currentNode.children = currentNode.children || [];
        currentNode.children.push(childNode);
      }

      currentNode = childNode;
    }
  }

  return root;
}
