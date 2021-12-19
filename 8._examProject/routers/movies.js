import express from "express"
import * as moviesRepo from "../database/repository/moviesRepo.js"
import connection from "../database/conectMysql.js"
import escape from "escape-html"

const router = express.Router()

let accountsid
let movies

router.get("/api/movies/current", async (req, res) => {
    res.send({movies: movies, accountRole: req.session.accountRole})
}) 

router.get("/api/movies", async (req, res) => {

    if(req.session.accountID != null) {
        accountsid = req.session.accountID
    } 

    //const result = moviesRepo.getMoviesFromID(accountsid)
    //result ? res.send(result) : res.sendStatus(500)
   
    const [rows] = await connection.execute("SELECT * FROM movies WHERE accountsid = ?", [accountsid])

    movies = rows
    res.send(rows)
}) 

router.patch("/api/movies", async (req, res) => {

    if(req.session.accountID != null) {
        accountsid = req.session.accountID
    } 
    
    let movie = {
        movierating: escape(req.body.movierating),
        accountsid: accountsid,
        movieimdb: escape(req.body.movieimdb)
    }

    const result = moviesRepo.updateMovieRating(movie)

    result ? res.sendStatus(200) : res.sendStatus(500)
})

router.post("/api/movies", async (req, res) => {

    if(req.session.accountID != null) {
        accountsid = req.session.accountID
    } 
    
    let movie = {
        movietitle: escape(req.body.movietitle),
        movieimdb: escape(req.body.movieimdb),
        movieposter: escape(req.body.movieposter),
        movierating: escape(req.body.movierating),
        accountsid: accountsid
    }

    const result = moviesRepo.insertMovie(movie)

    result ? res.sendStatus(200) : res.sendStatus(500)
})

router.delete("/api/movies", async (req, res) => {
    const movieID = req.body.id

    const result = moviesRepo.deleteMovie(movieID)

    result ? res.sendStatus(200) : res.sendStatus(500)
})



export default router