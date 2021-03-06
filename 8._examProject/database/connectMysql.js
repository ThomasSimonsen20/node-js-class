import dotenv from "dotenv"
dotenv.config()

import mysql from "mysql2/promise"

const connection = await mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: 'watchedmovies'
})

export default connection