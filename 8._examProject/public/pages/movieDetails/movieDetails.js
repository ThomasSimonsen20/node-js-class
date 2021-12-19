const domainURL = "http://www.omdbapi.com/?i="
const apiKey = "&apikey=1a8a35cb"

let isWatchedMovie = null
let accountRole
let movieArrayLength = 0
checkIfMovieAlreadyWatched(localStorage.getItem('movieID'))

fetch(domainURL + localStorage.getItem('movieID') + apiKey)
.then(response => response.json())
.then(( movie ) => {

        let movieRating = 3
        let isWatched = ""
        let onclickFunction = "saveMovieToWatchedList()"
        let buttonText = "Save to watched list"

        if(accountRole === 2 && movieArrayLength === 2) {
            onclickFunction = "goToSelectProduct()"
            buttonText = "Upgrade to add more"
        }


        if (isWatchedMovie) {
            movieRating = isWatchedMovie
            isWatched = "Movie is on watched list"
            onclickFunction = "updateRating()"
            buttonText = "Update Rating"
        }


        const movieWrapper = document.getElementById("movies-wrapper")
        const movieDiv = document.createElement("div")
        movieDiv.classList.add("movie-container")
        movieDiv.innerHTML = `
        <div class="movieCard">
            <div class="info-container">
                <div class="movieTitle-container">
                    <h3 class="movieTitle" id="movietitle">${(movie.Title)}</h3>
                    <p>${(isWatched)}</p>
                </div>
                <ul class="listGroup">
                    <li class="listGroupItem"><strong>Genre:</strong> ${movie.Genre}</li>
                    <li class="listGroupItem"><strong>Released:</strong> ${movie.Released}</li>
                    <li class="listGroupItem"><strong>Rated:</strong> ${movie.Rated}</li>
                    <li class="listGroupItem"><strong>IMDB Rating:</strong> ${movie.imdbRating}</li>
                    <li class="listGroupItem"><strong>Director:</strong> ${movie.Director}</li>
                    <li class="listGroupItem"><strong>Writer:</strong> ${movie.Writer}</li>
                    <li class="listGroupItem"><strong>Actors:</strong> ${movie.Actors}</li>
                </ul>
                <div class="stars" data-rating="${movieRating}">
                    <span class="star">&nbsp;</span>
                    <span class="star">&nbsp;</span>
                    <span class="star">&nbsp;</span>
                    <span class="star">&nbsp;</span>
                    <span class="star">&nbsp;</span>
                </div>
                <div class="btn-container">
                    <a class="btn" href="/search-movies">Back to search</a>
                    <a class="btn" onclick="${onclickFunction}">${buttonText}</a>
                </div>
                
            </div>
            <div class="img-container">
                <img class="moviePoster" id="movieposter" src="${(movie.Poster)}">
            </div>
        </div>
        `
        
        movieWrapper.appendChild(movieDiv)
        loadStars()
  
}) 

function checkIfMovieAlreadyWatched(id) {
    fetch("/api/movies/current")
    .then(response => response.json())
    .then(( data ) => {
        accountRole = data.accountRole

        data.movies.map((movie) => {
            if (movie.movieimdb === id) {
                isWatchedMovie = movie.movierating
            } 
            movieArrayLength += 1
        })
    })
}


function goToSelectProduct() {
    window.location = "/select-product"
}

function saveMovieToWatchedList() {
    fetch("/api/movies", {
        method: "POST",
        headers: { "Content-type": "application/json; charset=UTF-8" },
        body: JSON.stringify({
            movietitle: document.getElementById("movietitle").innerText,
            movieimdb: localStorage.getItem('movieID'),
            movieposter: document.getElementById("movieposter").src,
            movierating: parseInt(document.querySelector('.stars').getAttribute('data-rating')),
        })}).then(response => {
        if (response.status === 200) {
            location.href= "/watched-movies"
        } else {
            console.log("Error sending the contact message", response.status);
        }
    });
}

function updateRating() {
    fetch("/api/movies", {
        method: "PATCH",
        headers: { "Content-type": "application/json; charset=UTF-8" },
        body: JSON.stringify({
            movieimdb: localStorage.getItem('movieID'),
            movierating: parseInt(document.querySelector('.stars').getAttribute('data-rating')),
        })}).then(response => {
        if (response.status === 200) {
            location.href= "/watched-movies"
        } else {
            console.log("Error sending the contact message", response.status)
        }
    });
}


function loadStars(){
    let stars = document.querySelectorAll('.star');
    stars.forEach(function(star){
        star.addEventListener('click', setRating); 
    });
    
    let rating = parseInt(document.querySelector('.stars').getAttribute('data-rating'));
    let target = stars[rating - 1];
    target.dispatchEvent(new MouseEvent('click'));
};

function setRating(ev){
    let span = ev.currentTarget;
    let stars = document.querySelectorAll('.star');
    let match = false;
    let num = 0;
    stars.forEach(function(star, index){
        if(match){
            star.classList.remove('rated');
        }else{
            star.classList.add('rated');
        }
        //are we currently looking at the span that was clicked
        if(star === span){
            match = true;
            num = index + 1;
        }
    });
    document.querySelector('.stars').setAttribute('data-rating', num);
}