router.get("/api/accounts", async (req, res) => {
    const [rows] = await connection.execute("SELECT * FROM accounts")
    res.send(rows) 
})

router.post("/api/accounts", async (req, res) => {

    const accountsUsername = req.body.accountsUsername
    const accountsPassword = req.body.accountsPassword
    const accountsRole = req.body.accountsRole

    bcrypt.hash(accountsPassword, saltRounds, async (err, hash) => {
/*
        await connection.execute("INSERT INTO accounts (accountsUsername, accountsPassword, accountsRole) VALUES (?,?,?)",
            [accountsUsername, hash, accountsRole])
            .then(() => res.sendStatus(200)) 
            */

            const [rows] = await connection.execute("INSERT INTO accounts (accountsUsername, accountsPassword, accountsRole) VALUES (?,?,?)",
            [accountsUsername, hash, accountsRole])
            //.then(() => )
                req.session.accountID = rows.insertId
                accountsid = rows.insertId
                res.sendStatus(200) 
    });

    //res.send(rows)
})

router.post("/login", async (req, res) => {
    const name = req.body.accountsUsername
    const password = req.body.accountsPassword
    
    const [rows] = await connection.execute(`
        SELECT * FROM accounts WHERE accountsUsername = ?`, [name]
    )

    //console.log(rows[0])
    
    if(typeof rows[0].accountsPassword !== 'undefined') {
        bcrypt.compare(password, rows[0].accountsPassword, (err, result) => {
            if (result) {
                req.session.loggedIn = true
                req.session.accountID = rows[0].idaccounts
                res.sendStatus(200)
            } else {
                res.sendStatus(400)
            }
        }); 
    }
})

router.put("/api/accounts", async (req, res) => {
    const role = req.body.accountsRole

    if(req.session.accountID != null) {
        accountsid = req.session.accountID
    }  

    await connection.execute('UPDATE accounts SET accountsRole = ? WHERE idaccounts = ?', [role, accountsid])

    res.send()
})


router.get("/api/movies", async (req, res) => {

    if(req.session.accountID != null) {
        accountsid = req.session.accountID
    } 

    const [rows] = await connection.execute("SELECT * FROM movies WHERE accountsid = ?", [accountsid])
    res.send(rows)
})

router.post("/api/movies", async (req, res) => {

    const movietitle = req.body.movietitle
    const movieimdb = req.body.movieimdb
    const movieposter = req.body.movieposter
    const movierating = req.body.movierating

    if(req.session.accountID != null) {
        accountsid = req.session.accountID
    }    

    const [rows] = await connection.execute("INSERT INTO movies (movietitle, movieimdb, movieposter, movierating, accountsid) VALUES (?,?,?,?,?)"
    ,[movietitle, movieimdb, movieposter, movierating, accountsid])
    res.send(rows)
})

router.delete("/api/movies", async (req, res) => {
    const id = req.body.id
    await connection.execute('DELETE FROM movies WHERE idmovies = ?', [id])

    res.send()
})

/*
router.post("/api/accounts", async (req, res) => {

    const accountsPassword = req.body.accountsPassword

    bcrypt.hash(accountsPassword, saltRounds, async (err, hash) => {

        let account = {accountsUsername: req.body.accountsUsername, accountsPassword: hash, accountsRole: req.body.accountsRole}

        const result = await accountRepo.createAccount(account)

        if(result) {
            req.session.accountID = result.insertId
            res.sendStatus(200) 
        } else {
            res.sendStatus(400)
        }
    });
}) */