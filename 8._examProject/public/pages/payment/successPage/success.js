fetch("/api/accounts/role", {
    method: "PUT",
    headers: { "Content-type": "application/json; charset=UTF-8" },
    body: JSON.stringify({
        accountsRole: 4,
    })  
}).then(response => {
    if (response.status === 200) {
        location.href= "/"
    } else {
        console.log("Error sending the contact message", response.status);
    }
});