import ts from "typescript";

// read the function
const file = "./samples/fibonacci.ts";

// visits the code
function visit(node: ts.Node) {
    if (ts.isFunctionDeclaration(node)) {
        console.log(node.name?.text);
      for (const param of node.parameters) {
        console.log(param.name.text);
      }
    }

    // loop around
    node.forEachChild(visit);
}

let program = ts.createProgram([file], { allowJs: true });
const sourceFile = program.getSourceFile(file);

const printer = ts.createPrinter({ newLine: ts.NewLineKind.LineFeed });

// if (sourceFile){
//     console.log(printer.printFile(sourceFile));

//     ts.forEachChild(sourceFile, node => {
//         const result = printer.printNode(ts.EmitHint.Unspecified, node, sourceFile);
//         console.log(result);
//     });

//     console.log(JSON.stringify(sourceFile, null, 2));
// }

if (sourceFile){
    //ts.forEachChild(sourceFile, node => {
     //   const result = printer.printNode(ts.EmitHint.Unspecified, node, sourceFile);
     //console.log(JSON.stringify(sourceFile, null, 2));
     visit(sourceFile);
   // });
}