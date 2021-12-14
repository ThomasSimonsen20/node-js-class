import dotenv from "dotenv"
dotenv.config()

import express from "express"
const app = express()

import http from "http"
const server = http.createServer(app)
  
import { Server } from "socket.io"
const io = new Server(server)

import session from "express-session"
app.use(session({
    secret: 'secret',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }
  }))
import escape from "escape-html"


app.use(express.static('public'))
app.use(express.json())
app.use(express.urlencoded({ extended: true}))

import pagesRouter from "./routers/pages.js"
import paymentRouter from "./routers/payment.js"
import accountRouter from "./routers/account.js"
import moviesRouter from "./routers/movies.js"
import contactRouter from "./routers/contact.js"

app.use(pagesRouter)
app.use(paymentRouter)
app.use(accountRouter)
app.use(moviesRouter)
app.use(contactRouter)

const users = {}

io.on('connection', (socket) => {
  socket.on('new-user', name => {
    users[socket.id] = name
    socket.broadcast.emit('user-connected-admin', name)
  })
  socket.on('send-message-to-admin', (message) => {
    socket.broadcast.emit('chat-message-admin', { message: escape(message), name: users[socket.id], id: socket.id })
  })
  socket.on('send-chat-message-client', (message, currentClient) => {
    socket.to(currentClient).emit('chat-message', { message: escape(message), name: "Support" })
  })
  socket.on('disconnect', () => {
    socket.broadcast.emit('user-disconnected-admin', users[socket.id])
    delete users[socket.id]
  })
}) 

const PORT = process.env.PORT || 8080

server.listen(PORT, (error) => {
    console.log("Server is running on ", PORT)
})