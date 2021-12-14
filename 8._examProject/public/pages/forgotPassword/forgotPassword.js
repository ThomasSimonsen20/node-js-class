function sendResetPasswordEmail() {
    fetch("/api/accounts/forgot-password", {
        method: "POST",
        headers: { "Content-type": "application/json; charset=UTF-8" },
        body: JSON.stringify({
            accountsUsername: document.getElementById("accountName").value,
        })  
    }).then(response => {
        if (response.status === 200) {
            document.getElementById("hidden-text").style.display = "block"
            document.getElementById("accountName").value = ""
        } else {
            console.log("error to send email", response.status)
        }
    })
}

document.getElementById("sendEmail").addEventListener("click", sendResetPasswordEmail)