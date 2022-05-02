// Generated automatically by nearley, version 2.20.1
// http://github.com/Hardmath123/nearley
(function () {
function id(x) { return x[0]; }


  const moo = require("moo");
  const lexer = moo.compile({
    // Write the Regular Expressions for your tokens here  
    number: /-?(?:[0-9]|[1-9][0-9]+)(?:\.[0-9]+)?\b/,
    time: /\++/,
    separator: /,/,
    ws: { match: /\s+/, lineBreaks: true },
    word: { match: /[a-z~\[\]\^]+/, type: moo.keywords({ sine: "~", saw: "^", square: "[]" }), },
    endline: /;/
  });
var grammar = {
    Lexer: lexer,
    ParserRules: [
    {"name": "main", "symbols": ["_", "Statements", "_"], "postprocess": 
        function(d){ return { type: 'playnote', values: d[1] } }
        },
    {"name": "Statements", "symbols": ["Statement"], "postprocess": (d) => [d[0]]},
    {"name": "Statements", "symbols": ["Statement", "_", "Statements"], "postprocess": (d) => [d[0], d[2]]},
    {"name": "Statement", "symbols": ["Waveform", "__", (lexer.has("number") ? {type: "number"} : number), "__", "time"], "postprocess": function(d){ return [d[0].type, parseInt(d[2].value), d[4].value.length] }},
    {"name": "Waveform", "symbols": [(lexer.has("sine") ? {type: "sine"} : sine)], "postprocess": id},
    {"name": "Waveform", "symbols": [(lexer.has("saw") ? {type: "saw"} : saw)], "postprocess": id},
    {"name": "Waveform", "symbols": [(lexer.has("square") ? {type: "square"} : square)], "postprocess": id},
    {"name": "_$ebnf$1", "symbols": []},
    {"name": "_$ebnf$1", "symbols": ["_$ebnf$1", "wschar"], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "_", "symbols": ["_$ebnf$1"], "postprocess": d => null},
    {"name": "__$ebnf$1", "symbols": ["wschar"]},
    {"name": "__$ebnf$1", "symbols": ["__$ebnf$1", "wschar"], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "__", "symbols": ["__$ebnf$1"], "postprocess": d => null},
    {"name": "wschar", "symbols": [(lexer.has("ws") ? {type: "ws"} : ws)], "postprocess": id},
    {"name": "time", "symbols": [(lexer.has("time") ? {type: "time"} : time)], "postprocess": id},
    {"name": "time", "symbols": [(lexer.has("time") ? {type: "time"} : time), "time"]}
]
  , ParserStart: "main"
}
if (typeof module !== 'undefined'&& typeof module.exports !== 'undefined') {
   module.exports = grammar;
} else {
   window.grammar = grammar;
}
})();
