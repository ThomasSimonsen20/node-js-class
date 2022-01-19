import connection from "../connectMysql.js"


export async function getAccount(accountID) {
    return await new Promise(async (resolve, reject) => {
        try {
            const [rows] = await connection.execute("SELECT * FROM accounts WHERE idaccounts = ? ", [accountID])
            rows ? resolve(rows) : resolve(null)
        } catch {
            error => reject(error)
        }
    })
} 


export async function createAccount(account) {
    return await new Promise(async (resolve, reject) => {
        try {
            const [rows] = await connection.execute("INSERT INTO accounts (accountsUsername, accountsPassword, accountsRole, accountsEmail) VALUES (?,?,?,?)",
            [account.accountsUsername, account.accountsPassword, account.accountsRole, account.accountsEmail])

            resolve(rows)
        } catch {
            error => reject(error)
        }
    })
} 

export async function getAccountBasedOnName(username) {
    return await new Promise(async (resolve, reject) => {
        try {
            const [rows] = await connection.execute("SELECT * FROM accounts WHERE accountsUsername = ?", 
            [username])

            resolve(rows)
        } catch {
            error => reject(error)
        }
    })
} 

export async function updateAccountRole(role, accountsId) {
    return await new Promise(async (resolve, reject) => {
        try {
            await connection.execute("UPDATE accounts SET accountsRole = ? WHERE idaccounts = ?",
            [role, accountsId])
            
            resolve(true)
        } catch {
            error => reject(error)
        }
    })
} 

export async function updateUsername(name, accountsId) {
    return await new Promise(async (resolve, reject) => {
        try {
            await connection.execute("UPDATE accounts SET accountsUsername = ? WHERE idaccounts = ?",
            [name, accountsId])
            
            resolve(true)
        } catch {
            error => reject(error)
        }
    })
} 

export async function updateAccountPassword(password, accountsId) {
    return await new Promise(async (resolve, reject) => {
        try {
            await connection.execute("UPDATE accounts SET accountsPassword = ? WHERE idaccounts = ?",
            [password, accountsId])
            
            resolve(true)
        } catch {
            error => reject(error)
        }
    })
} 


export async function updateIsVerified(isVerified, accountsId) {
    return await new Promise(async (resolve, reject) => {
        try {
            await connection.execute("UPDATE accounts SET isVerified = ? WHERE idaccounts = ?",
            [isVerified, accountsId])
            
            resolve(true)
        } catch {
            error => reject(error)
        }
    })
} 




