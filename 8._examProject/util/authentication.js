export function isAuthorized(req, res, next) {
    !req.session.loggedIn ? res.redirect("/") : next()
}

export function isSupport(req, res, next) {
    req.session.accountRole === 9 && req.session.loggedIn ? next() : res.redirect("/")
}

export function isPasswordBeingChanged(req, res, next) {
    !req.session.passwordBeingChanged ? res.redirect("/") : next()
}