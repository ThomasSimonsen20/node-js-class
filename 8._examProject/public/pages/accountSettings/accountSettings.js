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
    fetch("/api/account/change-password", {
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
            toastr.info("Succesfully changed password")
        }
        
        if (response.status === 400) {
            toastr.info("Passwords doesn't match")
        }

        if (response.status === 409) {
            toastr.info("Current password is incorrect")
        }
    })
}

function changeUsername() {
    fetch("/api/account/change-username", {
        method: "PUT",
        headers: { "Content-type": "application/json; charset=UTF-8" },
        body: JSON.stringify({
            newUsername: document.getElementById("newUsername").value,
        })  
    }).then(response => {
        if (response.status === 200) {
            document.getElementById("newUsername").value = ""
            toastr.info("Succesfully changed username")
        }

        if(response.status === 409) {
            toastr.info("Username already registered. Try another")
        }
    })
}



document.getElementById("updateUsername").addEventListener("click", changeUsername)
document.getElementById("updatePassword").addEventListener("click", changePassword)
document.getElementById("upgradeButton").addEventListener("click", checkout)