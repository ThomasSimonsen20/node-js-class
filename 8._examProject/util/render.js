import fs from 'fs'

const header = fs.readFileSync("./public/components/header/header.html", "utf-8")
const headerFree = fs.readFileSync("./public/components/header/freeHeader.html", "utf-8")


export function createPage(path, options = {title : "WatchedFlix"}) {
    return (header + fs.readFileSync(`./public/pages/${path}`, "utf-8"))
    .replace("%%DOCUMENT_TITLE%%", options.title)
}

export function createPageFree(path, options = {title : "WatchedFlix"}) {
    return (headerFree + fs.readFileSync(`./public/pages/${path}`, "utf-8"))
    .replace("%%DOCUMENT_TITLE%%", options.title)
}

export function createPageWithoutHeader(path, options = {title : "WatchedFlix"}) {
    return (fs.readFileSync(`./public/pages/${path}`, "utf-8"))
    .replace("%%DOCUMENT_TITLE%%", options.title)
}




