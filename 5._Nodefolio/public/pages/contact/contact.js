function sendContactMessage() {
    fetch("/api/contact", {
        method: "POST",
        headers: { "Content-type": "application/json; charset=UTF-8" },
        body: JSON.stringify({
            name: document.getElementById("name").value,
            email: document.getElementById("email").value,
            message: document.getElementById("message").value,
        })  
    }).then(response => {
        if (response.status === 200) {


            toastr.options = {
                "closeButton": true,
                "debug": false,
                "newestOnTop": false,
                "progressBar": true,
                "positionClass": "toast-top-right",
                "preventDuplicates": false,
                "onclick": null,
                "showDuration": "300",
                "hideDuration": "1000",
                "timeOut": "5000",
                "extendedTimeOut": "1000",
                "showEasing": "swing",
                "hideEasing": "linear",
                "showMethod": "fadeIn",
                "hideMethod": "fadeOut"
              }

            toastr.success('Email has been sent')

            document.getElementById("email").value = ""
            document.getElementById("name").value = ""
            document.getElementById("message").value = ""
              
            
        } else {
            console.log("Error sending the contact message", response.status);
        }
    });
}

document.getElementById("contact-button").addEventListener("click", sendContactMessage);