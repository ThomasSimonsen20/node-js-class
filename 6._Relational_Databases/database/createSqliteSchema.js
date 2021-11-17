import { createConnection } from "./connectDB.js";

(async () => {
    const connection = await createConnection()

    await connection.exec("DROP TABLE IF EXISTS games")

    const gamesTableSchema = 
        `CREATE TABLE games (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            title TEXT NOT NULL,
            genre TEXT,
            price DOUBLE
        )`
    
    await connection.exec(gamesTableSchema)
})()