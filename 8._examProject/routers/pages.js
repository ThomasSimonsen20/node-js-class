import express from "express"
const router = express.Router()

import * as createPages from "../util/render.js"
import { isAuthorized, isSupport, isPasswordBeingChanged } from '../util/authentication.js'

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

router.get("/create-account", (req, res) => {
    res.send(createAccountPage)
})

router.get("/forgot-password", (req, res) => {
    res.send(forgotPasswordPage)
})

router.get("/contact", isAuthorized, (req, res) => {
        res.send(contactPage)
}) 

router.get("/change-password", isPasswordBeingChanged, (req, res) => {
        req.session.passwordBeingChanged = false
        res.send(changingPasswordPage)
}) 

router.get("/support", isSupport, (req, res) => {
        res.send(supportPage)
})

router.get("/search-movies",isAuthorized, (req, res) => {
        res.send(searchForMoviesPage)
})

router.get("/movie-details", isAuthorized, (req, res) => {
        res.send(movieDetailsPage)
})

router.get("/watched-movies", isAuthorized, (req, res) => {
        res.send(watchedMoviesPage)
})

router.get("/account-settings", isAuthorized, (req, res) => {
        res.send(accountSettingsPage)
})

router.get("/select-product", isAuthorized, (req, res) => {
        res.send(selectProductPage)
})


export default router