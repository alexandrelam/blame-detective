import { TreeNode, TreeProps } from "../../types";

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
