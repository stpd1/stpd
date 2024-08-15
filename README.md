# STPD Calc

## 
Array-based language. All operators work on arrays. Language expressions are also arrays.
Array literals are enclosed in parenthesis and list of tokens separated by whitespace.
Basic types are numbers, strings (evaluate to themselves) and symbols (evaluate builtin or user expression). User expression evaluation introduces a new child environment.
Numbers support compound units (dimensions are not checked!!). Strings support "/." escape sequences (evals to " char).

# Examples
## Literals