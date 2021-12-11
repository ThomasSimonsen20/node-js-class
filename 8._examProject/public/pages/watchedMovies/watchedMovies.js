
fetch("/api/movies")
.then(response => response.json())
.then(( data ) => {
    const movieWrapper = document.getElementById("movies-wrapper")
    movieWrapper.innerHTML = ""


        data.sort((a, b) => {
            return b.movierating - a.movierating
        });

        //console.log(data)
  
        data.map((movie) => {
            const movieDiv = document.createElement("div")
            movieDiv.classList.add("movie-container")
            movieDiv.innerHTML = `
            <div class="movieCard">
                <div class="movieTitle-container">
                    <h3 class="movieTitle">${(movie.movietitle)}</h3>
                </div>
                <img class="moviePoster" src="${(movie.movieposter)}">
                <p>${(movie.movierating)} / 5</p>
                <div class="btnDetails-container">
                    <a class="btnDetails" id="btnDetails" onclick="movieSelected('${(movie.movieimdb)}')">Movie Details</a>
                    <a class="btn btn-delete" onclick="deleting(${movie.idmovies})">Delete</a>
                </div>
            </div>

            `
            movieWrapper.appendChild(movieDiv)
        })
    }) 

function movieSelected(value) {
    console.log(value)
    localStorage.setItem('movieID', value)
    location.href = "/movie-details"
} 

function deleting(value){
    const dataObject = {id: value}
    console.log(dataObject)

    fetch('/api/movies/', { 
        method: 'DELETE',   
        headers: {'Content-Type': 'application/json; charset=UTF-8'}, 
        body: JSON.stringify(dataObject)})
        .then((response) => {
            if (response.ok) {
                location.href= "/watched-movies"
                console.log("success")
            }
            throw new Error('Request failed.')
        })
        .catch((error) => {
            console.log(error)
        }) 
        
}


