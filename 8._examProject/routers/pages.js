import express from "express"
const router = express.Router()

import * as createPages from "../util/render.js"

const searchForMoviesPage = createPages.createPage("searchForMovies/searchForMovies.html")
const movieDetailsPage = createPages.createPage("movieDetails/movieDetails.html", { title: "Movie detail - WatchedFlix"})
const loginPage = createPages.createPageWithoutHeader("login/login.html")
const createAccountPage = createPages.createPageWithoutHeader("createAccount/createAccount.html")
const watchedMoviesPage = createPages.createPage("watchedMovies/watchedMovies.html")
const accountSettingsPage = createPages.createPage("accountSettings/accountSettings.html")
const selectProductPage = createPages.createPage("payment/selectProduct/selectProduct.html")
const contact = createPages.createPage("contact/contact.html")
const support = createPages.createPageWithoutHeader("support/support.html")


router.get("/", (req, res) => {
    res.send(loginPage)
})


router.get("/contact", (req, res) => {
    if(!req.session.loggedIn) {
        res.send(loginPage)
    } else {
        res.send(contact)
    }
}) 

router.get("/support", (req, res) => {
    if (req.session.accountRole === 9 && req.session.loggedIn) {
        res.send(support)
    } else {
        res.send(loginPage)
    }
}) 

router.get("/search-movies", (req, res) => {
    if(!req.session.loggedIn) {
        res.send(loginPage)
    } else {
        res.send(searchForMoviesPage)
    }
})

router.get("/movie-details", (req, res) => {
    if(!req.session.loggedIn) {
        res.send(loginPage)
    } else {
        res.send(movieDetailsPage)
    }
})

router.get("/create-account", (req, res) => {
    res.send(createAccountPage)
})

router.get("/watched-movies", (req, res) => {
    if(!req.session.loggedIn) {
        res.send(loginPage)
    } else {
        res.send(watchedMoviesPage)
    }
})

router.get("/account-settings", (req, res) => {
    if(!req.session.loggedIn) {
        res.send(loginPage)
    } else {
        res.send(accountSettingsPage)
    } 
})

router.get("/select-product", (req, res) => {
    if(!req.session.loggedIn) {
        res.send(loginPage)
    } else {
        res.send(selectProductPage)
    } 
})


export default router