export namespace NDom {
  type TNodeList = Array<Node>;
  type TNodeLikeList = Array<INodeLike>;

  enum NodeType {
    None,
    Text,
    Comment,
    Element
  }

  interface INode {
    type: NodeType;
    name: string;
    parent: INodeLike;
    children: TNodeLikeList;
  }

  export interface INodeLike {
    getParent(): INodeLike;
    setParent<T extends INodeLike>(parent: T): void;
    getChildren(): TNodeLikeList;
    isEmptyChildren(): boolean;
    appendChild<T extends INodeLike>(newChild: T): T;
    getName(): string;
  }

  export class Node implements INodeLike {
    constructor(private node: INode) {}

    appendChild<T extends INodeLike>(newChild: T): T {
      this.node.children.push(newChild);
      newChild.setParent(this);
      return newChild;
    }

    getChildren(): TNodeLikeList {
      return this.node.children;
    }

    getParent(): INodeLike {
      return this.node.parent;
    }

    setParent<T extends INodeLike>(parent: T): void {
      this.node.parent = parent;
    }

    getName(): string {
      return this.node.name;
    }

    isEmptyChildren(): boolean {
      return this.node.children.length === 0;
    }
  }

  export class NodeFactory {
    private static new(): INode {
      return {
        type: NodeType.None,
        name: ``,
        children: [],
        parent: new Node(<INode>{})
      };
    }

    public static newElement(name: string): Node {
      return new Node({
        ...NodeFactory.new(),
        type: NodeType.Text,
        name
      });
    }
  }

  export class TreePrinter {
    static bottomUp(node: NDom.INodeLike, level: number = 1): void {
      if (!node.getParent()) return;

      console.log(Array(level).join("\t"), node.getName());
      return TreePrinter.bottomUp(node.getParent(), level + 1);
    }

    static topBottom(node: NDom.INodeLike, level: number = 1): void {
      console.log(Array(level).join("\t"), node.getName());

      if (node.isEmptyChildren()) return;

      for (const child of node.getChildren()) {
        TreePrinter.topBottom(child, level + 1);
      }
    }
  }
}
