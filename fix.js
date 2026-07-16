const fs = require('fs');
const path = 'c:\\Users\\Seonghoon\\Desktop\\Seonghoon\\Dev\\MainProjects\\DaChe\\script.js';
let code = fs.readFileSync(path, 'utf8');

// Replace the restrictive punctuation check with a more comprehensive one
code = code.split('(\\.\|\\?|!| |$)').join('([.,!?~;:"\'\\\\s]|$)');

fs.writeFileSync(path, code);
console.log('Fixed punctuation regex in script.js');
