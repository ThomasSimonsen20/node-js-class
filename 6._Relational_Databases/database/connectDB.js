import sqlite3 from "sqlite3"
import { open } from "sqlite"

export let connection;

(async () => {
    connection = await open({ //await gør det her til en promsie
        filename: "./games.db", //behøver ikk at være .db
        driver: sqlite3.Database
    })
})()

export async function createConnection() {
    return await open({ //await gør det her til en promsie
        filename: "./games.db", //behøver ikk at være .db
        driver: sqlite3.Database
    })
}

