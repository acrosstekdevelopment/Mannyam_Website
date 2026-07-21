const fs = require('fs');
const path = require('path');

const htmlPath = path.join(__dirname, '../../Building Blocks/Manyam frontend.html');
const html = fs.readFileSync(htmlPath, 'utf8');

// Find the start of FAQ_JOURNAL
const start1 = html.indexOf('const FAQ_JOURNAL={');
const start2 = html.indexOf('const FAQ_HOME=[');
const start3 = html.indexOf('const FAQ_CAT={');
const start4 = html.indexOf('const FAQ_DEST={');

let jsCode = '';
if (start1 !== -1) {
  let end1 = html.indexOf('const FAQ_HOME=[', start1);
  if (end1 === -1) end1 = html.indexOf(';', start1) + 1;
  jsCode += html.substring(start1, end1) + '\n';
}

if (start2 !== -1) {
  let end2 = html.indexOf('const FAQ_CAT={', start2);
  jsCode += html.substring(start2, end2) + '\n';
}

if (start3 !== -1) {
  let end3 = html.indexOf('const FAQ_DEST={', start3);
  if (end3 === -1) end3 = html.indexOf(';', start3) + 1;
  else end3 = html.indexOf(';', end3) + 1;
  jsCode += html.substring(start3, end3) + '\n';
}

fs.writeFileSync(path.join(__dirname, 'extracted_faqs.js'), jsCode);
console.log("Successfully extracted specific faqs to extracted_faqs.js");
