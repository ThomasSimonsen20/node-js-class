

new Promise((resolve, reject) => {
    setTimeout(() => {
        try {
            resolve("Everything went well")
        } catch {
            reject("oh no!")
        }
    }, 4000)

})
// .then(message => console.log(message))
// .catch(errorMessage => console.log("Error was:", errorMessage)) //er en promise catch.

// Create a promise that resolves with "Noice" or rejects with "damn".
// no need to handle the promise

function nodeIsAMood() {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            try {
                resolve("Noice")
            } catch {
                reject("Damn")
            }
        }, 3000)
    })
}

//handle the promise

// nodeIsAMood()
// .then(console.log)
// .catch(console.log)
 
(async function asynchronousFunction() {
    try {
        const message = await nodeIsAMood()
        console.log(message)
    } catch {
        console.log(errorMessage)
    }
    
})() //kalder metode selv. når der er () rundt om. 

