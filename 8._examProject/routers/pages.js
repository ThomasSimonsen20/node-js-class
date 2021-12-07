import express from "express"
const router = express.Router()

import createPage from "../util/render.js"

const frontpagePage = createPage("searchForMovies/searchForMovies.html")
const movieDetailsPage = createPage("movieDetails/movieDetails.html", { title: "Movie detail - WatchedFlix"})
const loginPage = createPage("login/login.html")
const createAccountPage = createPage("createAccount/createAccount.html")
const watchedMoviesPage = createPage("watchedMovies/watchedMovies.html")
const successPage = createPage("payment/successPage/success.html")
const accountSettingsPage = createPage("accountSettings/accountSettings.html")

router.get("/", (req, res) => {
    res.send(frontpagePage)
})

router.get("/movie-details", (req, res) => {
    res.send(movieDetailsPage)
})

router.get("/login", (req, res) => {
    res.send(loginPage)
})

router.get("/create-account", (req, res) => {
    res.send(createAccountPage)
})

router.get("/watched-movies", (req, res) => {
    res.send(watchedMoviesPage)
})

router.get("/successful-payment", (req, res) => {
    res.send(successPage)
})

router.get("/account-settings", (req, res) => {
    res.send(accountSettingsPage)
})



export default router