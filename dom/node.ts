namespace NNode {
  type TNodeList = Array<Node>;

  enum NodeType {
    None,
    Text,
    Comment,
    Element
  }

  interface INode {
    kind: NodeType;
    name: String;
    parent: INode;
    children: TNodeList;
  }
}
