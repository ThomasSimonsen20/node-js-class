import connection from "../../database/conectMysql.js"


export async function getAccounts() {
    return await new Promise(async (resolve, reject) => {
        try {
            const [rows] = await connection.execute("SELECT * FROM accounts")
            rows ? resolve(rows) : resolve(null)
        } catch {
            error => reject(error)
        }
    })
} 

export async function createAccount(account) {
    return await new Promise(async (resolve, reject) => {
        try {
            const [rows] = await connection.execute("INSERT INTO accounts (accountsUsername, accountsPassword, accountsRole) VALUES (?,?,?)",
            [account.accountsUsername, account.accountsPassword, account.accountsRole])

            resolve(rows)
        } catch {
            error => reject(error)
        }
    })
} 

export async function login(username) {
    return await new Promise(async (resolve, reject) => {
        try {
            const [rows] = await connection.execute(`
            SELECT * FROM accounts WHERE accountsUsername = ?`, [username])

            resolve(rows)
        } catch {
            error => reject(error)
        }
    })
} 

export async function updateAccountRole(role, accountsId) {
    return await new Promise(async (resolve, reject) => {
        try {
            await connection.execute('UPDATE accounts SET accountsRole = ? WHERE idaccounts = ?',
            [role, accountsId])
            
            resolve(true)
        } catch {
            error => reject(error)
        }
    })
} 




