"use strict"
// ENVIRONMENT
let STK, ENV, FLAGS; const UNITS = {
	// Length (base: metre)
	"m":1,"dm":1e-1,"cm":1e-2,"mm":1e-3,"um":1e-6,"nm":1e-9,"dam":1e1,"hm":1e2,"km":1e3,"Mm":1e6,"Gm":1e9,"in":0.0254,"ft":0.3048,"yd":0.9144,"mi":1609.344,"ly":9.4607304725808e15,"au":149597870700,"pc":3.08567758146719e16,
	// Mass (base: kilogram)
	"g":1e-3,"dg":1e-4,"cg":1e-5,"mg":1e-6,"ug":1e-9,"ng":1e-12,"dag":1e-2,"hg":1e-1,"kg":1,"Mg":1e3,"Gg":1e6,"q":100,"t":1000,"lb":0.45359237,"oz":0.028349523125,
	// Time (base: second)
	"s":1,"min":60,"h":3600,"d":86400,"w":604800,"mo":2592000,"y":31536000,
	// Angles
	"rad":1,"deg":Math.PI/180,"grad":Math.PI/200,"sr":1,
	// Temperature (scale placeholder; conversion handled dal parser)
	"K":1,
	// Frequency (base: Hz)
	"Hz":1,"dHz":1e-1,"cHz":1e-2,"mHz":1e-3,"uHz":1e-6,"nHz":1e-9,"daHz":1e1,"hHz":1e2,"kHz":1e3,"MHz":1e6,"GHz":1e9,
	// Volume (base: cubic metre; 1 l = 0.001 m^3) — tutti i simboli con 'l' minuscola
	"l":0.001,"dl":0.0001,"cl":0.00001,"ml":0.000001,"ul":1e-9,"nl":1e-12,"dal":0.01,"hl":0.1,"kl":1.0,"Ml":1000.0,"Gl":1e6,"gal":0.003785411784,"pint":0.00056826125,
	// Force (base: newton)
	"N":1,"dN":1e-1,"cN":1e-2,"mN":1e-3,"uN":1e-6,"nN":1e-9,"daN":1e1,"hN":1e2,"kN":1e3,"MN":1e6,"GN":1e9,"kgf":9.80665,"tf":9.80665*1000,"qf":9.80665*100,"dyn":1e-5,"lbf":4.4482216152605,"pdl":0.138255,
	// Pressure (base: pascal)
	"Pa":1,"dPa":1e-1,"cPa":1e-2,"mPa":1e-3,"uPa":1e-6,"nPa":1e-9,"daPa":1e1,"hPa":1e2,"kPa":1e3,"MPa":1e6,"GPa":1e9,"torr":133.3223684,"bar":1e5,"atm":101325,
	// Energy (base: joule)
	"J":1,"dJ":1e-1,"cJ":1e-2,"mJ":1e-3,"uJ":1e-6,"nJ":1e-9,"daJ":1e1,"hJ":1e2,"kJ":1e3,"MJ":1e6,"GJ":1e9,"cal":4.184,"kcal":4184,"BTU":1055.05585262,
	// Power (base: watt)
	"W":1,"dW":1e-1,"cW":1e-2,"mW":1e-3,"uW":1e-6,"nW":1e-9,"daW":1e1,"hW":1e2,"kW":1e3,"MW":1e6,"GW":1e9,"hp":735.49875,
	// Electric charge (base: coulomb)
	"C":1,"dC":1e-1,"cC":1e-2,"mC":1e-3,"uC":1e-6,"nC":1e-9,"daC":1e1,"hC":1e2,"kC":1e3,"MC":1e6,"GC":1e9,
	// Voltage (base: volt)
	"V":1,"dV":1e-1,"cV":1e-2,"mV":1e-3,"uV":1e-6,"nV":1e-9,"daV":1e1,"hV":1e2,"kV":1e3,"MV":1e6,"GV":1e9,
	// Capacitance (base: farad)
	"F":1,"dF":1e-1,"cF":1e-2,"mF":1e-3,"uF":1e-6,"nF":1e-9,"daF":1e1,"hF":1e2,"kF":1e3,"MF":1e6,"GF":1e9,
	// Resistance (base: ohm)
	"ohm":1,"dohm":1e-1,"cohm":1e-2,"mohm":1e-3,"uohm":1e-6,"nohm":1e-9,"daohm":1e1,"hohm":1e2,"kohm":1e3,"Mohm":1e6,"Gohm":1e9,
	// Conductance (base: siemens)
	"S":1,"dS":1e-1,"cS":1e-2,"mS":1e-3,"uS":1e-6,"nS":1e-9,"daS":1e1,"hS":1e2,"kS":1e3,"MS":1e6,"GS":1e9,
	// Magnetic flux (weber)
	"Wb":1,"dWb":1e-1,"cWb":1e-2,"mWb":1e-3,"uWb":1e-6,"nWb":1e-9,"daWb":1e1,"hWb":1e2,"kWb":1e3,"MWb":1e6,"GWb":1e9,
	// Magnetic induction (tesla)
	"T":1,"dT":1e-1,"cT":1e-2,"mT":1e-3,"uT":1e-6,"nT":1e-9,"daT":1e1,"hT":1e2,"kT":1e3,"MT":1e6,"GT":1e9,
	// Inductance (henry)
	"H":1,"dH":1e-1,"cH":1e-2,"mH":1e-3,"uH":1e-6,"nH":1e-9,"daH":1e1,"hH":1e2,"kH":1e3,"MH":1e6,"GH":1e9,
	// Luminous flux (lumen)
	"lm":1,"dlm":1e-1,"clm":1e-2,"mlm":1e-3,"ulm":1e-6,"nlm":1e-9,"dalm":1e1,"hlm":1e2,"klm":1e3,"Mlm":1e6,"Glm":1e9,
	// Illuminance (lux)
	"lx":1,"dlx":1e-1,"clx":1e-2,"mlx":1e-3,"ulx":1e-6,"nlx":1e-9,"dalx":1e1,"hlx":1e2,"klx":1e3,"Mlx":1e6,"Glx":1e9,
	// Radioactivity (becquerel)
	"Bq":1,"dBq":1e-1,"cBq":1e-2,"mBq":1e-3,"uBq":1e-6,"nBq":1e-9,"daBq":1e1,"hBq":1e2,"kBq":1e3,"MBq":1e6,"GBq":1e9,
	// Absorbed dose (gray)
	"Gy":1,"dGy":1e-1,"cGy":1e-2,"mGy":1e-3,"uGy":1e-6,"nGy":1e-9,"daGy":1e1,"hGy":1e2,"kGy":1e3,"MGy":1e6,"GGy":1e9,
	// Equivalent dose (sievert)
	"Sv":1,"dSv":1e-1,"cSv":1e-2,"mSv":1e-3,"uSv":1e-6,"nSv":1e-9,"daSv":1e1,"hSv":1e2,"kSv":1e3,"MSv":1e6,"GSv":1e9,
	// Catalytic activity (katal)
	"kat":1,"dkat":1e-1,"ckat":1e-2,"mkat":1e-3,"ukat":1e-6,"nkat":1e-9,"dakat":1e1,"hkat":1e2,"kkat":1e3,"Mkat":1e6,"Gkat":1e9,
	// Amount of substance (mole)
	"mol":1,"dmol":1e-1,"cmol":1e-2,"mmol":1e-3,"umol":1e-6,"nmol":1e-9,"damol":1e1,"hmol":1e2,"kmol":1e3,"Mmol":1e6,"Gmol":1e9
};
function initEnv() {
	STK = []
	ENV = {
		"e": Math.E, "pi": Math.PI, "phi":1.618033988749, // euler's number, pi number, golden ratio
		"c": 299792458, "G":6.6743e-11, "g":9.80665, // speed of light, gravitational constant, gravitational acceleration
		"h":6.62607015e-34, "hfr":1.054571817e-34, "me":9.1093837015e-31,  // plank constant, reduced plank constant, electron mass
		"mp":1.6726218983e-27, "NA":6.02214076*1023, "kb":1.3806490e-23, // proton mass, avogadro constant, boltzmann constant
		"eps0":8.8541878176e-12, "mi0":4e-7*Math.PI, "F": 9.64853399e4, // vacuum permittivity, permeability of vacuum, faraday constant
		"sigma": 5.670374419e-8 // stefan-boltzmann constant
	}
	FLAGS = {
		"prec": 0 // numbers display precision
	}
}
// STANDARD ENVIRONMENT
const STDENV = {
    // Numbers
	"neg": (STK,ENV)=> {assertStkl(1,STK); assertArr(STK[STK.length-1], assertNum, ""); // n -> -n
		STK.push(map1(STK.pop(), (x)=>-x))},
	"inv": (STK,ENV)=> {assertStkl(1,STK); assertArr(STK[STK.length-1], assertNum, "not0"); // n -> 1/n
		STK.push(map1(STK.pop(), (x)=>1/x))},
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
		swap(STK); STK.push(map2(STK.pop(), STK.pop(), (x, y)=>x%y))},
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
	"stack": (STK,ENV)=> {STK.push([...STK])}, // -> STACK
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
		assert(Array.isArray(STK[STK.length-1]), "Third argument must be an expression array");
		let ex = STK.pop(), a2 = STK.pop(), a1 = STK.pop(), na = []; ex.evaluate = true
		for (let ei in a1) {
			STK.push(a1[ei]); STK.push(a2[ei]); STK.push(ex); STDENV["eval"](STK,ENV);
			na.push(STK.pop())
		}
		STK.push(na)
	},
	"filt": (STK,ENV)=> {assertStkl(2,STK); assert(Array.isArray(STK[STK.length-2]), "First argument must be an array"); // arr (expr) -> (expr(arr))
		assert(Array.isArray(STK[STK.length-1]), "Second argument must be an expression array");
		let ex = STK.pop(),a = STK.pop(),na = []; ex.evaluate = true
		for (let ei in a) {
			STK.push(a[ei]); STK.push(ex); STDENV["eval"](STK, ENV);
			let bool = STK.pop(); 
			if (bool === 1) {
				na.push(a[ei])}}
		STK.push(na)
	},
	"red": (STK,ENV)=> {assertStkl(2,STK); assert(Array.isArray(STK[STK.length-2]), "First argument must be an array"); // arr (expr) -> red(arr,expr)
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
	"sortn": (STK,ENV)=> {assertStkl(1,STK); assert(Array.isArray(STK[STK.length-1]), "Argument must be an array") // arr -> arr (sorted by num value)
		STK.push(STK.pop().toSorted((a,b)=>a-b))},
	"reverse": (STK,ENV)=> {assertStkl(1,STK); assert(Array.isArray(STK[STK.length-1]), "Argument must be an array") // arr -> arr (reversed)
		STK.push(STK.pop().toReversed())},
	"find": (STK,ENV)=> {assertStkl(2,STK); assert(Array.isArray(STK[STK.length-2]), "First argument must be an array")  // arr -> arr (reversed)
		let k = STK.pop(); STK.push(STK.pop().findIndex((e)=>e === k)+1)},
	"assoc": (STK,ENV)=> {assertStkl(2,STK); 
		let ks = STK.pop(), a = STK.pop(); 
		if (Array.isArray(ks)) {ks.map((k) => {if (a.findIndex((e)=>e === k)!==-1) {STK.push(a[a.findIndex((e)=>e === k)+1])}})}
		else {if (a.findIndex((e)=>e === ks)!==-1) {STK.push(a[a.findIndex((e)=>e === ks)+1])}}},
	"apush": (STK,ENV)=> {
		let e = STK.pop(),a = STK.pop(); a.push(e); STK.push(a)},
	"apop": (STK,ENV)=> {
		let a = STK.pop(); a.pop(); STK.push(a)},
	// Strings
	"str/length": (STK,ENV)=>{assertStkl(1,STK); assertStr(STK[STK.length-1]);
		STK.push(STK.pop().length)},
	"str/<": (STK,ENV)=>{assertStkl(2,STK); assertStr(STK[STK.length-1]); assertStr(STK[STK.length-2]) // str1 str2 -> 0/1
	    let s2=STK.pop(), s1=STK.pop(); if (s1<s2) {STK.push(1)} else {STK.push(0)}},
	"str/>": (STK,ENV)=>{assertStkl(2,STK); assertStr(STK[STK.length-1]); assertStr(STK[STK.length-2]) // str1 str2 -> 0/1
	    let s2=STK.pop(), s1=STK.pop(); if (s1>s2) {STK.push(1)} else {STK.push(0)}},
	"str/includes": (STK,ENV)=>{assertStkl(2,STK); assertStr(STK[STK.length-1]); assertStr(STK[STK.length-2]) // str1 str2 -> 0/1
	    let s2=STK.pop(), s1=STK.pop(); if (s1.includes(s2)) {STK.push(1)} else {STK.push(0)}},
	"str/join": (STK,ENV)=>{assertStkl(2,STK); assertStr(STK[STK.length-1]); assertStr(STK[STK.length-2]) // str1 str2 -> str1+str2
	    let s2=STK.pop(), s1=STK.pop(); STK.push(s1+s2)},
	"str/slice": (STK,ENV)=>{assertStkl(3,STK); assertNum(STK[STK.length-1]); // str n1 n2 -> str[n1:n2]
		assertNum(STK[STK.length-2]); assertStr(STK[STK.length-3]); 
		let n2=STK.pop(), n1=STK.pop(), s=STK.pop(); STK.push(s.slice(n1-1,n2-1))},
	"str/uppercase": (STK,ENV)=>{assertStkl(1,STK); assertStr(STK[STK.length-1]); // str -> STR
		STK.push(STK.pop().toUpperCase())},
	"str/lowercase": (STK,ENV)=>{assertStkl(1,STK); assertStr(STK[STK.length-1]); // STR -> str
		STK.push(STK.pop().toLowerCase())},
	"str/charat": (STK,ENV)=>{assertStkl(2,STK); assertNum(STK[STK.length-1]); assertStr(STK[STK.length-2]); // str n -> str[n]
		let n=STK.pop(), s=STK.pop(); STK.push(s.at(n-1))},
	"str/indexof": (STK,ENV)=>{assertStkl(2,STK); assertStr(STK[STK.length-1]); assertStr(STK[STK.length-2]) // str1 str2 -> num
	    let s2=STK.pop(), s1=STK.pop(); STK.push(s1.indexOf(s2)+1)},
	"str/parse": (STK,ENV)=>{assertStkl(1,STK); assertStr(STK[STK.length-1]); // str -> value
		STK.push(parse(tokenize(STK.pop())))},
	"str/stringify": (STK,ENV)=>{assertStkl(1,STK); // obj -> str
		STK.push(stringify(STK.pop()))},
	"str/tosymbol": (STK,ENV)=>{assertStkl(1,STK); assertStr(STK[STK.length-1]); // str -> symb
		STK.push(Symbol.for(STK.pop()))},
	// Symbols
	"symb/tostring": (STK,ENV)=>{assertStkl(1,STK); assert(typeof(STK[STK.length-1])==="symbol","Argument must be symbol"); // symb -> str
		STK.push(Symbol.keyFor(STK.pop()))},
	// Programming
	"#": (STK,ENV)=>{assertStkl(1,STK); // ... e1 -> ... (comment, same as pop)
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
	if (typeof v !== "symbol") {throw "Arg must be symbol"}
	if (env[Symbol.keyFor(v)] === undefined && STDENV[Symbol.keyFor(v)] === undefined) {throw "Unknown symbol "+Symbol.keyFor(v)}}
function assertStr(v) {
    if (typeof v !== "string") {throw "Arg must be string"}}
function assertStkl(n,STK) {
	if (STK.length < n) {throw "Stack length <" + n}}

// INTERPRETER
function tokenize(s) {
	let ts = s.split('"');
	if (ts.length%2 === 0) {throw new Error("Parsing error. Missing closing '\"' in string literal.")};
	ts = ts.map((e,i)=>{
		if (i%2===0) {
			return e.replace(/\(/g, ' ( ')
			.replace(/\)(?![!])/g, ' ) ')
			.replace(/(\)!)/g, ' $1 ')
		.split(/\s+/).filter((t)=>t !== "");
		} else {return '"'+e+'"'}
	}).flat()
	return ts;}
