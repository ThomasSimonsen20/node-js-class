//"use scrict";
//køre filen i scrict mode??? flere regler..

//const message = "Hello world"
//message = "new message"
//const kan ikke ændres, så hvis den ikke skal ændres brug den.

//insaneVariable = "This is not good";
//total global variable, for stort scope.
let word = "Clippie wants to help youuuu";

let age = 25;
//kan ændres så meget man har lyst til

const person = {
    name: "Thomas"
}
//can do this despite it being const
person.name = "John";
person.age = 22;

//can't do the following
//person = "bzzzz"
//person = { sound: "bzzzz"};
//Can't delete person

const immutablePerson = Object.freeze(person);
immutablePerson.name = "new name";
//ændre ikke navn, (er frozen)

// never use var
var oldSchoolJavascript = -10;

//er et scope.
{
    let someValue = "Some value"
    {
        let somevalue = "other value"
    }
}

//let holder sig til sit scope, var har et global scope i dens fil.


// write a for-loop
for (let index = 0; index <= 5; index++) {
    setTimeout(function runsAfterTheLoop() {
        console.log(index);
    }, 1000);
    //kører hele linjen efter 1 sec.
   // console.log(index)

}

// don't do this (use var)
for (var index = 0; index <= 5; index++) {
    setTimeout(function runsAfterTheLoop() {
       // console.log(index);
    }, 1000);
    //kører hele linjen efter 1 sec.
   // console.log(index)
    //6 bliver printet ud 6 gange, da var er et global scope, så den tager den sidste værdi.
}