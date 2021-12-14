import express from "express"
const router = express.Router()

import * as createPages from "../util/render.js"

const searchForMoviesPage = createPages.createPage("searchForMovies/searchForMovies.html")
const movieDetailsPage = createPages.createPage("movieDetails/movieDetails.html", { title: "Movie detail - WatchedFlix"})
const loginPage = createPages.createPageNotLoggedIn("login/login.html")
const createAccountPage = createPages.createPageNotLoggedIn("createAccount/createAccount.html")
const watchedMoviesPage = createPages.createPage("watchedMovies/watchedMovies.html")
const accountSettingsPage = createPages.createPage("accountSettings/accountSettings.html")
const selectProductPage = createPages.createPage("payment/selectProduct/selectProduct.html")
const contactPage = createPages.createPage("contact/contact.html")
const supportPage = createPages.createPageWithoutHeader("support/support.html")
const changingPasswordPage = createPages.createPageWithoutHeader("/changeAccountPassword/changeAccountPassword.html")
const forgotPasswordPage = createPages.createPageNotLoggedIn("/forgotPassword/forgotPassword.html")



router.get("/", (req, res) => {
    res.send(loginPage)
})

router.get("/forgot-password", (req, res) => {
    res.send(forgotPasswordPage)
})


router.get("/contact", (req, res) => {
    if(!req.session.loggedIn) {
        res.send(loginPage)
    } else {
        res.send(contactPage)
    }
}) 

router.get("/change-password", (req, res) => {
    if(!req.session.passwordBeingChanged) {
        res.send(loginPage)
    } else {
        req.session.passwordBeingChanged = false
        res.send(changingPasswordPage)
    }
}) 

router.get("/support", (req, res) => {
    if (req.session.accountRole === 9 && req.session.loggedIn) {
        res.send(supportPage)
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