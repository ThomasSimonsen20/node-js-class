console.log("meow meow")

fetch("https://catfact.ninja/fact")
.then(response => response.json())
.then(result => {
    const catfactsDiv = document.getElementById("cat-facts")
    catfactsDiv.innerText = result.fact;
    console.log(result)

})
