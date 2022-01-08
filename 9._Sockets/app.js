import express from "express"
const app = express()

import http from "http"
const server = http.createServer(app)

import { Server } from "socket.io"
const io = new Server(server)

import path from "path"

import escapeHTML from "escape-html"
/*
io.on("connection", (socket) => {
    //console.log("Welcome ", socket.id);

    socket.on("clientChooseColor", color => {

        //udsender til andre men ikke sig selv.
        // socket.broadcast.emit("the server is sending the new color", color)


        //only changes the socket itself
        //socket.emit("the server is sending the new color", color)

        //emits to all sockets in the namespace
        io.emit("the server is sending the new color", escapeHTML(color))

    })

    //socket.on("disconnect", () => console.log("Goodbye", socket.id))
}) */

const users = {}

io.on('connection', socket => {
  socket.on('new-user', name => {
    users[socket.id] = name
    socket.broadcast.emit('user-connected', name)
  })
  socket.on('send-chat-message', message => {
    socket.broadcast.emit('chat-message', { message: message, name: users[socket.id] })
  })
  socket.on('disconnect', () => {
    socket.broadcast.emit('user-disconnected', users[socket.id])
    delete users[socket.id]
  })
})



app.get("/", (req, res) => {
    res.sendFile(path.resolve() + "/public/colors.html")
})

server.listen(8080, (error) => {
    console.log("Listen on", 8080)
})