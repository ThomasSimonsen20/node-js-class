import fs from 'fs'

const header = fs.readFileSync("./public/components/header/header.html", "utf-8")
const footer = fs.readFileSync("./public/components/footer/footer.html", "utf-8")

function createPage(path) {
    return (header + fs.readFileSync(`./public/pages/${path}`, "utf-8") + footer)
}

export default createPage
