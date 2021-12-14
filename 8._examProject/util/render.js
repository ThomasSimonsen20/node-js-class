import fs from 'fs'

const header = fs.readFileSync("./public/components/header/header.html", "utf-8")
const headerNotLoggedIn = fs.readFileSync("./public/components/header/headerNotLoggedIn.html", "utf-8")



export function createPage(path, options = {title : "WatchedFlix"}) {
    return (header + fs.readFileSync(`./public/pages/${path}`, "utf-8"))
    .replace("%%DOCUMENT_TITLE%%", options.title)
}

export function createPageNotLoggedIn(path, options = {title : "WatchedFlix"}) {
    return (headerNotLoggedIn + fs.readFileSync(`./public/pages/${path}`, "utf-8"))
    .replace("%%DOCUMENT_TITLE%%", options.title)
}


export function createPageWithoutHeader(path, options = {title : "WatchedFlix"}) {
    return (fs.readFileSync(`./public/pages/${path}`, "utf-8"))
    .replace("%%DOCUMENT_TITLE%%", options.title)
}




