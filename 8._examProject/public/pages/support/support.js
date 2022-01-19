const socket = io()

const messageContainer = document.getElementById('message-container')
const messageForm = document.getElementById('send-container')
const messageInput = document.getElementById('message-input')
const correctUser = document.getElementById('correct-user-input')
let currentClient
let users = []

appendMessage('Waiting for user to connect')

socket.on('chat-message-support', data => {
  appendMessage(`${data.name}: ${data.message}`)
})


socket.on('user-connected-support', data => {
  currentClient = {id: data.id, name: data.name}
  users.push(currentClient)
  showUsers()
})

socket.on('user-disconnected-support', name => {
  users.map((user, index) => {
    if(user.name.toLowerCase() === name.toLowerCase()) {
      users.splice(index, 1)
      showUsers()
    } 
})
})

messageForm.addEventListener('submit', e => {
  let count = 0
  e.preventDefault()
  users.map((user) => {
    if(user.name.toLowerCase() === correctUser.value.toLowerCase()) {
      const message = messageInput.value
      appendMessage(`To ${user.name.toLowerCase()}: ${message}`)
      socket.emit('send-chat-message-client', message, user.id)
      messageInput.value = ''
      count = 1
    } 
  })

  if(count === 0) {
    toastr.info("Please type name on a connected user :)")
  }

  count = 0
  
})

function showUsers() {
  const showUserContainer = document.getElementById("show-user-container")
  showUserContainer.innerHTML = ""
  
  users.map((user) => {
    const showUserDiv = document.createElement("div")
    showUserDiv.classList.add("show-user")
    showUserDiv.innerHTML = `
    <div>
      <p class="connected-users">${(user.name)}</p>    
    </div>
    `

    showUserContainer.appendChild(showUserDiv)
  })

}

function appendMessage(message) {
  const messageElement = document.createElement('div')
  messageElement.innerText = message
  messageContainer.append(messageElement)
}