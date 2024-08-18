# STPD language

## Introduction

STPD is a toy minimalistic programming language for scientific calculations. Its main characteristics are: 
- stack RPN based (no PEMDAS and parenthesis needed);
- array oriented (most functions automatically works on arrays);
- homoiconicity (language expressions are written as arrays);
- support for quick units of measurement conversion.

An STPD array literal is a list of tokens separated by whitespace and enclosed in parenthesis. Arrays can represent data (evaluate to themselves) or expressions (each token is evaluated with reference to the stack). Tokens can be numbers, strings or symbols (references to expressions). Expressions are evaluated with reference to the global environment (symbol definitions object). User defined expression are evaluated in a new child environment (i.e. new definitions inside them are local to themselves).

## Data types

Data types are numbers, strings and symbols (each maps to the corresponding Javascript data type). Numbers and strings always evaluate to themselves and are pushed on the stack. Number literals with units suffix are converted to corresponding SI value (unit is not preserved and dimensions are not checked!!!). Compound units, with numerator and denominator, are supported.

Symbols evaluate:
- in data arrays, to themselves and pushed on stack;
- in expressions, to builtin function excecution or user defined expression evaluation.

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

## Arithmetic and scientific functions

Numbers uses Javascript number type (double precision 64bit float), so give attention to inexact representation and comparison. 

These are all implemented functions: neg, inv, abs, ceil, floor, rand, round, sign, trunc, +, -, *, /, ^, rem, acos, acosh, asin, asinh, atan, atanh, cbrt, cos, cosh, exp, logn, log10, log2, sin, sinh, sqrt, tan, tanh.

```
1 2 + 4 - 5 * 6 /  ->  STACK: (-0.8333)
10 2 ^  ->  STACK: (100)
rand rand rand  ->  STACK: (0.7405 0.2817 0.2961)
e logn  ->  STACK: (1)
pi sin  ->  STACK: (1.225e-16)
0.2 0.1 + 0.3 -  ->  STACK: (5.551e-17)
```

## Unit conversion

Units are specified in number literals with a _xxx suffix. Number literals with units suffix are converted to corresponding SI value (unit is not preserved and dimensions are not checked!!!). Compound units, with numerator and denominator, are supported. Use the "units" function to get all the available units and corresponding conversion factors in an array.

These are all implemented functions: units, toUnit, toSI.

```
10_mm2  ->  STACK: (0.00001000)
10 (cm) toUnit  ->  STACK: (1000)
10_m (cm) toUnit  ->  STACK: (1000)
10000_mm (cm) toUnit  ->  STACK: (1000)
1000 (cm) toSI  ->  STACK: (10)
units "kN" assoc  ->  STACK: (1000)
```

## Booleans and comparison

False value is represented by number 0, every other value is a True value. Boolean functions are and, or, not. Comparison functions are =, >, <, >=, <=.

```
100 not  ->  STACK: (0)
0 not  ->  STACK: (1)
1 0 and 0 not or  ->  STACK: (1)
3 2 =  ->  STACK: (0)
0.2 0.1 + 0.3 =  ->  STACK: (0)
1 2 <=  ->  STACK: (1)
```

## Strings

Strings uses Javascript string type and are 1-indexed. String literals cannot contain the " character. Strings can be converte to STPD programs and symbols parsing them with the str/parse and str/tosymbol functions.

These are all implemented functions: str/length, str/join, str/slice, str/uppercase, str/lowercase, str/findchar, str/parse, str/tosymbol.
```
"123456789" 2 5 str/slice  ->  STACK: ("345")
"hello " "world!" str/join  ->  STACK: ("hello world!")
"1 2 + hi" str/parse  ->  STACK: ((1 2 + hi))
```

## Symbols and environments

Symbols uses Javascript symbol type. They represent references to builtin-functions/expressions in the global environment (inside top-level expression) or local environment (inside user defined expression evaluation). Symbols not found in local environment are searched in parent environment up to global environment.

A symbol in an expression can be pushed on stack (without its evaluation) using the str/tosymbol function. Conversely a symbol can be converted into a string with the symb/tostring function.

