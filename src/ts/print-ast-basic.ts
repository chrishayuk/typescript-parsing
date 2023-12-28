import ts from "typescript";

function printNodeDetails(node: ts.Node, indent: string = ''): void {
  console.log(`${indent}Node Kind: ${ts.SyntaxKind[node.kind]}`);

  // Check for and print the name or text of the node, if available
  if (ts.isIdentifier(node) || ts.isLiteralExpression(node)) {
    console.log(`${indent}Text: ${node.text}`);
  } else if (ts.isParameter(node)) {
    // For parameters, print their name
    console.log(`${indent}Parameter Name: ${node.name.text}`);
  }

  // Optionally, log more properties here if needed

  // Recursively print child nodes
  ts.forEachChild(node, child => {
    printNodeDetails(child, indent + '  ');
  });
}

function printASTOfSourceFile(filePath: string): void {
  const program = ts.createProgram([filePath], { allowJs: true });
  const sourceFile = program.getSourceFile(filePath);

  if (!sourceFile) {
    console.error(`File not found or unable to read: ${filePath}`);
    return;
  }

  printNodeDetails(sourceFile);
}

// Example usage
const file = "./samples/fibonacci.ts";
printASTOfSourceFile(file);