function parseu(us, v, mode = "") {
    if (us === "K") return +v;
    if (us === "°C") return +v + 273.15;
    if (us === "°F") return (+v - 32) / 1.8 + 273.15;
    assert(isNaN(+us), "Invalid unit literal: unit cannot be a number");
    let cf = 1;
    let parts = us.split("/");
    assert(parts.length <= 2, "Unexpected / in unit literal (max one allowed)");
    const unitRegex = /^([a-zA-Z°]+)([\-+]?\d*\.?\d*)?$/;
    const processPart = (partString, isDenominator = false) => {
        if (!partString) return;
        let elements = partString.split("*");
        for (let e of elements) {
            assert(e !== "", "Missing unit element around '*'");
            let match = e.match(unitRegex);
            assert(match !== null, "Invalid unit format or missing '*' separator: " + e);
            let symbol = match[1];
            let exponentStr = match[2];
            assert(symbol !== "°C" && symbol !== "°F", "Temperature units (°C, °F) not allowed in compound units");
            assert(UNITS[symbol] !== undefined, "Unknown unit symbol: " + symbol);
            let exponent = (exponentStr === "" || exponentStr === undefined) ? 1 : parseFloat(exponentStr);
            let factor = Math.pow(UNITS[symbol], exponent);
            if (isDenominator) {
                cf /= factor;
            } else {
                cf *= factor;
            }
        }
    };
    assert(parts[0] !== "", "Missing units before /");
    processPart(parts[0], false);
    if (parts.length === 2) {
        assert(parts[1] !== "", "Missing units after /");
        processPart(parts[1], true);
    }
    return (mode === "conv") ? v / cf : v * cf;
}
function parset(t) {
	if (t[0]==='"') {return t.slice(1,-1)}
	let tl = t; t = t.split("_")
	if (t[0] !== "" && isFinite(t[0])) {
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
		if (FLAGS["prec"] <= 0) {return ""+(ex)} 
		else {return ""+(Number.isInteger(ex)?ex:ex.toPrecision(FLAGS["prec"]))}}
	if (typeof ex === "symbol") {return ""+Symbol.keyFor(ex)}
	if (typeof ex === "string") {return '"'+ex+'"'}
	// if (typeof ex === "string") {return '"'+ex.replace(/"/g,"\'")+'"'}
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
initEnv(); inElem.value = localStorage.getItem('stpd_data') || "";
RUN(); inElem.focus();


// PWA SERVICE WORKER
if('serviceWorker' in navigator) {
	navigator.serviceWorker.register('/stpd/servicew.js', { scope: '/stpd/' });
}
