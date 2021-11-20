import express from "express"
const app = express()


import helmet from "helmet"
app.use(
    helmet({
      contentSecurityPolicy: false,
    })
  );

import session from "express-session"
app.use(session({
    secret: 'secret',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }
  }))
app.use(express.static('public'))
app.use(express.json())
app.use(express.urlencoded({ extended: true}))

import projectsRouter from "./routers/projects.js"
import pageRouter from "./routers/pages.js"
import contactRouter from "./routers/contact.js"
import sessionRouter from "./routers/session.js"

app.use(projectsRouter)
app.use(pageRouter)
app.use(contactRouter)
app.use(sessionRouter)

const PORT = process.env.PORT || 8080;

app.listen(PORT, (error) => {
    console.log("Server is running on ", PORT)
})