import express from "express"
const router = express.Router()

import * as createPages from "../util/render.js"

const searchForMoviesPage = createPages.createPage("searchForMovies/searchForMovies.html")
const movieDetailsPage = createPages.createPage("movieDetails/movieDetails.html", { title: "Movie detail - WatchedFlix"})
const loginPage = createPages.createPageWithoutHeader("login/login.html")
const createAccountPage = createPages.createPageWithoutHeader("createAccount/createAccount.html")
const watchedMoviesPage = createPages.createPage("watchedMovies/watchedMovies.html")
const successPage = createPages.createPage("payment/successPage/success.html")
const accountSettingsPage = createPages.createPage("accountSettings/accountSettings.html")

router.get("/", (req, res) => {
    res.send(loginPage)
})

router.get("/search-movies", (req, res) => {
    //res.send(searchForMoviesPage)
    if(!req.session.loggedIn) {
        res.send(loginPage)
    }

    if(req.session.accountRole === 2) {
        res.send(createPages.createPageFree("searchForMovies/searchForMovies.html"))
    } else {
        res.send(searchForMoviesPage)
    }

    
})

router.get("/movie-details", (req, res) => {
    res.send(movieDetailsPage)
})

/*
router.get("/login", (req, res) => {
    res.send(loginPage)
}) */

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