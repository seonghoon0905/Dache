const fs = require('fs');
const path = 'c:\\Users\\Seonghoon\\Desktop\\Seonghoon\\Dev\\MainProjects\\DaChe\\script.js';
let code = fs.readFileSync(path, 'utf8');

// Fix the double backslash in regex literals
code = code.split("([.,!?~;:\"'\\\\s]|$)").join("([.,!?~;:\"'\\s]|$)");

// Fix the new RegExp string parameters
code = code.split("(\\\\.|\\\\?|!| |$)").join("([.,!?~;:\"'\\\\s]|$)");

// Let's also fix the ones in replace functions
code = code.split("(\\\\.\|\\\\?\|!\| \|$)").join("([.,!?~;:\"'\\\\s]|$)");

fs.writeFileSync(path, code);
console.log("Fixed regex formatting.");
