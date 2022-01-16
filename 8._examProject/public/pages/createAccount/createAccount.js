const overlay = document.getElementById('overlay')
const modal = document.getElementById('modal')
const isToSChecked = document.getElementById('checkbox')

function submitCreatedAccount() {
    if(!isToSChecked.checked) {
        toastr.info("Please accept Terms of service to continue")
        return
    }

    fetch("/api/account", {
        method: "POST",
        headers: { "Content-type": "application/json; charset=UTF-8" },
        body: JSON.stringify({
            accountsUsername: document.getElementById("username").value,
            accountsPassword: document.getElementById("password").value,
            accountsPasswordTwo: document.getElementById("passwordTwo").value,
            accountsEmail: document.getElementById("email").value,
            accountsRole: 2,
        })  
    }).then(response => {
        if (response.status === 200) {
            location.href= "/watched-movies"  
        } 

        if(response.status === 409) {
            toastr.info("Username already registered. Try another")
        }

        if (response.status === 400) {
            toastr.info("Passwords doesn't match")
        }

    })
}


function openModal() {
    if (modal == null) return
    modal.classList.add('active')
    overlay.classList.add('active')
  }
  
  function closeModal() {
    if (modal == null) return
    modal.classList.remove('active')
    overlay.classList.remove('active')
  }

document.getElementById("close-modal").addEventListener("click", closeModal)
document.getElementById("open-modal").addEventListener("click", openModal)
document.getElementById("createAccountButton").addEventListener("click", submitCreatedAccount)