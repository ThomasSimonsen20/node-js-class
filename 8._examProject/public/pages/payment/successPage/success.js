fetch("/api/accounts/role", {
    method: "PUT",
    headers: { "Content-type": "application/json; charset=UTF-8" },
    body: JSON.stringify({
        accountsRole: 1,
    })  
}).then(response => {
    if (response.status === 200) {
        setTimeout( () =>{ 
            location.href= "/watched-movies"
         }, 3000)
    } else {
        console.log("Error sending the contact message", response.status)
    }
});