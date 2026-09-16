const fs = require('fs');
const text = `COPY     START   0
MAIN     LDA     ZERO
         LDL     ZERO`;

console.log("Original text:");
console.log(text);

const replaced = text.replace(/[^\S\r\n]{2,}/g, ' ');
console.log("\nReplaced text (regex /[^\S\r\n]{2,}/g):");
console.log(replaced);

const hex = Array.from(text).map(c => c.charCodeAt(0).toString(16)).join(' ');
console.log("\nHex:");
console.log(hex);

const replaced2 = text.replace(/[\s\u00A0]{2,}/g, ' ');
console.log("\nReplaced text 2 (regex /[\\s\\u00A0]{2,}/g):");
console.log(replaced2);

const replaced3 = text.replace(/[ \t\u00A0\u1680\u180E\u2000-\u200B\u202F\u205F\u3000\uFEFF]{2,}/g, ' ');
console.log("\nReplaced text 3:");
console.log(replaced3);