```
"hi" str/tosymbol  ->  STACK: (hi)
"hi" str/tosymbol symb/tostring  ->  STACK: ("hi")
```

## Stack management

Top level expressions and are evaluated on the stack. Nested expressions use the parent array as stack. 

Stack elements can be manipulated using these functions: pop swap dup over rot stack. 

```
1 2 3 pop swap  ->  STACK: (2 1)
1 2 dup  ->  STACK: (1 2 2)
1 2 3 over  ->  STACK: (1 2 3 2)
1 2 3 rot rot  ->  STACK: (3 1 2)
(1 2 (3 4)! 5 6)  ->  STACK: ((1 2 3 4 5 6))
(1 2 +)!  ->  STACK: (3)
(1 2 3 (2 2 +)! 5)  ->  STACK: ((1 2 3 4 5))
```

## Arrays

Arrays can represent data (...) or expression (...)!. and are 1-indexed.

Data arrays can be used to represent lists, dictionaries (list of key value pairs) and quoted (unevaluated) expressions.

Expressions represent STPD programs. Top level expressions does not need parenthesis (i.e. 1 2 3 is equivalent to (1 2 3)!).

These are all implemented functions: iota, ones, zeros, get, slice, join, map, map2, filt, reduce, length, sort, reverse, find, assoc, apush, apop.

```
1 2 3  ->  STACK: (1 2 3)
1 2 +  ->  STACK: (1 2 3)
(1 2 (3 4))  ->  STACK: ((1 2 (3 4)))
4 iota  ->  STACK: ((1 2 3 4))
4 ones  ->  STACK: ((1 1 1 1))
(a b c) 2 get  ->  STACK: (b)
(a b c d) 2 3 slice  ->  STACK: ((b c))
(1 2 3 4) (1 +) map  ->  STACK: ((2 3 4 5))
(1 2 3) (10 10 10) (+) map2  ->  STACK: ((11 12 13))
(1 4 6 8) (2 >=) filter  ->  STACK: ((4 6 8))
(1 2 3) (+) reduce  ->  STACK: (6)
("a" 1 "b" 2 "c" 100) "c" assoc  ->  STACK: (100)
("a" 1 "b" 2 "c" 100) ("a" "c" ) assoc  ->  STACK: (1 100)
```

## Programming

STPD programs are evaluated at every expression modification (stack and environments are reset each time).

Errors in parsing and evaluating the program are printed, stopping the evaluation. The function err throws a generic error (also stopping the evaluation).

Comments can be emulated using strings and the # function (same a pop function).

To define new variables (returned unevaluated) and functions (returned as evaluated expression) the var and fun functions can be used.

Quoted expressions (data arrays) can be conditionally executed using the cond function and repeatedly executed using the loop function.

```
err  ->  Error: Evaluation error. Symbol err. Generic error
(1 2  ->  Error: Parsing error. Token 2. Missing )
1 0 /  ->  Error: Evaluation error. Symbol /. Arg must not be 0
0 +  ->  Error: Evaluation error. Symbol +. Stack length <2
"This is a comment"#  ->  STACK: ()
(1 2 +) (mydata) var mydata  ->  STACK: ((1 2 +))
(1 2 +) (myfun) fun myfun  ->  STACK: (3)
0 (1 2 +) cond  ->  STACK: ()
1 (1 2 +) cond  ->  STACK: (3)
(5 2 +) 3 loop  ->  STACK: (7 7 7)
```

## User interface

The prec function sets the display digit precision of numbers.

Use the print and printn functions to print data literals. Use the prints and printsn functions to print a string (without quotes) also replacing the "/." sequence with the " char.

```
15 prec pi  ->  STACK: (3.14159265358979)
"hello world" printn "ciao" print  ->  "hello world" "ciao" 
                                      STACK: ()
"hello world" printn "ciao" print ->  "hello world"
                                      "ciao" 
                                      STACK: ()
"hello world" prints -> hello world 
                        STACK: ()
```

## Some examples

### Variables and functions

### Conditionals

### Using arrays

