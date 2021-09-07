//function er en data stuctur

//create a function that is called greetings and prints out "Hello World"

//hoisting, hoisting = bliver løftet op.
//greetings()
function greetings() {
    console.log("Hello World")
}

const newGreetings = function greetingsTwo() {
    console.log("Hello World2")
}

//Hvis function ikke har navn, er det en annoynum function.
const anonyousFunctionGreetings = function() {
    console.log("new world")
}

//function reference
//console.log(newGreetings)

// Create a function that is called interact. It's body is empty.
function interact(anyFunctionReference) {

    //callback, it allows the function run with default code
    // and when it's ready it calls our function that we give to it.
    //imagine that before next line some code is running here...
    anyFunctionReference()

    //console.log(anyFunctionReference)
}

//call interact and pass anonyousFunctionGreetings
interact(anonyousFunctionGreetings)

// define a poke interaction and use it as a callback that is called later by interact.
function poke() {
    console.log("Do something")
}
interact(poke)

// define a function inline in interact that does a new interaction
//lambda syntax ellers gør det samme som ovenover
interact(() => console.log("test"))