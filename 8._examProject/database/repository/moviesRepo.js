import connection from "../connectMysql.js"


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
            await connection.execute("INSERT INTO movies (movietitle, movieimdb, movieposter, movierating, accountsid) VALUES (?,?,?,?,?)"
            ,[movie.movietitle, movie.movieimdb, movie.movieposter, movie.movierating, movie.accountsid])
            
            resolve(true)
        } catch {
            error => reject(error)
        }
    })
} 

export async function updateMovieRating(movie) {
    return await new Promise(async (resolve, reject) => {
        try {
            await connection.execute("UPDATE movies SET movierating = ? WHERE accountsid = ? AND movieimdb = ?"
            ,[movie.movierating, movie.accountsid, movie.movieimdb])
            
            resolve(true)
        } catch {
            error => reject(error)
        }
    })
} 

export async function deleteMovie(movieID) {
    return await new Promise(async (resolve, reject) => {
        try {
            await connection.execute("DELETE FROM movies WHERE idmovies = ?", [movieID])
            
            resolve(true)
        } catch {
            error => reject(error)
        }
    })
} 