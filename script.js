"use strict"
// ENVIRONMENT
let STK, ENV, FLAGS, UNITS = {
	// WARNING: Unit dimensions are not checked!
	"m": 1,"dm": 1e-1,"cm": 1e-2,"mm": 1e-3,"um": 1e-6,"nm": 1e-9,"dam": 1e1,"hm": 1e2,"km": 1e3,"Mm": 1e6,"Gm": 1e9,"in": 0.0254,"ft": 0.3048,"yd": 0.9144,"mi": 1609.344,"ly": 9460730472580800,"au": 149597870700,"pc": 30856775814671900, // length
	"g": 1e-3, "dg": 1e-4,"cg": 1e-5,"mg": 1e-6,"ug": 1e-9,"ng": 1e-12,"dag": 1e-2,"hg": 1e-1,"kg": 1,"Mg": 1e3,"Gg": 1e6,"q": 100,"t": 1000,"lb": 453.59/1000,"oz": 28.35/1000, // mass
	"s": 1,"min": 60,"h": 60*60,"d": 60*60*24, "w":60*60*24*7, "mo":60*60*24*7*30, "y":60*60*24*7*30*12,  // time
	"rad": 1, "deg": Math.PI/180, "grad": Math.PI/200, // plane angles
	"sr": 1, // solid angles
	"K": 1, // temperature (°C, K and °F builtin - see unit parser)
	"Hz": 1,"dHz": 1e-1,"cHz": 1e-2,"mHz": 1e-3,"uHz": 1e-6,"nHz": 1e-9,"daHz": 1e1,"hHz": 1e2,"kHz": 1e3,"MHz": 1e6,"GHz": 1e9, // frequency
	"l": 0.001, "dl": 0.001*1e-1,"cl": 0.001*1e-2,"ml": 0.001*1e-3,"ul": 0.001*1e-6,"nl": 0.001*1e-9,"dal": 0.001*1e1,"hl": 0.001*1e2,"kl": 0.001*1e3,"Ml": 0.001*1e6,"Gls": 0.001*1e9, "gal":3.785411784, "pint":0.56826125, // volume
	"N": 1,"dN": 1e-1,"cN": 1e-2,"mN": 1e-3,"uN": 1e-6,"nN": 1e-9,"daN": 1e1,"hN": 1e2,"kN": 1e3,"MN": 1e6,"GN": 1e9,"kgf": 9.80665,"tf": 9.80665*1000,"qf": 9.80665*100,"dyn": 1e-5,"lbf": 4.448222,"pdl": 0.138255, // force
	"Pa": 1,"dPa": 1e-1,"cPa": 1e-2,"mPa": 1e-3,"uPa": 1e-6,"nPa": 1e-9,"daPa": 1e1,"hPa": 1e2,"kPa": 1e3,"MPa": 1e6,"GPa": 1e9,"torr": 133.3223684,"bar": 1e5,"atm": 101.325e3, // pressure
	"J": 1,"dJ": 1e-1,"cJ": 1e-2,"mJ": 1e-3,"uJ": 1e-6,"nJ": 1e-9,"daJ": 1e1,"hJ": 1e2,"kJ": 1e3,"MJ": 1e6,"GJ": 1e9,"cal": 4184,"BTU": 1.0551e3, // energy
	"W": 1,"dW": 1e-1,"cW": 1e-2,"mW": 1e-3,"uW": 1e-6,"nW": 1e-9,"daW": 1e1,"hW": 1e2,"kW": 1e3,"MW": 1e6,"GW": 1e9,"hp": 735.5, // power
	"C": 1,"dC": 1e-1,"cC": 1e-2,"mC": 1e-3,"uC": 1e-6,"nC": 1e-9,"daC": 1e1,"hC": 1e2,"kC": 1e3,"MC": 1e6,"GC": 1e9, // electric charge
	"V": 1,"dV": 1e-1,"cV": 1e-2,"mV": 1e-3,"uV": 1e-6,"nV": 1e-9,"daV": 1e1,"hV": 1e2,"kV": 1e3,"MV": 1e6,"GV": 1e9, // voltage
	"F": 1,"dF": 1e-1,"cF": 1e-2,"mF": 1e-3,"uF": 1e-6,"nF": 1e-9,"daF": 1e1,"hF": 1e2,"kF": 1e3,"MF": 1e6,"GF": 1e9, // electrical capacitance
	"ohm": 1,"dohm": 1e-1,"cohm": 1e-2,"mohm": 1e-3,"uohm": 1e-6,"nohm": 1e-9,"daohm": 1e1,"hohm": 1e2,"kohm": 1e3,"Mohm": 1e6,"Gohm": 1e9, // electrical resistance
	"S": 1,"dS": 1e-1,"cS": 1e-2,"mS": 1e-3,"uS": 1e-6,"nS": 1e-9,"daS": 1e1,"hS": 1e2,"kS": 1e3,"MS": 1e6,"GS": 1e9, // electric conductance
	"Wb": 1,"dWb": 1e-1,"cWb": 1e-2,"mWb": 1e-3,"uWb": 1e-6,"nWb": 1e-9,"daWb": 1e1,"hWb": 1e2,"kWb": 1e3,"MWb": 1e6,"GWb": 1e9, // magnetic flux
	"T": 1,"dT": 1e-1,"cT": 1e-2,"mT": 1e-3,"uT": 1e-6,"nT": 1e-9,"daT": 1e1,"hT": 1e2,"kT": 1e3,"MT": 1e6,"GT": 1e9, // magnetic induction
	"H": 1,"dH": 1e-1,"cH": 1e-2,"mH": 1e-3,"uH": 1e-6,"nH": 1e-9,"daH": 1e1,"hH": 1e2,"kH": 1e3,"MH": 1e6,"GH": 1e9, // electrical inductance
	"lm": 1,"dlm": 1e-1,"clm": 1e-2,"mlm": 1e-3,"ulm": 1e-6,"nlm": 1e-9,"dalm": 1e1,"hlm": 1e2,"klm": 1e3,"Mlm": 1e6,"Glm": 1e9, // luminous flux
	"lx": 1,"dlx": 1e-1,"clx": 1e-2,"mlx": 1e-3,"ulx": 1e-6,"nlx": 1e-9,"dalx": 1e1,"hlx": 1e2,"klx": 1e3,"Mlx": 1e6,"Glx": 1e9, // illuminance
	"Bq": 1,"dBq": 1e-1,"cBq": 1e-2,"mBq": 1e-3,"uBq": 1e-6,"nBq": 1e-9,"daBq": 1e1,"hBq": 1e2,"kBq": 1e3,"MBq": 1e6,"GBq": 1e9, // radiocativity
	"Gy": 1,"dGy": 1e-1,"cGy": 1e-2,"mGy": 1e-3,"uGy": 1e-6,"nGy": 1e-9,"daGy": 1e1,"hGy": 1e2,"kGy": 1e3,"MGy": 1e6,"GGy": 1e9, // absorbed dose
	"Sv": 1,"dSv": 1e-1,"cSv": 1e-2,"mSv": 1e-3,"uSv": 1e-6,"nSv": 1e-9,"daSv": 1e1,"hSv": 1e2,"kSv": 1e3,"MSv": 1e6,"GSv": 1e9, // equivalente dose
	"kat": 1,"dkat": 1e-1,"ckat": 1e-2,"mkat": 1e-3,"ukat": 1e-6,"nkat": 1e-9,"dakat": 1e1,"hkat": 1e2,"kkat": 1e3,"Mkat": 1e6,"Gkat": 1e9, // catalytic activity
	"mol": 1,"dmol": 1e-1,"cmol": 1e-2,"mmol": 1e-3,"umol": 1e-6,"nmol": 1e-9,"damol": 1e1,"hmol": 1e2,"kmol": 1e3,"Mmol": 1e6,"Gmol": 1e9, // amount of substance
}
function initEnv() {
	STK = []
	ENV = {
		"e": Math.E, "pi": Math.PI, "phi":1.618033988749, // euler's number, pi number, golden ratio
		"c": 299792458, "G":6.6743e-11, "g":9.80665, // speed of light, gravitational constant, gravitational acceleration
		"h":6.62607015e-34, "hfr":1.054571817e-34, "me":9.1093837015-31,  // plank constant, reduced plank constant, electron mass
		"mp":1.6726218983-27, "NA":6.02214076*1023, "kb":1.3806490e-23, // proton mass, avogadro constant, boltzmann constant
		"eps0":8.8541878176e-12, "mi0":4e-7*Math.PI, "F": 9.64853399e4, // vacuum permittivity, permeability of vacuum, faraday constant
		"sigma": 5.670374419e-8 // stefan-boltzmann constant
	}
	FLAGS = {
		"prec": 4 // numbers display precision
	}
}
// STANDARD ENVIRONMENT
const STDENV = {
    // Numbers
	"neg": (STK,ENV)=> {assertStkl(1,STK); assertArr(STK[STK.length-1], assertNum, ""); // n -> -n
		STK.push(map1(STK.pop(), (x)=>-x))},
	"inv": (STK,ENV)=> {assertStkl(1,STK); assertArr(STK[STK.length-1], assertNum, "not0"); // n -> 1/n
		STK.push(map1(STK.pop(), (x)=>-x))},
	"abs": (STK,ENV)=> {assertStkl(1,STK); assertArr(STK[STK.length-1], assertNum, ""); // n -> |n|
		STK.push(map1(STK.pop(), (x)=>Math.abs(x)))},
	"ceil": (STK,ENV)=> {assertStkl(1,STK); assertArr(STK[STK.length-1], assertNum, ""); // n -> ceiling(n)
		STK.push(map1(STK.pop(), (x)=>Math.ceil(x)))},
	"floor": (STK,ENV)=> {assertStkl(1,STK); assertArr(STK[STK.length-1], assertNum, ""); // n -> floor(n)
		STK.push(map1(STK.pop(), (x)=>Math.floor(x)))},
	"rand": (STK,ENV)=> {STK.push(Math.random())},  // -> random n
	"round": (STK,ENV)=> {assertStkl(1,STK); assertArr(STK[STK.length-1], assertNum, ""); // n -> round(n)
		STK.push(map1(STK.pop(), (x)=>Math.round(x)))},
	"sign": (STK,ENV)=> {assertStkl(1,STK); assertArr(STK[STK.length-1], assertNum, ""); // n -> sign(n)
		STK.push(map1(STK.pop(), (x)=>Math.sign(x)))},
	"trunc": (STK,ENV)=> {assertStkl(1,STK); assertArr(STK[STK.length-1], assertNum, ""); // n -> trunc(n)
		STK.push(map1(STK.pop(), (x)=>Math.trunc(x)))},
	"+": (STK,ENV)=> {assertStkl(2,STK); assertArr(STK[STK.length-1], assertNum, ""); assertArr(STK[STK.length-2], assertNum, ""); // n1 n2 -> n1+n2
		STK.push(map2(STK.pop(), STK.pop(), (x, y)=>x+y))},
	"-": (STK,ENV)=> {assertStkl(2,STK); assertArr(STK[STK.length-1], assertNum, ""); assertArr(STK[STK.length-2], assertNum, ""); // n1 n2 -> n1-n2
		swap(STK); STK.push(map2(STK.pop(), STK.pop(), (x, y)=>x-y))},
	"*": (STK,ENV)=> {assertStkl(2,STK); assertArr(STK[STK.length-1], assertNum, ""); assertArr(STK[STK.length-2], assertNum, ""); // n1 n2 -> n1*n2
		STK.push(map2(STK.pop(), STK.pop(), (x, y)=>x*y))},
	"/": (STK,ENV)=> {assertStkl(2,STK); assertArr(STK[STK.length-2], assertNum, ""); assertArr(STK[STK.length-1], assertNum, "not0"); // n1 n2 -> n1/n2
		swap(STK); STK.push(map2(STK.pop(), STK.pop(), (x, y)=>x/y))},
	"^": (STK,ENV)=> {assertStkl(2,STK); assertArr(STK[STK.length-1], assertNum, ""); assertArr(STK[STK.length-2], assertNum, ""); // n1 n2 -> n1^n2
		swap(STK); STK.push(map2(STK.pop(), STK.pop(), (x, y)=>x**y))},
	"rem": (STK)=> {assertStkl(2,STK); assertArr(STK[STK.length-1], assertNum, ""); assertArr(STK[STK.length-2], assertNum, ""); // n1 n2 -> n1%n2
		swap(STK,ENV); STK.push(map2(STK.pop(), STK.pop(), (x, y)=>x%y))},
	// Scientific
	"acos": (STK,ENV)=> {assertStkl(1,STK); assertArr(STK[STK.length-1], assertNum, "-1/1"); // n -> acos(n)
		STK.push(map1(STK.pop(), (x)=>Math.acos(x)))},
	"acosh": (STK,ENV)=> {assertStkl(1,STK); assertArr(STK[STK.length-1], assertNum, ">=1"); // n -> acosh(n)
		STK.push(map1(STK.pop(), (x)=>Math.acosh(x)))},
	"asin": (STK,ENV)=> {assertStkl(1,STK); assertArr(STK[STK.length-1], assertNum, "-1/1"); // n -> asin(n)
		STK.push(map1(STK.pop(), (x)=>Math.asin(x)))},
	"asinh": (STK,ENV)=> {assertStkl(1,STK); assertArr(STK[STK.length-1], assertNum, ""); // n -> asinh(n)
		STK.push(map1(STK.pop(), (x)=>Math.asinh(x)))},
	"atan": (STK,ENV)=> {assertStkl(1,STK); assertArr(STK[STK.length-1], assertNum, ""); // n -> atan(n)
		STK.push(map1(STK.pop(), (x)=>Math.atan(x)))},
	"atanh": (STK,ENV)=> {assertStkl(1,STK); assertArr(STK[STK.length-1], assertNum, ""); // n -> atanh(n)
		STK.push(map1(STK.pop(), (x)=>Math.atanh(x)))},
	"cbrt": (STK,ENV)=> {assertStkl(1,STK); assertArr(STK[STK.length-1], assertNum, ""); // n -> n^1/3
		STK.push(map1(STK.pop(), (x)=>Math.cbrt(x)))},
	"cos": (STK,ENV)=> {assertStkl(1,STK); assertArr(STK[STK.length-1], assertNum, ""); // n -> cos(n)
		STK.push(map1(STK.pop(), (x)=>Math.cos(x)))},
	"cosh": (STK,ENV)=> {assertStkl(1,STK); assertArr(STK[STK.length-1], assertNum, ""); // n -> cosh(n)
		STK.push(map1(STK.pop(), (x)=>Math.cosh(x)))},
	"exp": (STK,ENV)=> {assertStkl(1,STK); assertArr(STK[STK.length-1], assertNum, ""); // n -> e^n
		STK.push(map1(STK.pop(), (x)=>Math.exp(x)))},
	"logn": (STK,ENV)=> {assertStkl(1,STK); assertArr(STK[STK.length-1], assertNum, ">0"); // n -> logn(n)
		STK.push(map1(STK.pop(), (x)=>Math.log(x)))},
	"log10": (STK,ENV)=> {assertStkl(1,STK); assertArr(STK[STK.length-1], assertNum, ">0"); // n -> log10(n)
		STK.push(map1(STK.pop(), (x)=>Math.log10(x)))},
	"log2": (STK,ENV)=> {assertStkl(1,STK); assertArr(STK[STK.length-1], assertNum, ">0"); // n -> log2(n)
		STK.push(map1(STK.pop(), (x)=>Math.log2(x)))},
	"sin": (STK,ENV)=> {assertStkl(1,STK); assertArr(STK[STK.length-1], assertNum, ""); // n -> sin(n)
		STK.push(map1(STK.pop(), (x)=>Math.sin(x)))},
	"sinh": (STK,ENV)=> {assertStkl(1,STK); assertArr(STK[STK.length-1], assertNum, ""); // n -> sinh(n)
		STK.push(map1(STK.pop(), (x)=>Math.sinh(x)))},
	"sqrt": (STK,ENV)=> {assertStkl(1,STK); assertArr(STK[STK.length-1], assertNum, ">=0"); // n -> n^1/2
		STK.push(map1(STK.pop(), (x)=>Math.sqrt(x)))},
	"tan": (STK,ENV)=> {assertStkl(1,STK); assertArr(STK[STK.length-1], assertNum, ""); // n -> tan(n)
		STK.push(map1(STK.pop(), (x)=>Math.tan(x)))},
	"tanh": (STK,ENV)=> {assertStkl(1,STK); assertArr(STK[STK.length-1], assertNum, ""); // n -> tanh(n)
		STK.push(map1(STK.pop(), (x)=>Math.tanh(x)))},
	// Booleans
	"not": (STK,ENV)=> {assertStkl(1,STK); // val -> !val
		STK.push(map1(STK.pop(), (x)=>x === 0?1: 0))},
	"and": (STK,ENV)=> {assertStkl(2,STK); // val1 val2 -> val1 && val2
		let b = STK.pop(), a = STK.pop(); STK.push(map2(a, b, (a, b)=>a !== 0 && b !== 0?1: 0))},
	"or": (STK,ENV)=> {assertStkl(2,STK); // val1 val2 -> val1 || val2
		let b = STK.pop(), a = STK.pop(); STK.push(map2(a, b, (a, b)=>a !== 0 || b !== 0?1: 0))},
	// Comparison
	"=": (STK,ENV)=> {assertStkl(2,STK); // val1 val2 -> val1 === val2
		let b = STK.pop(), a = STK.pop(); STK.push(map2(a, b, (a, b)=>a === b?1: 0))},
	">": (STK,ENV)=> {assertStkl(2,STK); assertArr(STK[STK.length-1], assertNum, ""); assertArr(STK[STK.length-2], assertNum, ""); // val1 val2 -> val1 > val2
		let b = STK.pop(), a = STK.pop(); STK.push(map2(a, b, (a, b)=>a > b?1: 0))},
	"<": (STK,ENV)=> {assertStkl(2,STK); assertArr(STK[STK.length-1], assertNum, ""); assertArr(STK[STK.length-2], assertNum, ""); // val1 val2 -> val1 < val2
		let b = STK.pop(), a = STK.pop(); STK.push(map2(a, b, (a, b)=>a < b?1: 0))},
	">=": (STK,ENV)=> {assertStkl(2,STK); assertArr(STK[STK.length-1], assertNum, ""); assertArr(STK[STK.length-2], assertNum, ""); // val1 val2 -> val1 >= val2
		let b = STK.pop(), a = STK.pop(); STK.push(map2(a, b, (a, b)=>a >= b?1: 0))},
	"<=": (STK,ENV)=> {assertStkl(2,STK); assertArr(STK[STK.length-1], assertNum, ""); assertArr(STK[STK.length-2], assertNum, ""); // val1 val2 -> val1 <= val2
		let b = STK.pop(), a = STK.pop(); STK.push(map2(a, b, (a, b)=>a <= b?1: 0))},
	// Units
	"units": (STK,ENV)=> {let ua = []; for (let u in UNITS) {ua.push(u); ua.push(UNITS[u]);}
		STK.push(ua)},
	"toUnit": (STK,ENV)=> {assertStkl(2,STK); assertArr(STK[STK.length-2], assertNum, ""); // sival (unitsymb) -> unitval
		assert(STK[STK.length-1].length === 1, "Unit array must have length = 1")
		let u = Symbol.keyFor(STK.pop()[0]), val = STK.pop(); STK.push(map1(val, (val)=>parseu(u, val, "conv")))},
	"toSI": (STK,ENV)=> {assertStkl(2,STK); assertArr(STK[STK.length-2], assertNum, "");  // unitval (unitsymb) -> si_val
		assert(STK[STK.length-1].length === 1, "Unit array must have length = 1")
		let u = Symbol.keyFor(STK.pop()[0]), val = STK.pop(); STK.push(map1(val, (val)=>parseu(u, val,"")))},
	// Stack
	"pop": (STK,ENV)=> {assertStkl(1,STK); // ... e1 e2 -> ... e1
		STK.pop()},
	"swap": (STK,ENV)=> {assertStkl(2,STK); // e1 e2 -> e2 e1
		swap(STK)},
	"dup": (STK,ENV)=> {assertStkl(1,STK); // e1 -> e1 e1
		STK.push(STK[STK.length-1])},
	"over": (STK,ENV)=> {assertStkl(2,STK); // e1 e2 -> e1 e2 e1
		STK.push(STK[STK.length-2])},
	"rot": (STK,ENV)=> {assertStkl(2,STK); // e1 e2 e3 -> e3 e1 e2
		STK.push(STK.shift())},
	"stack": (STK,ENV)=> {STK.push(STK)}, // -> STACK
	// Array
	"iota": (STK,ENV)=> {assertStkl(1,STK); assertNum(STK[STK.length-1], "int>0") // n -> (1 ... n)
		STK.push([...Array(STK.pop()).keys()].map((x)=>x+1))},
	"ones": (STK,ENV)=> {assertStkl(1,STK); assertNum(STK[STK.length-1], "int>0") // n -> (1 ... 1) - length==n
		STK.push(new Array(STK.pop()).fill(1))},
	"zeros": (STK,ENV)=> {assertStkl(1,STK); assertNum(STK[STK.length-1], "int>0") // n -> (0 ... 0) - length==n
		STK.push(new Array(STK.pop()).fill(0))},
	"get": (STK,ENV)=> {assertStkl(2,STK); assertNum(STK[STK.length-1], "int>0"); // arr n -> arr[n]
		assert(STK[STK.length-1] <= STK[STK.length-2].length, "Array index out of range");
		let n = STK.pop(), a = STK.pop(); STK.push(a[n-1])},
	"slice": (STK,ENV)=> {assertStkl(3,STK); assertNum(STK[STK.length-1]); assertNum(STK[STK.length-2]); // arr n1 n2 -> arr[n1:n2]
		assert(STK[STK.length-1] <= STK[STK.length-3].length, "Array index out of range"); 
		assert(STK[STK.length-2] <= STK[STK.length-3].length, "Array index out of range")
		let i2 = STK.pop(), i1 = STK.pop(), a = STK.pop();
		if (i2 === 0) {STK.push(a.slice(i1-1))
		} else {STK.push(a.slice(i1-1, i2))}},
	"join": (STK,ENV)=> {assertStkl(2,STK); assert(Array.isArray(STK[STK.length-2]), "First argument must be an array") // arr1 arr2 -> (arr1...arr2)
		assert(Array.isArray(STK[STK.length-1]), "Second argument must be an array");
		let a2 = STK.pop(), a1 = STK.pop(); 
		STK.push(a1.concat(a2))},
	"map": (STK,ENV)=> {assertStkl(2,STK); assert(Array.isArray(STK[STK.length-2]), "First argument must be an array") // arr (expr) -> (expr(arr))
		assert(Array.isArray(STK[STK.length-1]), "Second argument must be an expression array");
		let ex = STK.pop(),a = STK.pop(),na = []; ex.evaluate = true
		for (let ei in a) {
			STK.push(a[ei]); STK.push(ex); STDENV["eval"](STK,ENV);
			na.push(STK.pop())
		}
		STK.push(na)
	},
	"map2": (STK,ENV)=> {assertStkl(3,STK); assert(Array.isArray(STK[STK.length-3]), "First argument must be an array") // arr1 arr2 (expr) -> (expr(arr1,arr2))
		assert(Array.isArray(STK[STK.length-2]), "Second argument must be an expression array"); 
		assert(Array.isArray(STK[STK.length-2]), "Third argument must be an expression array");
		let ex = STK.pop(), a2 = STK.pop(), a1 = STK.pop(), na = []; ex.evaluate = true
		for (let ei in a1) {
			STK.push(a1[ei]); STK.push(a2[ei]); STK.push(ex); STDENV["eval"](STK,ENV);
			na.push(STK.pop())
		}
		STK.push(na)
	},
	"filter": (STK,ENV)=> {assertStkl(2,STK); assert(Array.isArray(STK[STK.length-2]), "First argument must be an array"); // arr (expr) -> (expr(arr))
		assert(Array.isArray(STK[STK.length-1]), "Second argument must be an expression array");
		let ex = STK.pop(),a = STK.pop(),na = []; ex.evaluate = true
		for (let ei in a) {
			STK.push(a[ei]); STK.push(ex); STDENV["eval"](STK, ENV);
			let bool = STK.pop(); 
			if (bool === 1) {
				na.push(a[ei])}}
		STK.push(na)
	},
	"reduce": (STK,ENV)=> {assertStkl(2,STK); assert(Array.isArray(STK[STK.length-2]), "First argument must be an array"); // arr (expr) -> reduce(arr,expr)
		assert(Array.isArray(STK[STK.length-1]), "Second argument must be an expression array");
		let ex = STK.pop(),a = STK.pop(); ex.evaluate = true
		STK.push(a.shift());
		while (a.length > 0) {
			let e = a.shift(); STK.push(e); STK.push(ex);
			STDENV["eval"](STK, ENV)}
	},
	"length": (STK,ENV)=> {assertStkl(1,STK); assert(Array.isArray(STK[STK.length-1]), "Argument must be an array") // arr -> arrlen
		STK.push(STK.pop().length)},
	"sort": (STK,ENV)=> {assertStkl(1,STK); assert(Array.isArray(STK[STK.length-1]), "Argument must be an array") // arr -> arr (sorted)
		STK.push(STK.pop().toSorted())},
	"reverse": (STK,ENV)=> {assertStkl(1,STK); assert(Array.isArray(STK[STK.length-1]), "Argument must be an array") // arr -> arr (reversed)
		STK.push(STK.pop().toReversed())},
	"find": (STK,ENV)=> {assertStkl(2,STK); assert(Array.isArray(STK[STK.length-2]), "First argument must be an array")  // arr -> arr (reversed)
		let k = STK.pop(); STK.push(STK.pop().findIndex((e)=>e === k)+1)},
	"assoc": (STK,ENV)=> {assertStkl(2,STK); 
		let ks = STK.pop(), a = STK.pop(); 
		if (Array.isArray(ks)) {ks.map((k)=>STK.push(a[a.findIndex((e)=>e === k)+1]))}
		else {STK.push(a[a.findIndex((e)=>e === ks)+1])}},
	"apush": (STK,ENV)=> {
		let e = STK.pop(),a = STK.pop(); a.push(e); STK.push(a)},
	"apop": (STK,ENV)=> {
		let a = STK.pop(); a.pop(); STK.push(a)},
	// Strings
	"str/length": (STK,ENV)=>{assertStkl(1,STK); assertStr(STK[STK.length-1]);
		STK.push(STK.pop().length)},
	"str/join": (STK,ENV)=>{assertStkl(2,STK); assertStr(STK[STK.length-1]); assertStr(STK[STK.length-2]) // str1 str2 -> str1+str2
	    let s2=STK.pop(), s1=STK.pop(); STK.push(s1+s2)},
	"str/slice": (STK,ENV)=>{assertStkl(3,STK); assertNum(STK[STK.length-1]); // str n1 n2 -> str[n1:n2]
		assertNum(STK[STK.length-2]); assertStr(STK[STK.length-3]); 
		let n2=STK.pop(), n1=STK.pop(), s=STK.pop(); STK.push(s.slice(n1,n2))},
	"str/uppercase": (STK,ENV)=>{assertStkl(1,STK); assertStr(STK[STK.length-1]); // str -> STR
		STK.push(STK.pop().toUpperCase())},
	"str/lowercase": (STK,ENV)=>{assertStkl(1,STK); assertStr(STK[STK.length-1]); // STR -> str
		STK.push(STK.pop().toLowerCase())},
	"str/findchar": (STK,ENV)=>{assertStkl(2,STK); assertNum(STK[STK.length-1]); assertStr(STK[STK.length-2]); // str n -> str[n]
		let s=STK.pop(), n=STK.pop(); STK.push(s.at(n))},
	"str/parse": (STK,ENV)=>{assertStkl(1,STK); assertStr(STK[STK.length-1]); // str -> value
		STK.push(parse(tokenize(STK.pop())))},
	"str/tosymbol": (STK,ENV)=>{assertStkl(1,STK); assertStr(STK[STK.length-1]); // str -> symb
		STK.push(Symbol.for(STK.pop()))},
	// Symbols
	"symb/tostring": (STK,ENV)=>{assertStkl(1,STK); assert(typeof(STK[STK.length-1])==="symbol","Argument must be symbol"); // symb -> str
		STK.push(Symbol.keyFor(STK.pop()))},
	// Programming
	"//": (STK,ENV)=>{assertStkl(1,STK); // ... e1 -> ... (comment, same as pop)
		STK.pop()},
	"typeof": (STK,ENV)=>{assertStkl(1,STK); // e -> typeof(e)
		STK.push(typeof(STK.pop()))},
	"tostr": (STK,ENV)=>{assertStkl(1,STK); // e -> "e"
		STK.push(stringify(STK.pop()))},
	"err": (STK,ENV)=> {throw "Generic error"}, // -> ERROR
	"eval": (STK, ENV)=> {assertStkl(1,STK); assert(Array.isArray(STK[STK.length-1]), "Argument must be array")
		let ex = STK.pop(); ex.evaluate = true; evaluate(ex, STK, ENV)},
	"var": (STK, ENV)=> {assertStkl(2,STK);assert(Array.isArray(STK[STK.length-1]) && (STK[STK.length-1].length === 1) && ((typeof STK[STK.length-1][0]) === "symbol"), "Second arg must be array with 1 symbol")
		let w = Symbol.keyFor(STK.pop()[0]), e = STK.pop(); ENV[w] = e
	},
	"fun": (STK, ENV)=> {assertStkl(2,STK);
		assert(Array.isArray(STK[STK.length-1]) && (STK[STK.length-1].length === 1) && ((typeof STK[STK.length-1][0]) === "symbol"), "Second arg must be array with 1 symbol")
		let w = Symbol.keyFor(STK.pop()[0]), e = STK.pop(); e.evaluate = true; ENV[w] = e
	},
	"cond": (STK,ENV)=> {assertStkl(2,STK);
		let ex = STK.pop(),c = STK.pop()
		if (c !== 0) {
			STK.push(ex); STDENV["eval"](STK,ENV)}
	},
	"loop": (STK,ENV)=> {assertStkl(2,STK);
		let n = STK.pop(); let ex = STK.pop();
		while (n !== 0) {
			STK.push(ex); STDENV["eval"](STK,ENV); n--
		}
	},
	// Document
	"h1": (STK,ENV)=> {assertStkl(1,STK); assertStr(STK[STK.length-1]);
		PRINT(STK[STK.length-1], "<h1>", "</h1>"); STK.pop()},
	"h2": (STK,ENV)=> {assertStkl(1,STK); assertStr(STK[STK.length-1]);
		PRINT(STK[STK.length-1], "<h2>", "</h2>"); STK.pop()},
	"h3": (STK,ENV)=> {assertStkl(1,STK); assertStr(STK[STK.length-1]);
		PRINT(STK[STK.length-1], "<h3>", "</h3>"); STK.pop()},
	"par": (STK,ENV)=> {assertStkl(1,STK); assertStr(STK[STK.length-1]);
		PRINT(STK[STK.length-1], "<p>", "</p>"); STK.pop()},
	"code": (STK,ENV)=> {assertStkl(1,STK); 
		PRINT(STK[STK.length-1], "<pre>", "</pre>"); STK.pop()},
	"print": (STK,ENV)=> {assertStkl(1,STK); 
		PRINT(stringify(STK[STK.length-1]), "<pre>", "</pre>"); STK.pop()},
	".": (STK,ENV)=> {assertStkl(1,STK); 
		let ex = STK.pop(), tmpstk = [];
		PRINT(stringify(ex) + " -> " + stringify(evals(ex, tmpstk)), "<pre>", "</pre>")},
	"..": (STK,ENV)=> {assertStkl(1,STK); 
		let ex = STK.pop(), tmpstk = []; ex.evaluate = true;
		PRINT(stringify(ex) + " -> " + stringify(evaluate(ex, tmpstk, ENV)), "<pre>", "</pre>")},
	"list": (STK,ENV)=> {assertStkl(1,STK);
		let s = "<ul>", a = STK[STK.length-1]; STK.pop();
		for (let e in a) {s += "<li>"+(a[e])+"</li>"}
		s += "</ul>";
		PRINT(s, "", ""); },
	"olist": (STK,ENV)=> {assertStkl(1,STK);
		let s = "<ol>", a = STK[STK.length-1]; STK.pop();
		for (let e in a) {s += "<li>"+(a[e])+"</li>"}
		s += "</ol>";
		PRINT(s, "", ""); },
	"table": (STK,ENV)=> {assertStkl(1,STK);
		let s = "<table>", a = STK[STK.length-1]; STK.pop();
		for (let e in a) {
			s += "<tr>";
			for (let se in a[e]) {s += "<td>"+stringify(a[e][se])+"</td>"}
			s += "</tr>";
		}
		s += "</table>";
		PRINT(s, "", "")},
	"htable": (STK,ENV)=> {assertStkl(2,STK);
		let s = "<table>", a = STK[STK.length-1]; STK.pop(); let h = STK[STK.length-1]; STK.pop();
		for (let e in a) {
			s += "<tr><td>" + h[e] + "</td>";
			for (let se in a[e]) {s += "<td>"+stringify(a[e][se])+"</td>"}
			s += "</tr>";
		}
		s += "</table>";
		PRINT(s, "", ""); },
	// Flags
	"prec": (STK,ENV)=> {assertStkl(1,STK);
		FLAGS["prec"] = STK.pop()}
}
// UTILITIES
function map1(a, f) {
	return Array.isArray(a)?a.map(f): f(a)}
