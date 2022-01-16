
fetch("/api/account/roleAndVerified")
.then(response => response.json())
.then(( account ) => {
    let isVerified = account.isVerified

    if(isVerified === 0) {
        document.getElementById("verify-hidden-text").style.display = "block";

    } else {
        document.getElementById("upgradeButton").addEventListener("click", checkout);
    }
})

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

function sendLink() {
    fetch("/api/account/resend-verification", {
        method: "POST",
        headers: { "Content-type": "application/json; charset=UTF-8" }
    }).then(response => {
        if (response.status === 200) {
            toastr.info("New email has been sent")

        } else {
            console.log("Error sending the contact message", response.status)
        } 
    })
}

//document.getElementById("upgradeButton").addEventListener("click", checkout);