let AST;
let button;
let osc;

function preload() {
  AST = loadJSON('../ast.json');
  console.log(AST);
}

function setup() {
  noCanvas();
  button = createButton('RUN CODE');
  button.mousePressed(function () {
    let arr = [];
    for (let i = 0; i < AST['0'].values.length; i++) {
      arr.push(AST['0'].values[i]);
    }
    transpile(arr);
  });
}

function draw() {}

function transpile(code) {
  console.log('RUNNING CODE!');
  let timer = code[0][2] * 100;
  if (code.length > 0) {
    osc = new p5.Oscillator(code[0][0]);
    osc.freq(code[0][1]);
    osc.start();
    setTimeout(function () {
      osc.stop();
      // let next = code.shift();
      // transpile(next);
    }, timer);
  } else {
  }
}



text -> lexer -> tokens -> nearley /grammar -> AST abstract syntax tree -> transpiler -> javascript