import { connectSqlite } from "./connectSqlite.js";

(async () => {
    const dbConnection = await connectSqlite()

    await dbConnection.exec("DROP TABLE IF EXISTS projects")

    const gamesTableSchema = 
        `CREATE TABLE projects (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT NOT NULL,
            category TEXT,
            language TEXT,
            technologies TEXT,
            githubLink TEXT
        )`
    
    const createdTable = await dbConnection.exec(gamesTableSchema)
        console.log(createdTable)
})()