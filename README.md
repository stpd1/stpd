# STPD language

## Introduction

STPD is a toy programming language for scientific calculations. Its main characteristics are: 
- stack RPN based (no PEMDAS and parenthesis needed);
- array oriented (most functions automatically works on arrays);
- homoiconicity (language expressions are written as arrays data structures);
- support for quick (and dumb!) units of measurement conversion.

A STPD array literal is a list of tokens separated by whitespace and enclosed in parenthesis, ```(1 2 3 ...)```. Arrays can represent data (evaluate to themselves) or expressions (where each token is evaluated with reference to the stack). Tokens can be numbers (```-5.696_m/s2```, quantities converted to SI magnitudes), strings (```"hello world"```) or symbols (```myvar```, references to data defined in environment). Expressions are evaluated with reference to the global environment (an object with symbol/data pairs). Functions are user defined expressions and are evaluated in a new child environment (these definitions are local to the function environment).

The STPD app is [here](https://stpd1.github.io/stpd/). The STPD webpage is also a Progressive Web App, so you can install it on most devices ([see here for instructions](https://web.dev/learn/pwa/installation)).

## Data types

STPD data types include numbers, strings and symbols (each maps to the corresponding Javascript data type). Numbers and strings always evaluate to themselves and are pushed onto the stack. Number literals with a unit suffix are converted to corresponding SI value (WARNING: units are not preserved after conversion and dimensions are not checked!!!). Compound units, with numerator and denominator, are supported.

Symbols evaluate as follows:
- in data arrays, they evaluate to themselves and are pushed on stack;
- in expressions, they evaluate to a built-in function execution or the evaluation of user expressions (defined in environment evaluation).
Here are some examples:

```
1  ->  STACK: (1)
1.33e-3  ->  STACK: (0.001330)
10_kN  ->  STACK: (10000)
10_kgf/cm2  ->  STACK: (9.807e+5)
pi  ->  STACK: (3.142)
rand  ->  STACK: (0.4308)
"hello world"  ->  STACK: ("hello world")
(1 2 (3 4) 5)  ->  STACK: ((1 2 (3 4) 5))
(1 2 +)!  ->  STACK: (3)
```

## Arithmetic and scientific functions

Numbers uses Javascript number type (double precision 64bit float). WARNING: pay attention to inexact representation and floating-point comparison errors. 

These are the currently implemented functions: ```neg, inv, abs, ceil, floor, rand, round, sign, trunc, +, -, *, /, ^, rem, acos, acosh, asin, asinh, atan, atanh, cbrt, cos, cosh, exp, logn, log10, log2, sin, sinh, sqrt, tan, tanh```.

```
1 2 + 4 - 5 * 6 /  ->  STACK: (-0.8333)
10 2 ^  ->  STACK: (100)
rand rand rand  ->  STACK: (0.7405 0.2817 0.2961)
e logn  ->  STACK: (1)
pi sin  ->  STACK: (1.225e-16)  #WARNING 64BIT FLOAT NUMS
0.2 0.1 + 0.3 -  ->  STACK: (5.551e-17)  #WARNING 64BIT FLOAT NUMS
```

## Unit conversion

Units are specified in number literals with a ```_xxx``` suffix. Number literals with a unit suffix are converted to corresponding SI value (unit is not preserved and dimensions are not checked!!!). Compound units are supported. Use the "units" function to get all the available units and corresponding conversion factors in an array.

These are the currently implemented functions: ```units, toUnit, toSI```.

```
10_mm2  ->  STACK: (0.00001000)
10 (cm) toUnit  ->  STACK: (1000)
10_m (cm) toUnit  ->  STACK: (1000)
10000_mm (cm) toUnit  ->  STACK: (1000)
1000 (cm) toSI  ->  STACK: (10)
units "kN" assoc  ->  STACK: (1000)
1_m 1_s +  ->  STACK: (2)  #WARNING DIMS NOT CHECKED
```

## Booleans and comparison

The value 0 (number) represents the False value; any other value is considered True. Boolean functions include ```and, or, not```. Comparison functions include ```=, >, <, >=, <=```.

```
100 not  ->  STACK: (0)
0 not  ->  STACK: (1)
1 0 and 0 not or  ->  STACK: (1)
3 2 =  ->  STACK: (0)
0.2 0.1 + 0.3 =  ->  STACK: (0)
1 2 <=  ->  STACK: (1)
```

## Strings

Strings use the Javascript string type and are 1-indexed. String literals cannot contain the ```"``` character. Strings can be converted to STPD expressions and symbols by parsing them with the ```str/parse``` and ```str/tosymbol``` functions.

These are the currently implemented functions: ```str/length, str/join, str/slice, str/uppercase, str/lowercase, str/findchar, str/parse, str/tosymbol```.
```
"123456789" 2 5 str/slice  ->  STACK: ("345")
"hello " "world!" str/join  ->  STACK: ("hello world!")
"1 2 + hi" str/parse  ->  STACK: ((1 2 + hi))
```

## Symbols and environments

Symbols uses the Javascript symbol type. They represent references to builtin-functions or expressions in the global environment or local environment. If a symbol is not found in the local environment, STPD searches the parent environment, ascending to the global level.

A symbol in an expression can be pushed onto the stack (without evaluation) using the ```str/tosymbol``` function. Conversely, a symbol can be converted into a string with the ```symb/tostring``` function.

```
"hi" str/tosymbol  ->  STACK: (hi)
"hi" str/tosymbol symb/tostring  ->  STACK: ("hi")
```

## Arrays

Arrays can represent data (...) or expression (...)!. and they are 1-indexed.

Data arrays can be used for lists, dictionaries (list of key value pairs) and quoted (unevaluated) expressions.

Expressions also represents entire STPD programs. Top level expressions does not need parenthesis (e.g. ```1 2 3``` is equivalent to ```(1 2 3)!``` in a nested expression).

These are the currently implemented functions: ```iota, ones, zeros, get, slice, join, map, map2, filt, red, length, sort, reverse, find, assoc, apush, apop```.

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
(1 2 3) (+) red  ->  STACK: (6)
("a" 1 "b" 2 "c" 100) "c" assoc  ->  STACK: (100)
("a" 1 "b" 2 "c" 100) ("a" "c" ) assoc  ->  STACK: (1 100)
```


## Stack management

Top level expressions are evaluated on the stack. Nested expressions use the parent array as a stack (the result is pushed into the parent array at the nested expression's position). 

These are the currently implemented functions: ```pop swap dup over rot stack```. 

```
1 2 3 pop swap  ->  STACK: (2 1)
1 2 dup  ->  STACK: (1 2 2)
1 2 3 over  ->  STACK: (1 2 3 2)
1 2 3 rot rot  ->  STACK: (3 1 2)
(1 2 (3 4)! 5 6)  ->  STACK: ((1 2 3 4 5 6))
(1 2 +)!  ->  STACK: (3)
(1 2 3 (2 2 +)! 5)  ->  STACK: ((1 2 3 4 5))
```

## Programming

STPD programs are re-evaluated at every expression modification (the stack and environments are reset each time).

Parsing and evaluating errors stop excecution and print an error message. The ```err``` function throws a generic error.

Comments can be emulated using strings and the ```#``` function (same a ```pop``` function, see example below).

To define new variables (returned unevaluated) and functions (returned as evaluated expression) use the ```var``` and ```fun``` functions.

Quoted expressions (data arrays) can be conditionally executed using ```cond``` function and repeatedly executed using ```loop``` function.

```
err  ->  Error: Evaluation error. Symbol err. Generic error
(1 2  ->  Error: Parsing error. Token 2. Missing )
1 0 /  ->  Error: Evaluation error. Symbol /. Arg must not be 0
0 +  ->  Error: Evaluation error. Symbol +. Stack length <2
"# This is a comment "#  ->  STACK: ()
(1 2 +) (mydata) var mydata  ->  STACK: ((1 2 +))
(1 2 +) (myfun) fun myfun  ->  STACK: (3)
0 (1 2 +) cond  ->  STACK: ()
1 (1 2 +) cond  ->  STACK: (3)
(5 2 +) 3 loop  ->  STACK: (7 7 7)
```

## Document editing

...todo...

## User interface

The ```prec``` function sets the display digit precision of numbers.

Use ```print``` and ```printn``` to print data literals. Use ```prints``` and ```printsn``` to print a string (without quotes) also replacing the "/." sequence with the " char.

Use ```..``` to print the expression and its result.

```
15 prec pi  ->  STACK: (3.14159265358979)
"hello world" printn "ciao" print  ->  "hello world" "ciao" 
                                      STACK: ()
"hello world" printn "ciao" print ->  "hello world"
                                      "ciao" 
                                      STACK: ()
"hello world" prints -> hello world 
                        STACK: ()

(1 2 +) ..  ->  (1 2 +) -> 3
                STACK: ()
```

## Some examples

### Variables and functions

### Conditionals

### Using arrays

