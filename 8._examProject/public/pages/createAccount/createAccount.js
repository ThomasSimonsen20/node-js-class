function submitCreatedAccount() {
    fetch("/api/accounts", {
        method: "POST",
        headers: { "Content-type": "application/json; charset=UTF-8" },
        body: JSON.stringify({
            accountsUsername: document.getElementById("username").value,
            accountsPassword: document.getElementById("password").value,
            accountsEmail: document.getElementById("email").value,
            accountsRole: 2,
        })  
    }).then(response => {
        if (response.status === 200) {
            location.href= "/watched-movies"  
        } 
        /*else {
            console.log("Error sending the contact message", response.status)
        }*/

        if(response.status === 409) {
            toastr.info("Username already registered. Try another")
        }
    })
}


document.getElementById("createAccountButton").addEventListener("click", submitCreatedAccount)