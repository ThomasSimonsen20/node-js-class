function changePassword() {
    fetch("/api/accounts/change-password-without-current-password", {
        method: "PUT",
        headers: { "Content-type": "application/json; charset=UTF-8" },
        body: JSON.stringify({
            newPasswordOne: document.getElementById("newPasswordOne").value,
            newPasswordTwo: document.getElementById("newPasswordTwo").value
        })  
    }).then(response => {
        if (response.status === 200) {
            location.href= "/"
        } else {
            console.log("Error changing password", response.status)
        }
    })
}


document.getElementById("updatePassword").addEventListener("click", changePassword);