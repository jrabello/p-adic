export namespace ndom {
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
        value: string;
        parent: INodeLike;
        children: TNodeLikeList;
    }

    interface INodeParent {
        getChildren(): TNodeLikeList;
        isEmptyChildren(): boolean;
        appendChild<T extends INodeLike>(newChild: T): T;
    }

    interface INodeChild {
        getParent(): INodeLike;
        setParent<T extends INodeLike>(parent: T): void;
    }

    export interface INodeLike extends INodeChild, INodeParent {
        getValue(): string;
    }

    class Node implements INodeLike {
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

        getValue(): string {
            return this.node.value;
        }

        isEmptyChildren(): boolean {
            return this.node.children.length === 0;
        }
    }

    export class NodeFactory {
        private static new(): INode {
            return {
                type: NodeType.None,
                value: ``,
                children: [],
                parent: new Node(<INode>{})
            };
        }

        static newElement(value: string): INodeLike {
            return new Node({
                ...NodeFactory.new(),
                value,
                type: NodeType.Element,
            })
        }
    
        static newText(value: string): INodeLike {
            return new Node({
                ...NodeFactory.new(),
                value,
                type: NodeType.Text,
            });
        }
    }
}
