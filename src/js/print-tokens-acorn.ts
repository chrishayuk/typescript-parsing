import { tokenizer } from "acorn";
import fs from 'fs';
import util from 'util';

function mapTokenType(acornType) {
    switch (acornType) {
        case 'name': return 'Identifier';
        case 'num': return 'Numeric';
        case 'string': return 'String';
        case 'eof': return 'EOF';
        case 'regexp': return 'RegularExpression';
        // Add more cases as needed
        default: 
            if (acornType.keyword) {
                return 'Keyword';
            }
            return 'Punctuator';
    }
}

try {
    // Read the contents of the file synchronously
    const code = fs.readFileSync('./samples/fibonacci.js', 'utf8');

    // Create a tokenizer instance
    const tokenIterator = tokenizer(code);

    // Collect and format tokens
    const tokens = [];
    for (let token of tokenIterator) {
        tokens.push({
            type: mapTokenType(token.type.label),
            value: code.slice(token.start, token.end),
            start: token.start,
            end: token.end
        });
    }

    // Custom inspection options for util.inspect
    const options = {
        depth: null,
        colors: true,
        maxArrayLength: null,
        compact: false
    };

    // Log the tokens using util.inspect
    console.log(util.inspect(tokens, options));
} catch (error) {
    console.error('Error reading file or tokenizing:', error);
}
