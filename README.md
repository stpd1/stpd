# STPD Calc
## Introduction
Array-based, homoiconic calculator/programming language. All functions work on arrays. Language expressions are arrays.
Array literals are enclosed in parenthesis and list of tokens separated by whitespace. Array data in (...) evaluate to itseld, expressions (...)! are evaluated per token.
Basic types are numbers, strings (evaluate to themselves) and symbols (evaluate builtin or user expression). User expression evaluation introduces a new child environment.
Numbers support compound units (dimensions are not checked!!). Strings support "/." escape sequences (evals to " char).
## Examples
### Literals
```
1  =>  STACK: (1)
1.33e-3  =>  STACK: (0.001330)
10_kN  =>  STACK: (10000)
pi  =>  STACK: (3.142)
"hello world"  =>  STACK: ("hello world")
(1 2 (3 4) 5)  =>  STACK: ((1 2 (3 4) 5))
```
### Expressions
```
(this is a quoted expression == array)  =>  STACK: ((this is a quoted expression == array))
```
### Math functions
```
```
### Booleans
```
```
### Strings
```
"hi, this is a \'quoted\' text" prints  =>  hi, this is a "quoted" text  =>  STACK: ()
```
### Symbols
```
```
### Arrays
```
```
### Programming
```
```