function map2(a1, a2, f) {
	let ra = []
	if (Array.isArray(a1) && Array.isArray(a2)) {
		assert(a1.length === a2.length, "Arrays must have same length")
		for (let ei in a1) {ra.push(f(a1[ei], a2[ei]))}
		return ra} 
	else if (Array.isArray(a1) || Array.isArray(a2)) {
		if (Array.isArray(a1)) {for (let ei in a1) {ra.push(f(a1[ei], a2))}} 
		else {for (let ei in a2) {ra.push(f(a1, a2[ei]))}}
		return ra} 
	else {return f(a1, a2)}}
function reduce(a, f) {
	STK.push(0);
	for (let ei in a) {STK.push(a[ei]); a = f()}}
function swap(STK) {
	let a = STK.pop(),
	b = STK.pop();
	STK.push(a); STK.push(b);}
function assert(t, msg) {
	if (t === false) {throw ""+msg}}
function assertArr(arr, assf, cond) {
	if (Array.isArray(arr)) {arr.map((e)=> {assf(e, cond)})} 
	else {assf(arr, cond)}}
function assertNum(v, cond) {
	if (typeof v !== "number") {throw "Arg must be number"}
	if (cond === ">0") {if (!(v > 0)) {throw "Arg must be > 0"}}
	if (cond === "int>0") {if (!(v > 0)||(!Number.isInteger(v))) {throw "Arg must be an integer > 0"}}
	else if (cond === "<0") {if (!(v < 0)) {throw "Arg must be < 0"}}
	else if (cond === ">=0") {if (!(v >= 0)) {throw "Arg must be > 0"}}
	else if (cond === "<=0") {if (!(v <= 0)) {throw "Arg must be < 0"}}
	else if (cond === "not0") {if (v === 0) {throw "Arg must not be 0"}}
	else if (cond === ">=1") {if (v < 1) {throw "Arg must be >=1"}}
	else if (cond === "-1/1") {if (!(v >= -1 && v <= 1)) {throw "Arg must be >=-1 and <=1"}}}
