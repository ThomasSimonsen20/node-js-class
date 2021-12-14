//let accountRole

fetch("/api/account/role")
.then(response => response.json())
.then((data) => {
    if (data.accountRole === 1 || data.accountRole === '1') {
        document.getElementById("upgrade-container").remove()
    }
})

function checkout() {
        window.location = "/select-product"
}

function changePassword() {
    fetch("/api/accounts/change-password", {
        method: "PUT",
        headers: { "Content-type": "application/json; charset=UTF-8" },
        body: JSON.stringify({
            currentPassword: document.getElementById("currentPassword").value,
            newPasswordOne: document.getElementById("newPasswordOne").value,
            newPasswordTwo: document.getElementById("newPasswordTwo").value
        })  
    }).then(response => {
        if (response.status === 200) {
            document.getElementById("currentPassword").value = ""
            document.getElementById("newPasswordOne").value = ""
            document.getElementById("newPasswordTwo").value = ""
        } else {
            console.log("Error changing password", response.status)
        }
    })
}


document.getElementById("updatePassword").addEventListener("click", changePassword);
document.getElementById("upgradeButton").addEventListener("click", checkout);