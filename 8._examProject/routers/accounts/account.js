import express from "express"
const router = express.Router()

import * as accountRepo from "../../database/repository/account.js"
import escape from "escape-html"
import { isAuthorized } from '../../util/authentication.js'



router.get("/api/account", isAuthorized, async (req, res) => {
    const [account] = await accountRepo.getAccount(req.session.accountID)
    account ? res.send(account) : res.status(500)
})

router.get("/api/account/username", isAuthorized, async (req, res) => {
    res.send({accountsUsername: req.session.username})
})


router.get("/api/account/role", isAuthorized, async (req, res) => {
    res.send({accountRole: req.session.accountRole})
})

router.get("/api/account/roleAndVerified", isAuthorized, async (req, res) => {
    res.send({accountRole: req.session.accountRole, isVerified: req.session.isVerified})
})

router.put("/api/account/role", isAuthorized, async (req, res) => {
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

router.put("/api/account/change-username", isAuthorized, async (req, res) => {
    const username = escape(req.body.newUsername)
    const accountsid = escape(req.session.accountID)

    const doesUserExist = await accountRepo.getAccountBasedOnName(username)

    if(doesUserExist.length < 1) {
    const result = await accountRepo.updateUsername(username, accountsid)

        if (result) {
            res.sendStatus(200)
            req.session.username = username
        } else {
            res.sendStatus(500)
        }
    } else {
        res.sendStatus(409)
    }
})

export default router