function assertSym(v, env) {
	if (! typeof v === "symbol") {throw "Arg must be symbol"}
	if (env[Symbol.keyFor(v)] === undefined && STDENV[Symbol.keyFor(v)] === undefined) {throw "Unknown symbol "+Symbol.keyFor(v)}}
function assertStr(v) {
    if (! typeof v === "string") {throw "Arg must be string"}}
function assertStkl(n,STK) {
	if (STK.length < n) {throw "Stack length <" + n}}

// INTERPRETER
function tokenize(s) {
	let ts = s.split('"').map((e,i)=>{
		if (i%2===0) {
			return e.replace(/\(/g, ' ( ')
			.replace(/\)(?![!])/g, ' ) ')
			.replace(/(\)!)/g, ' $1 ')
		.split(/\s+/).filter((t)=>t !== "");
		} else {return '"'+e+'"'}
	}).flat()
	return ts;}
function parseu(us,v,mode="") {
	if (us==="K") {return +v}
	if (us==="°C") {return +v+273.15}
	if (us==="°F") {return (+v-32)/1.8+273.15}
	assert(Number.isNaN(+us), "Invalid unit literal")
	let cf = 1, a = us.split("/")
	assert(a.length < 3, "Unexpected / in unit literal")
	assert(a[0] !== "", "Missing units before /")
	assert(a[1] !== "", "Missing units after /")
	let n = a[0].split("*").map((e)=>e.match(/(\D+)(\d*)/))
	for (let ei in n) {
		assert(n[ei] !== null, "Missing unit after *")
		assert(n[ei][0] !== "°C","°C unit not allowed in compound unit")
		assert(n[ei][0] !== "°F","°F unit not allowed in compound unit")
		assert(UNITS[n[ei][1]] !== undefined, "unknown unit "+n[ei][1])
		if (n[ei][2] === "") {n[ei][2] = "1"}
		cf = cf*(UNITS[n[ei][1]]**(+n[ei][2]))}
	if (a.length === 2) {
		let d = a[1].split("*").map((e)=>e.match(/(\D+)(\d*)/));
		for (let ei in d) {
			assert(d[ei] !== null, "Missing unit after *")
			assert(d[ei][0] !== "°C","°C unit not allowed in compound unit")
			assert(d[ei][0] !== "°F","°F unit not allowed in compound unit")
			assert(UNITS[d[ei][1]] !== undefined, "Unknown unit "+d[ei][1])
			if (d[ei][2] === "") {d[ei][2] = "1"}
			cf = cf/(UNITS[d[ei][1]]**(+d[ei][2]))}}
	if (mode==="conv") {return v/cf}
	else {return v*cf}}
