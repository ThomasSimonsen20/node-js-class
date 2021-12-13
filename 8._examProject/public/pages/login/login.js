function login() {
    fetch("/api/accounts/login", {
        method: "POST",
        headers: { "Content-Type": "application/json; charset=UTF-8" },
        body: JSON.stringify({
            accountsUsername: document.getElementById("accountName").value,
            accountsPassword: document.getElementById("password").value
        })
    })
    .then(res => res.json())
    .then(( data ) => {
        console.log(data.isAdmin)
        if (data.isAdmin) {
            location.href= "/support"
        } else if (!data.isAdmin) {
            location.href= "/watched-movies"
        }
        else {
            console.log("it failed")
        }
    }) 
}


function createNewAccount() {
    location.href = "/create-account"
}

document.getElementById("login-button").addEventListener("click", login)
document.getElementById("createAccount-button").addEventListener("click", createNewAccount)