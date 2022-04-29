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
    transpile(AST['0']);
  });
}

function draw() {}

function transpile(code) {
  console.log('RUNNING CODE!');
  if (code.type === 'playnote') {
    osc = new p5.Oscillator(code.values[0]);
    osc.freq(code.values[1]);
    osc.start();
    setTimeout(function () {
      osc.stop();
      osc.disconnect();
    }, code.values[2] * 100);
  }
}