function parset(t) {
	if (t[0]==='"') {return t.slice(1,-1)}
	let tl = t; t = t.split("_")
	if (isFinite(t[0])) {
		assert(t[1] !== "", "Missing unit after _")
		assert(t.length<=2, "Unexpected _ in number literal")
		return (t.length === 1) ? +t[0] : parseu(t[1],t[0])} 
	else {return Symbol.for(tl);}}
function parse(ts) {
	let ST = [[]];
	for (let ti in ts) {
		try {
			let t = ts[ti];
			if (t === "(") {ST.push([])} 
			else if (t === ")") {
				assert(ST.length > 1, "Unexpected )")
				let a = ST.pop(); ST[ST.length-1].push(a)
			} else if (t === ")!") {let a = ST.pop(); a.evaluate = true; ST[ST.length-1].push(a)}
			else {ST[ST.length-1].push(parset(t))}
		} catch (e) {throw new Error("Parsing error. Token " + ti + ". " + e)}}
	try {assert(ST.length === 1, "Missing )")} 
	catch (e) {throw new Error("Parsing error. Token " + ts[ts.length-1]  + ". " + e)}
	return ST[0];}
function stringify(ex) {
	if (typeof ex === "number") {
		if (FLAGS["prec"]<0) {return ""+(ex)} 
		else {return ""+(Number.isInteger(ex)?ex:ex.toPrecision(FLAGS["prec"]))}}
	if (typeof ex === "symbol") {return ""+Symbol.keyFor(ex)}
	if (typeof ex === "string") {return '"'+ex.replace(/"/g,"\'")+'"'}
	let s = "(", se = ex.evaluate?")!": ")";
	for (let ei in ex) {
		if (ei !== "evaluate") {
			if (Array.isArray(ex[ei])) {s += stringify(ex[ei]) + " "} 
			else {s += stringify(ex[ei]) + " "}
		}
	}
	return s === "("?s+se: s.slice(0, -1)+se
}
function evaluate(ST, STK, ENV) {
	if ((typeof ST === "number") || (typeof ST === "string")) {
		STK.push(ST);
	} else if (typeof ST === "symbol") {
		try {
			if (ENV[Symbol.keyFor(ST)] === undefined) {
				assertSym(ST, STDENV)
				STDENV[Symbol.keyFor(ST)](STK, ENV)} 
			else {
				let ne = Object.create(ENV)
				evaluate(ENV[Symbol.keyFor(ST)], STK, ne)}
		} catch (e) {
			throw new Error("Evaluation error. Symbol " + Symbol.keyFor(ST) + ". " + e)}
	} else if (Array.isArray(ST) && ST.evaluate) {
		for (let ei in ST) {
			let e = ST[ei]; evaluate(e, STK, ENV)}
	} else if (Array.isArray(ST) && !ST.evaluate) {
		let a = []
		for (let ei in ST) {
			let e = ST[ei]; Array.isArray(e)?evaluate(e, a, ENV): a.push(e)}
		STK.push(a)}
	return STK;}
function evals(s, STK = []) {
	let ST = parse(tokenize(s)); ST.evaluate = true
	return evaluate(ST, STK, ENV)}
// USER INTERFACE
let inElem = document.getElementById("in")
let outElem = document.getElementById("out")
let stkElem = document.getElementById("stk")
let waitTime = 700; let editing = 0;
function PRINT(o, pre, post) {
	outElem.innerHTML += pre+o+post}
function PRINTSTK(o, pre, post) {
	stkElem.innerHTML += pre+o+post}
function RUN() {
	try {evals(inElem.value, STK); PRINTSTK(stringify(STK), "STACK: ", "")} 
	catch (e) {PRINTSTK(e, "", "")}}
inElem.oninput = () => {
	editing += waitTime
	setTimeout(()=> {
		editing -= waitTime;
		if (editing === 0) {
			initEnv(); outElem.innerHTML = ""; stkElem.innerHTML = ""; RUN();
			localStorage.setItem('stpd_data', inElem.value);
		}},waitTime)
}
initEnv(); inElem.value = localStorage.getItem('stpd_data');
RUN(); inElem.focus();


// PWA SERVICE WORKER
if('serviceWorker' in navigator) {
	navigator.serviceWorker.register('/stpd/servicew.js', { scope: '/stpd/' });
}
