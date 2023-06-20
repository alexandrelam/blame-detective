export function TreeView({
  title,
  children,
}: {
  title: string;
  children?: React.ReactNode;
}) {
  return (
    <details className="collapse cursor-pointer text-base-content" open>
      <summary className="p-0.5">{title}</summary>
      {!!children && <div className="pl-2">{children}</div>}
    </details>
  );
}

interface TreeNode {
  name: string;
  children?: TreeNode[];
}

export function buildTree(paths: string[]): TreeNode {
  const root: TreeNode = { name: "" };

  for (const path of paths) {
    const segments = path.split("/").filter((segment) => segment !== "");

    let currentNode = root;
    for (const segment of segments) {
      let childNode = currentNode.children?.find(
        (node) => node.name === segment
      );

      if (!childNode) {
        childNode = { name: segment };
        currentNode.children = currentNode.children || [];
        currentNode.children.push(childNode);
      }

      currentNode = childNode;
    }
  }

  return root;
}

interface TreeProps {
  tree: TreeNode;
}

function TreeNodeComponent({ node }: { node: TreeNode }) {
  if (!node.children) {
    return <li>{node.name}</li>;
  }

  return (
    <TreeView title={node.name}>
      <ul>
        {node.children.map((child) => (
          <TreeNodeComponent key={child.name} node={child} />
        ))}
      </ul>
    </TreeView>
  );
}

export function Tree({ tree }: TreeProps) {
  return (
    <ul>
      {tree.children?.map((child) => (
        <TreeNodeComponent key={child.name} node={child} />
      ))}
    </ul>
  );
}
