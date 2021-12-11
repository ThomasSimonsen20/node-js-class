function login() {
    fetch("/api/accounts/login", {
        method: "POST",
        headers: { "Content-Type": "application/json; charset=UTF-8" },
        body: JSON.stringify({
            accountsUsername: document.getElementById("accountName").value,
            accountsPassword: document.getElementById("password").value
        })
    }).then(res => {
        if (res.status == 200) {
            location.href= "/search-movies"
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