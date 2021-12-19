import express from "express"
const router = express.Router()

import * as accountRepo from "../../database/repository/account.js"
import escape from "escape-html"

router.get("/api/account", async (req, res) => {
    const [account] = await accountRepo.getAccount(req.session.accountID)
    account ? res.send(account) : res.status(500)
})

router.get("/api/account/username", async (req, res) => {
    res.send({accountsUsername: req.session.username})
})


router.get("/api/account/role", async (req, res) => {
    res.send({accountRole: req.session.accountRole})
})

router.put("/api/accounts/role", async (req, res) => {
    const role = escape(req.body.accountsRole)
    const accountsid = escape(req.session.accountID)

    const result = await accountRepo.updateAccountRole(role, accountsid)

    if (result) {
        req.session.accountRole = role
        res.sendStatus(200)
    } else {
        res.sendStatus(500)
    }
})

export default router