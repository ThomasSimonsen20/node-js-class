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
            location.href= "/"
        }
        else {
            console.log("it failed")
        }
    }) 
}

document.getElementById("login-button").addEventListener("click", login)