const nearley = require('nearley');
const grammar = require('./grammar.js');
const fs = require('fs');

// Create a Parser object from our grammar.
let parser = new nearley.Parser(nearley.Grammar.fromCompiled(grammar));
let workingCode;

process.stdin.on('data', data => {
  console.log(`You typed ${data.toString()}`);
  if (data.toString() === 'reset\n') {
    parser = new nearley.Parser(nearley.Grammar.fromCompiled(grammar));
    console.log('starting fresh!');
  } else {
    parse(data.toString());
  }
});

const parse = str => {
  // Parse something!
  try {
    parser.feed(str);
    workingCode = JSON.stringify(parser.results);
    fs.writeFile('ast.json', workingCode, err => {
      if (err) throw err;
      console.log('Data written to file');
    });
  } catch (parseError) {
    console.log('Error at character ' + parseError.offset); // "Error at character 9"
  }
};
