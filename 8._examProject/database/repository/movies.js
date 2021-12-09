import connection from "../../database/conectMysql.js"


export async function getMoviesFromID(accountsID) {
    return await new Promise(async (resolve, reject) => {
        try {
            const [rows] = await connection.execute("SELECT * FROM movies WHERE accountsid = ?", 
            [accountsID]) 
              
            rows ? resolve(rows) : resolve(null)
        } catch {
            error => reject(error)
        }
    })
} 


export async function insertMovie(movie) {
    return await new Promise(async (resolve, reject) => {
        try {
            const [rows] = await connection.execute("INSERT INTO movies (movietitle, movieimdb, movieposter, movierating, accountsid) VALUES (?,?,?,?,?)"
            ,[movie.movietitle, movie.movieimdb, movie.movieposter, movie.movierating, movie.accountsid])
            
            resolve(true)
        } catch {
            error => reject(error)
        }
    })
} 

export async function deleteMovie(movieID) {
    return await new Promise(async (resolve, reject) => {
        try {
            await connection.execute('DELETE FROM movies WHERE idmovies = ?', [movieID])
            
            resolve(true)
        } catch {
            error => reject(error)
        }
    })
} 