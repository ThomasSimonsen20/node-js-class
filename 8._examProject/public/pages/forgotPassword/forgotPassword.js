function sendResetPasswordEmail() {
    fetch("/api/account/forgot-password", {
        method: "POST",
        headers: { "Content-type": "application/json; charset=UTF-8" },
        body: JSON.stringify({
            accountsUsername: document.getElementById("accountName").value,
        })  
    }).then(response => {
        if (response.status === 200) {
            toastr.info("Email has been sent, please check your eamil and follow the steps")
            document.getElementById("accountName").value = ""
        } else {
            console.log("error to send email", response.status)
        }
    })
}

document.getElementById("sendEmail").addEventListener("click", sendResetPasswordEmail)