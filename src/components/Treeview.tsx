import React, { SyntheticEvent, useState } from "react";
import { TreeNode, TreeProps } from "../types";
import { IOpenFolder } from "./icons/IOpenFolder";
import { ICloseFolder } from "./icons/ICloseFolder";
import { IChevronDown } from "./icons/IChevronDown";
import { IChevronRight } from "./icons/IChevronRight";

export function TreeView({
  title,
  children,
}: {
  title: string;
  children?: React.ReactNode;
}) {
  const [isOpen, setIsOpen] = useState(true);

  const handleToggle = (event: SyntheticEvent) => {
    event.preventDefault();
    setIsOpen(!isOpen);
  };

  return (
    <details
      className="relative collapse cursor-pointer text-base-content"
      open={isOpen}
    >
      <summary className="p-0.5" onClick={handleToggle}>
        <div className="flex items-center gap-1">
          {isOpen ? (
            <>
              <IChevronDown />
              <IOpenFolder />
            </>
          ) : (
            <>
              <IChevronRight />
              <ICloseFolder />
            </>
          )}
          <span>{title}</span>
        </div>
      </summary>
      <span className="w-0.5 h-full bg-neutral-content absolute left-1.5 top-7"></span>
      {!!children && <div className="pl-3">{children}</div>}
    </details>
  );
}

function TreeNodeComponent({
  node,
  selectedFilename,
  setSelectedFilename,
}: {
  node: TreeNode;
  selectedFilename: string | null;
  setSelectedFilename: React.Dispatch<React.SetStateAction<string | null>>;
}) {
  if (!node.children) {
    return (
      <button
        className={`block ${
          selectedFilename === node.fullPath
            ? "text-primary font-medium"
            : "text-secondary"
        }`}
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
            selectedFilename={selectedFilename}
            setSelectedFilename={setSelectedFilename}
          />
        ))}
      </ul>
    </TreeView>
  );
}

export function Tree({
  tree,
  selectedFilename,
  setSelectedFilename,
}: TreeProps) {
  return (
    <ul>
      {tree.children?.map((child) => (
        <TreeNodeComponent
          key={child.name}
          node={child}
          selectedFilename={selectedFilename}
          setSelectedFilename={setSelectedFilename}
        />
      ))}
    </ul>
  );
}
