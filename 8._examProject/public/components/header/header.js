fetch("/api/account")
.then(response => response.json())
.then(( account ) => {
    console.log(account)
    
    freeAndNotVerified()
})

function freeAndVerified() {
    
}

function freeAndNotVerified() {
    document.getElementById("freeshit").style.display = "inline";
    document.getElementById("verified").style.display = "inline";
}

function premium() {

}