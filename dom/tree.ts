import { ndom } from "./node";

export namespace ntree {
    export class TreePrinter {
        private static indentingChar = " ";

        private static getIndentation(level: number): string {
            return Array(level).join(TreePrinter.indentingChar);
        }

        static bottomUp(node: ndom.INodeLike, level: number = 1): void {
            if (!node.getParent()) return;
            console.log(
                TreePrinter.getIndentation(level), 
                node.getValue());
            return TreePrinter.bottomUp(node.getParent(), level + 1);
        }

        static topBottom(node: ndom.INodeLike, level: number = 1): void {
            console.log(
                TreePrinter.getIndentation(level), 
                node.getValue());

            if (node.isEmptyChildren()) return;

            for (const child of node.getChildren()) {
                TreePrinter.topBottom(child, level + 1);
            }
        }
    }
}
