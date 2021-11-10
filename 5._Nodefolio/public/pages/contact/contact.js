
function sendContactMessage() {
   fetch("/api/contact", {
       method: "POST",
       headers: {"Contest-type": "application/json; charset=UTF-8"},
       body: JSON.stringify({
            name: document.getElementById("name").value,
            email: document.getElementById("email").value,
            message: document.getElementById("message").value,
       })
   }).then(response => {
       if(response.status === 200) {
           console.log("everything went well")
           //redirect efter toastr
       } else {
           console.log("Error sending the contact message", response.status)
       }
   })
}

document.getElementById("contact-button").addEventListener("click", sendContactMessage)