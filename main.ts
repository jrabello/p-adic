import { NDom } from "./dom/node";

function main() {
    const html: NDom.INodeLike = NDom.NodeFactory.newElement("html");
    const body: NDom.INodeLike = NDom.NodeFactory.newElement("body");
    const div: NDom.INodeLike = NDom.NodeFactory.newElement("div");
    const div2: NDom.INodeLike = NDom.NodeFactory.newElement("div");

    html.appendChild(body);
    body.appendChild(div);
    body.appendChild(div2);

    NDom.TreePrinter.bottomUp(div); 
    NDom.TreePrinter.topBottom(html);
}

main()
