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
            accountsEmail: document.getElementById("email").value,

            accountsRole: role,
        })  
    }).then(response => {
        if (response.status === 200) {
            if(role == 1) {
                checkout()
            } else {
                location.href= "/"
            }
            
        } else {
            console.log("Error sending the contact message", response.status)
        }
    });

}

function checkout() {

    fetch("/create-checkout-session", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            items: [
            { id: 1, quantity: 1 }
        ],
        }),
        })
        .then(res => {
            if (res.ok) return res.json()
        })
        .then(({ url }) => {
            window.location = url
        })
        .catch(e => {
            console.error(e.error)
        }) 
  
}

document.getElementById("createAccountButton").addEventListener("click", submitCreatedAccount);