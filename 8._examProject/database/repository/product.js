import connection from "../../database/conectMysql.js"

export async function getProduct() {
    return await new Promise(async (resolve, reject) => {
        try {
            const [rows] = await connection.execute("SELECT * FROM product")
            rows ? resolve(rows) : resolve(null)
        } catch {
            error => reject(error)
        }
    })
} 
