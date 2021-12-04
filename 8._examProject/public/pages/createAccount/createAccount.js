function submitCreatedAccount() {
    //console.log(document.getElementById("Premium").checked)
    let role

    if (document.getElementById("Premium").checked) {
        role = 1
    } else {
        role = 2
    }

    fetch("/api/accounts", {
        method: "POST",
        headers: { "Content-type": "application/json; charset=UTF-8" },
        body: JSON.stringify({
            accountsUsername: document.getElementById("username").value,
            accountsPassword: document.getElementById("password").value,
            accountsRole: role,
        })  
    }).then(response => {
        if (response.status === 200) {
            location.href= "/"
        } else {
            console.log("Error sending the contact message", response.status);
        }
    });

}

document.getElementById("createAccountButton").addEventListener("click", submitCreatedAccount);