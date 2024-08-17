# STPD Calc
## Introduction
STPD Calc is a toy array-based, homoiconic calculator/language. All functions work on arrays. Language expressions are arrays.
Array literals are enclosed in parenthesis and list of tokens separated by whitespace. Array data in (...) evaluate to itseld, expressions (...)! are evaluated per token.
Basic types are numbers, strings (evaluate to themselves) and symbols (evaluate builtin or user expression). User expression evaluation introduces a new child environment.
Numbers support compound units (dimensions are not checked!!). Strings support "/." escape sequences (evals to " char).
## Examples
### Literals
Literals can be numbers, symbols, strings and arrays (quoted or evaluated).
```
1  ->  STACK: (1)
1.33e-3  ->  STACK: (0.001330)
10_kN  ->  STACK: (10000)
pi  ->  STACK: (3.142)
"hello world"  ->  STACK: ("hello world")
(1 2 (3 4) 5)  ->  STACK: ((1 2 (3 4) 5))
(1 2 +)!  ->  STACK: (3)
```
### Expressions
Expressions are arrays (STPD is a homoiconic language). Top level expressions does not need parenthesis and are always evaluated (1 2 3 is equivalent to (1 2 3)!).
```
1 2 3  ->  STACK: (1 2 3)
(1 2 3)  ->  STACK: ((1 2 3))
(1 2 3 +)!  ->  STACK: (1 2 3)
(1 2 3 (2 2 +)! 5)  ->  STACK: ((1 2 3 4 5))
```
### Number functions
```
1 2 + 4 - 5 * 6 /  ->  STACK: (-0.8333)
10 2 ^  ->  STACK: (100)
rand rand rand  ->  STACK: (0.7405 0.2817 0.2961)
15 prec pi  ->  STACK: (3.14159265358979)
pi sin  ->  STACK: (1.225e-16)
e logn  ->  STACK: (1)
```
These are all implemented functions: neg, inv, abs, ceil, floor, rand, round, sign, trunc, +, -, *, /, ^, rem, acos, acosh, asin, asinh, atan, atanh, cbrt, cos, cosh, exp, logn, log10, log2, sin, sinh, sqrt, tan, tanh.
### Booleans and comparison
```
100 not  ->  STACK: (0)
0 not  ->  STACK: (1)
1 0 and 0 not or  ->  STACK: (1)
3 2 =  ->  STACK: (0)
0.2 0.1 + 0.3 =  ->  STACK: (0)
1 2 <=  ->  STACK: (1)
```
Comparison functions are =, >, <, >=, <=
### Strings
```
"hello " "world!" str/join  ->  STACK: ("hello world!")
" a \'quoted\' text" prints  ->  a "quoted" text  ->  STACK: ()
```
### Symbols
```
```
### Arrays
```
```
### Programming
```
(1 2  ->  Error: Parsing error. Token 2. Missing )
1 0 /  ->  Error: Evaluation error. Symbol /. Arg must not be 0
0 +  ->  Error: Evaluation error. Symbol +. Stack length <2
```
