import express from "express"
import connection from "../database/conectMysql.js"
import bcrypt from "bcrypt"

const router = express.Router()

let accountsid = 1
const saltRounds = 12


router.get("/api/accounts", async (req, res) => {
    const [rows, columns] = await connection.execute("SELECT * FROM accounts")
    res.send(rows)
})

router.get("/api/movies", async (req, res) => {
    const [rows, columns] = await connection.execute("SELECT * FROM movies WHERE accountsid = ?", [accountsid])
    res.send(rows)
})

router.post("/api/movies", async (req, res) => {

    const movietitle = req.body.movietitle
    const movieimdb = req.body.movieimdb
    const movieposter = req.body.movieposter
    const movierating = req.body.movierating
    //accountsid = req.body.accountsid

    const [rows, columns] = await connection.execute("INSERT INTO movies (movietitle, movieimdb, movieposter, movierating, accountsid) VALUES (?,?,?,?,?)"
    ,[movietitle, movieimdb, movieposter, movierating, accountsid])
    res.send(rows)
})

router.post("/api/accounts", async (req, res) => {

    const accountsUsername = req.body.accountsUsername
    const accountsPassword = req.body.accountsPassword
    const accountsRole = req.body.accountsRole

    bcrypt.hash(accountsPassword, saltRounds, async function (err, hash) {

        await connection.execute("INSERT INTO accounts (accountsUsername, accountsPassword, accountsRole) VALUES (?,?,?)",
            [accountsUsername, hash, accountsRole])
            .then(() => res.sendStatus(200))
    });

    //res.send(rows)
})


router.delete("/api/movies", async (req, res) => {
    const id = req.body.id
    await connection.execute('DELETE FROM movies WHERE idmovies = ?', [id])

    res.send()
})

router.post("/login", async (req, res) => {
    const name = req.body.accountsUsername
    const password = req.body.accountsPassword
    
    const [rows, columns] = await connection.execute(`
        SELECT * FROM accounts WHERE accountsUsername = ?`, [name]
    )

    //console.log(rows[0])
    
    if(typeof rows[0].accountsPassword !== 'undefined') {
        bcrypt.compare(password, rows[0].accountsPassword, function(err, result) {
            if (result) {
                accountsid = rows[0].idaccounts
                //req.session.loggedIn = true;
                res.sendStatus(200);
            } else {
                res.sendStatus(400)
            }
        }); 
    }
    
})



export default router