fetch("/api/account")
.then(response => response.json())
.then(( account ) => {
    
    if(account.accountsRole === 2 && account.isVerified === 0) {
        freeAndNotVerified()
    } else if (account.accountsRole === 2 && account.isVerified === 1) {
        freeAndVerified()
    } else {
        premium()
    }
})

function freeAndVerified() {
    document.getElementById("freeUser").style.display = "inline";
    document.getElementById("notVerified").style.display = "none";
}

function freeAndNotVerified() {
    document.getElementById("freeUser").style.display = "inline";
    document.getElementById("notVerified").style.display = "inline";
}

function premium() {
    document.getElementById("freeUser").style.display = "none";
    document.getElementById("notVerified").style.display = "none";
}