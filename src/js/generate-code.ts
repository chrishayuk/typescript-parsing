import * as espree from "espree";
import recast from 'recast';
import fs from 'fs';
import util from 'util';

try {
    // Read the contents of the file synchronously
    const code = fs.readFileSync('./samples/fibonacci.js', 'utf8');

    // parse the code into ast
    const ast = espree.parse(code, {
        ecmaVersion: 2020,
        sourceType: "module"
    });

    // Custom inspection options for util.inspect
    const options = {
        depth: null,
        colors: true,
        maxArrayLength: null
    };

    // Log the AST using util.inspect
    console.log(util.inspect(ast, options));

    // Modify the AST - Change the function namE
    recast.visit(ast, {
        // Change the function declaration
        visitFunctionDeclaration(path) {
            if (path.node.id && path.node.id.name === 'fibonacci') {
                path.node.id.name = 'fib';
            }
            this.traverse(path);
        },

        // Update all calls to the function
        visitCallExpression(path) {
            if (path.node.callee.name === 'fibonacci') {
                path.node.callee.name = 'fib';
            }
            this.traverse(path);
        }
    });

    // Regenerate the code from the modified AST
    const generatedCode = recast.print(ast).code;

    // output the code
    console.log(generatedCode);
} catch (error) {
    console.error('Error:', error);
}
