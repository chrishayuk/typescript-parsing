import * as escodegen from "escodegen";

// generate some javascript
const result = escodegen.generate({
    type: 'BinaryExpression',
    operator: '-',
    left: { type: 'Literal', value: 25 },
    right: { type: 'Literal', value: 5 }
});

// print it
console.log(result);