import * as espree from "espree";
import fs from 'fs';
import util from 'util';

try {
    // Read the contents of the file synchronously
    const code = fs.readFileSync('./samples/fibonacci.js', 'utf8');

    // Parse the contents using Espree
    const ast = espree.parse(code, {ecmaVersion: 2022}); 

    // Custom inspection options for util.inspect
    const options = {
        depth: null,
        colors: true,
        maxArrayLength: null
    };

    // Log the AST using util.inspect
    console.log(util.inspect(ast, options));
} catch (error) {
    console.error('Error reading or parsing file:', error);
}
