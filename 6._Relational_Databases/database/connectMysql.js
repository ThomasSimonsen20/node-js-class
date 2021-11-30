import dotenv from "dotenv"
dotenv.config()

import mysql from "mysql2/promise"

console.log(process.env.navnfraENV)

const connection = await mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'password',
    database: 'schools'
})

export default connection