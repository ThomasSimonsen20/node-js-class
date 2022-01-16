import express from "express"
import * as moviesRepo from "../database/repository/moviesRepo.js"
import escape from "escape-html"
import { isAuthorized } from '../util/authentication.js'


const router = express.Router()

let movies

router.get("/api/movies/current", isAuthorized, async (req, res) => {
    res.send({movies: movies, accountRole: req.session.accountRole})
}) 

router.get("/api/movies", isAuthorized, async (req, res) => {

    const result = await moviesRepo.getMoviesFromID(req.session.accountID)
    movies = result

    res.send(result)
}) 

router.patch("/api/movies", isAuthorized, async (req, res) => {

    let movie = {
        movierating: escape(req.body.movierating),
        accountsid: req.session.accountID,
        movieimdb: escape(req.body.movieimdb)
    }

    const result = await moviesRepo.updateMovieRating(movie)

    result ? res.sendStatus(200) : res.sendStatus(500)
})

router.post("/api/movies", isAuthorized, async (req, res) => {
    
    let movie = {
        movietitle: escape(req.body.movietitle),
        movieimdb: escape(req.body.movieimdb),
        movieposter: escape(req.body.movieposter),
        movierating: escape(req.body.movierating),
        accountsid: req.session.accountID
    }

    const result = await moviesRepo.insertMovie(movie)

    result ? res.sendStatus(200) : res.sendStatus(500)
})

router.delete("/api/movies", isAuthorized, async (req, res) => {
    const movieID = req.body.id

    const result = await moviesRepo.deleteMovie(movieID)

    result ? res.sendStatus(200) : res.sendStatus(500)
})



export default router