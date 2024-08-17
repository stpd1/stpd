# STPD language
## Introduction
STPD is a toy minimalistic programming language for engineering calculations. Its main characteristics are: 
- stack RPN based (no PEMDAS and parenthesis needed);
- array oriented (most functions automatically works on arrays);
- homoiconicity (language expressions are written as arrays);
- support for quick units of measurement conversion.
An STPD array literal is a list of tokens separated by whitespace and enclosed in parenthesis. Arrays can represent data (evaluate to themselves) or expressions (each token is evaluated with reference to the stack). Tokens can be numbers, strings or symbols (references to expressions). Expressions are evaluated with reference to the global environment (symbol definitions object). User defined expression are evaluated in a new child environment (i.e. new definitions inside them are local to themselves).
## Examples
### Data types
Data types are numbers, strings and symbols (each maps to the corresponding Javascript data type). Numbers and strings always evaluate to themselves and are pushed on the stack. 
Number literals with units suffix are converted to corresponding SI value (unit is not preserved and dimensions are not checked!!!). Compound units, with numerator and denominator, are supported.
Symbols evaluate:
- to themselves and are pushed on the stack in data arrays;
- to builtin function excecution or user defined expression evaluation in expression arrays.

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
### Arrays
Arrays can represent data (...) or expression (...)!.
Data arrays can be used as lists and dictionaries (list of key value pairs).
Top level expressions does not need parenthesis (i.e. 1 2 3 is equivalent to (1 2 3)!) and are evaluated on the stack. Nested expressions use the parent array as stack. 
```
1 2 3  ->  STACK: (1 2 3)
1 2 +  ->  STACK: (1 2 3)
(1 2 (3 4))  ->  STACK: ((1 2 (3 4)))
(1 2 +)!  ->  STACK: (3)
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
