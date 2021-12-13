let username

fetch("/api/account/username")
.then(response => response.json())
.then((data) => {
    username = data.accountsUsername
    connect()
})

const socket = io()

const messageContainer = document.getElementById('message-container')
const messageForm = document.getElementById('send-container')
const messageInput = document.getElementById('message-input')

async function connect() {
    await socket.emit('new-user', username)
    appendMessage('A support employee is ready to help you, start typing below:')
}

socket.on('chat-message', data => {
  appendMessage(`${data.name}: ${data.message}`)
})

messageForm.addEventListener('submit', e => {
  e.preventDefault()
  const message = messageInput.value
  appendMessage(`You: ${message}`)
  socket.emit('send-message-to-admin', message)
  messageInput.value = ''
})

function appendMessage(message) {
  const messageElement = document.createElement('div')
  messageElement.innerText = message
  messageContainer.append(messageElement)
} 

/*
socket.on('user-connected', name => {
  appendMessage(`${name} connected`)
})

socket.on('user-disconnected', name => {
  appendMessage(`${name} disconnected`)
}) */

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
          document.getElementById("email").value = ""
          document.getElementById("name").value = ""
          document.getElementById("message").value = ""
                
      } else {
          console.log("Error sending the contact message", response.status);
      }
  });
}

document.getElementById("contact-button").addEventListener("click", sendContactMessage);