// main.js
import { add } from './math';
import { createHash } from 'crypto';

const result = add(5, 10);
console.log("The sum is:", result);

// Creating a hash of the result
const hash = createHash('sha256').update(String(result)).digest('hex');
console.log("Hash of the sum:", hash);