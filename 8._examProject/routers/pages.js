import express from "express"
const router = express.Router()

import createPage from "../util/render.js"

const frontpagePage = createPage("searchForMovies/searchForMovies.html")
const movieDetailsPage = createPage("movieDetails/movieDetails.html")
const loginPage = createPage("login/login.html")
const createAccountPage = createPage("createAccount/createAccount.html")

router.get("/", (req, res) => {
    res.send(frontpagePage)
})

router.get("/movieDetails", (req, res) => {
    res.send(movieDetailsPage)
})

router.get("/login", (req, res) => {
    res.send(loginPage)
})

router.get("/createAccount", (req, res) => {
    res.send(createAccountPage)
})

export default router