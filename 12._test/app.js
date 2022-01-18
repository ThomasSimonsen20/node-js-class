import express from "express"
const app = express()

import testRouter from "./router.js"

app.use(testRouter)

const PORT = process.env.PORT || 8080

app.listen(PORT, (error) => {
    console.log("server is running on ", PORT)
})