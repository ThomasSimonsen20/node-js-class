const domainURL = "http://www.omdbapi.com/?s="
const apiKey = "&apikey=1a8a35cb"


function getMoviesFromAPI() {
    const movieWrapper = document.getElementById("movies-wrapper")
    movieWrapper.innerHTML = ""

    fetch(domainURL + document.getElementById("title").value + apiKey)
    .then(response => response.json())
    .then(( data ) => {
        let movies = data.Search

        
        movies.map(movie => {
            if(movie.Poster === "N/A") {
                movie.Poster = "../images/noPicture.jpg"
            }

            const movieDiv = document.createElement("div")
            movieDiv.classList.add("movie-container")
            movieDiv.innerHTML = `
            <div class="movieCard">
                <div class="movieTitle-container">
                    <h3 class="movieTitle">${(movie.Title)}</h3>
                </div>
                <img class="moviePoster" src="${(movie.Poster)}">
                <div class="btnDetails-container">
                    <a class="btnDetails" id="btnDetails" onclick="movieSelected('${(movie.imdbID)}')">Movie Details</a>
                </div>
            </div>
            `

            movieWrapper.appendChild(movieDiv)
        })
    }) 
}

function movieSelected(value) {
    localStorage.setItem('movieID', value)
    location.href = "/movie-details"
} 


document.getElementById("movie-button").addEventListener("click", getMoviesFromAPI)
document.getElementById("title").addEventListener("keyup", (event) => {
    if (event.keyCode === 13) {
      event.preventDefault()
      document.getElementById("movie-button").click()
    }
  });