const fs = require("fs")

const header = fs.readFileSync("./public/globals/components/header/header.html", "utf-8")
const footer = fs.readFileSync("./public/globals/components/footer/footer.html", "utf-8")

function createPage(path, options = {title : "Nodefolio"}) {
    return (header + fs.readFileSync(`./public/${path}`, "utf-8") + footer)
            .replace("%%DOCUMENT_TITLE%%", options.title)
}

module.exports = {
    createPage
}