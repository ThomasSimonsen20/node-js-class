const socket = io()

const messageContainer = document.getElementById('message-container')
const messageForm = document.getElementById('send-container')
const messageInput = document.getElementById('message-input')
let currentClient
/*
const name = prompt('What is your name?')
appendMessage('You joined')
socket.emit('new-user', name) */
appendMessage('Waiting for user to connect')

socket.on('chat-message-admin', data => {
  currentClient = data.id 
  appendMessage(`${data.name}: ${data.message}`)
})

socket.on('user-connected-admin', name => {
  appendMessage(`${name} connected`)
})

socket.on('user-disconnected-admin', name => {
  appendMessage(`${name} disconnected`)
})

messageForm.addEventListener('submit', e => {
  e.preventDefault()
  const message = messageInput.value
  appendMessage(`You: ${message}`)
  socket.emit('send-chat-message-client', message, currentClient)
  messageInput.value = ''
})

function appendMessage(message) {
  const messageElement = document.createElement('div')
  messageElement.innerText = message
  messageContainer.append(messageElement)
}