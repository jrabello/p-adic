import { ndom } from "./dom/node";
import { ntree } from "./dom/tree";

function main() {
    const html: ndom.INodeLike = ndom.NodeFactory.newElement("html");
    const body: ndom.INodeLike = ndom.NodeFactory.newElement("body");
    const div:  ndom.INodeLike = ndom.NodeFactory.newElement("div");
    const div2: ndom.INodeLike = ndom.NodeFactory.newElement("div");
    const text: ndom.INodeLike = ndom.NodeFactory.newText("hello world!!!");
    
    html.appendChild(body);
    body.appendChild(div);
    body.appendChild(div2);
    div2.appendChild(text);
    
    ntree.TreePrinter.bottomUp(div2); 
    ntree.TreePrinter.topBottom(html);
}

main()
