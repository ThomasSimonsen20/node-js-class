function login() {
    fetch("/login/admin", {
        method: "POST",
        headers: { "Content-Type": "application/json; charset=UTF-8" },
        body: JSON.stringify({
            accountName: document.getElementById("accountName").value,
            password: document.getElementById("password").value
        })
    }).then(res => {
        if (res.status == 200) {
            location.href= "/dashboard"
        }
        else {
            console.log("it failed")
        }
    }) 
}

document.getElementById("login-button").addEventListener("click", login)