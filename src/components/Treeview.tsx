import { TreeNode, TreeProps } from "../../types";
import { IFolder } from "./icons/IFolder";

export function TreeView({
  title,
  children,
}: {
  title: string;
  children?: React.ReactNode;
}) {
  return (
    <details className="collapse cursor-pointer text-base-content" open>
      <summary className="p-0.5">
        <div className="flex gap-1">
          <IFolder />
          <span>{title}</span>
        </div>
      </summary>
      {!!children && <div className="pl-2">{children}</div>}
    </details>
  );
}

function TreeNodeComponent({
  node,
  setSelectedFilename,
}: {
  node: TreeNode;
  setSelectedFilename: React.Dispatch<React.SetStateAction<string | null>>;
}) {
  if (!node.children) {
    return (
      <button
        className="text-secondary"
        onClick={() => setSelectedFilename(node.fullPath)}
      >
        {node.name}
      </button>
    );
  }

  return (
    <TreeView title={node.name}>
      <ul>
        {node.children.map((child) => (
          <TreeNodeComponent
            key={child.name}
            node={child}
            setSelectedFilename={setSelectedFilename}
          />
        ))}
      </ul>
    </TreeView>
  );
}

export function Tree({ tree, setSelectedFilename }: TreeProps) {
  return (
    <ul>
      {tree.children?.map((child) => (
        <TreeNodeComponent
          key={child.name}
          node={child}
          setSelectedFilename={setSelectedFilename}
        />
      ))}
    </ul>
  );
}