# @{%
# const moo = require("moo");

# const lexer = moo.compile({
#   ws:     /[ \t]+/,
#   number: /[0-9]+/,
#   word: { match: /[a-z]+/, type: moo.keywords({ times: "x", read: "read", write: "write" }), },
#   times:  /\*/,
#   arrow: /->/, 
# });
# %}

# # Pass your lexer object using the @lexer option:
# @lexer lexer


# # expr -> multiplication {% id %} | trig {% id %} | log {% id %}
# log -> %number %ws %arrow {% ([x, , ]) => console.log(globals) %}
# statement -> write {% d => d[0] %}
# write -> %write %ws %word %ws %number {% () => 10 %} 
# read -> %read %ws %word {% d => (console.log(globals[d[2]])) %}
# # Use %token to match any token of that type instead of "token":
# multiplication -> %number %ws %times %ws %number {% ([first, , , , second]) => first * second %}

# # Literal strings now match tokens with that text:
# trig -> "sin" %ws %number {% ([, , x]) => Math.sin(x) %}

# drone++
# Lexer [or tokenizer] definition with language lexemes [or tokens]

@{%

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
%}

# Pass your lexer object using the @lexer option
@lexer lexer

# Grammar definition in the Extended Backus Naur Form (EBNF)
main -> _ Statements _
{%
  function(d){ return { type: 'playnote', values: d[1] } }
%}

Statements -> Statement {% (d) => [d[0]] %} | Statement _ Statements {% (d) => [d[0], d[2]] %}

Statement -> Waveform __ %number __ time {% function(d){ return [d[0].type, parseInt(d[2].value), d[4].value.length] } %} 

Waveform -> %sine {% id %} | %saw {% id %} | %square {% id %}


# Whitespace
_  -> wschar:* {% d => null %}
__ -> wschar:+ {% d => null %}
wschar -> %ws {% id %}

time -> %time {% id %} | %time time 






