import { connectSqlite } from "./connectSqlite.js"

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
    
    await dbConnection.exec(gamesTableSchema)
})();

(async () => {
    const dbConnection = await connectSqlite()

    await dbConnection.exec("DROP TABLE IF EXISTS secrets")

    const secretsSchema = `
        CREATE TABLE secrets (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            accountName TEXT NOT NULL,
            hash TEXT NOT NULL
        )
    `
    await dbConnection.exec(secretsSchema)
})();

(async () => {
    const dbConnection = await connectSqlite()

    await dbConnection.exec("DROP TABLE IF EXISTS email")

    const emailSchema = `
        CREATE TABLE email (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            accountName TEXT NOT NULL,
            password TEXT NOT NULL
        )
    `
    await dbConnection.exec(emailSchema)
})() 