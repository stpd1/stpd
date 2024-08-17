# STPD Calc
## Introduction
STPD is a toy minimalistic programming language for engineering calculations. Its main characteristics are: 
- array-oriented (most functions broadcast on arrays);
- homoiconicity (language expressions are written as arrays);
- support for quick units of measurement conversion.
Array literals are enclosed in parenthesis and list of tokens separated by whitespace. Array data in (...) evaluate to itseld, expressions (...)! are evaluated per token.
Basic types are numbers, strings (evaluate to themselves) and symbols (evaluate builtin or user expression). User expression evaluation introduces a new child environment.

## Examples
### Data types
Data types are numbers, symbols, strings and arrays (quoted () or evaluated ()!). They map to corresponding Javascript data types.
Number literals with units suffix are parsed to corresponding SI value. Compound units are supported but dimensions are not checked!!!. 
```
1  ->  STACK: (1)
1.33e-3  ->  STACK: (0.001330)
10_kN  ->  STACK: (10000)
10_kgf/cm2  ->  STACK: (9.807e+5)
pi  ->  STACK: (3.142)
"hello world"  ->  STACK: ("hello world")
(1 2 (3 4) 5)  ->  STACK: ((1 2 (3 4) 5))
(1 2 +)!  ->  STACK: (3)
```
### Expressions
Expressions are arrays (STPD is homoiconic). Top level expressions does not need parenthesis and are always evaluated (i.e. 1 2 3 is equivalent to (1 2 3)!). Expressions can be quoted (evaluate to themselves) or evaluated
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
### Unit conversion
```
```
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
String printing replaces the "/." sequence with the " char.
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
