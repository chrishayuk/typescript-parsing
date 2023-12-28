import ts from "typescript";

function serializeNode(node: ts.Node, seen: WeakSet<object>): any {
    const jsonNode: any = {};
    const propertiesToExclude = new Set(['flags', 'modifierFlagsCache', 'transformFlags', 'parent']);

    Object.keys(node).forEach(key => {
        if (propertiesToExclude.has(key)) {
            // Skip irrelevant or internal properties
            return;
        }

        const value = (node as any)[key];
        if (typeof value === 'object' && value !== null) {
            if (seen.has(value)) {
                // Omit circular reference
                jsonNode[key] = '[Circular]';
            } else {
                seen.add(value);
                jsonNode[key] = serializeNode(value, seen);
            }
        } else {
            jsonNode[key] = value;
        }
    });

    // Replace 'kind' number with its string representation
    if (jsonNode.kind !== undefined) {
        jsonNode.kind = ts.SyntaxKind[jsonNode.kind];
    }

    return jsonNode;
}

function convertNodeToJson(node: ts.Node): any {
    const seen = new WeakSet<object>();
    return serializeNode(node, seen);
}

function getASTAsJSON(filePath: string): object {
    const program = ts.createProgram([filePath], { allowJs: true });
    const sourceFile = program.getSourceFile(filePath);

    if (!sourceFile) {
        throw new Error(`File not found or unable to read: ${filePath}`);
    }

    return convertNodeToJson(sourceFile);
}

// Example usage
const file = "./samples/fibonacci.ts";
const astAsJson = getASTAsJSON(file);
console.log(JSON.stringify(astAsJson, null, 2));
