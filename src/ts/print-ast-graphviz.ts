import ts from "typescript";

function astToGraphviz(node: ts.Node, graph: string[] = [], nodeMap: Map<ts.Node, number> = new Map(), parentNodeId?: number): string {
    const nodeId = nodeMap.has(node) ? nodeMap.get(node) : nodeMap.set(node, nodeMap.size).size;
    let label = ts.SyntaxKind[node.kind];

    // Append text for certain node types to the label
    if (ts.isIdentifier(node) || ts.isLiteralExpression(node)) {
        label += ` [${node.text}]`;
    } else if (ts.isParameter(node) && node.name) {
        label += ` [Param: ${node.name.text}]`;
    }

    graph.push(`  node${nodeId} [label="${label}"];`);

    // Connect to parent node
    if (parentNodeId !== undefined) {
        graph.push(`  node${parentNodeId} -> node${nodeId};`);
    }

    ts.forEachChild(node, child => {
        astToGraphviz(child, graph, nodeMap, nodeId);
    });

    return graph.length === 0 ? '' : `digraph AST {\n${graph.join('\n')}\n}`;
}

function getASTAsGraphviz(filePath: string): string {
    const program = ts.createProgram([filePath], { allowJs: true });
    const sourceFile = program.getSourceFile(filePath);

    if (!sourceFile) {
        throw new Error(`File not found or unable to read: ${filePath}`);
    }

    return astToGraphviz(sourceFile);
}

// Example usage
const file = "./samples/fibonacci.ts";
//const file = "./samples/calculation.ts";
const graphvizOutput = getASTAsGraphviz(file);
console.log(graphvizOutput);
