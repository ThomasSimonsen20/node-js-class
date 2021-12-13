let isVerified

fetch("/api/account")
.then(response => response.json())
.then((account) => {
    
    //console.log(account.isVerified)
    isVerified = account.isVerified

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

//document.getElementById("upgradeButton").addEventListener("click", checkout);