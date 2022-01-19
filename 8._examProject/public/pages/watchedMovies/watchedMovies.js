let fetchedMovies

fetch("/api/account/role")
.then(response => response.json())
.then((accountRole) => {
    let role = accountRole.accountRole

    if(role === 2) {
        document.getElementById("free-hidden-text").style.display = "inherit"
    }
})

fetch("/api/movies")
.then(response => response.json())
.then(( data ) => {
        fetchedMovies = data

        if(fetchedMovies.length >= 1) {
            document.getElementById("drop-down-filter").style.display = "flex"
        }

        filterMovies(data)
    })

function filterMovies() {
    const selectedValue = document.getElementById("drop-down-filter").value
    
    if(selectedValue === "sort-high-low") {
        fetchedMovies.sort((firstEle, SecondEle) => {
            return SecondEle.movierating - firstEle.movierating
        })
    } else if (selectedValue === "sort-low-high") {
        fetchedMovies.sort((firstEle, SecondEle) => {
            return firstEle.movierating - SecondEle.movierating
        })
    } else if (selectedValue === "sort-name") {
        fetchedMovies.sort((firstEle, SecondEle) => {
            return firstEle.movietitle.localeCompare(SecondEle.movietitle)
        })
    } else if (selectedValue === "sort-newest") {
        fetchedMovies.sort((firstEle, SecondEle) => {
            return SecondEle.idmovies - firstEle.idmovies
        })
    } 
    displayMovies()
}

function displayMovies() {
    const movieWrapper = document.getElementById("movies-wrapper")
    movieWrapper.innerHTML = ""

    fetchedMovies.map((movie) => {
        const movieDiv = document.createElement("div")
        movieDiv.classList.add("movie-container")
        movieDiv.innerHTML = `
        <div class="movieCard">
            <div class="movieTitle-container">
                <h3 class="movieTitle">${(movie.movietitle)}</h3>
            </div>
            <img class="moviePoster" src="${(movie.movieposter)}">
            <p class="rating"><span class="star">★</span> ${(movie.movierating)} / 5</p>
            <div class="btnDetails-container">
                <a class="btnDetails" id="btnDetails" onclick="movieSelected('${(movie.movieimdb)}')">Movie Details</a>
                <a class="btn btn-delete" onclick="deleting(${movie.idmovies})">Delete</a>
            </div>
        </div>
        `
        movieWrapper.appendChild(movieDiv)
    })
}

function movieSelected(value) {
    localStorage.setItem('movieID', value)
    location.href = "/movie-details"
} 

function deleting(value){
    const dataObject = {id: value}

    fetch('/api/movies/', { 
        method: 'DELETE',   
        headers: {'Content-Type': 'application/json; charset=UTF-8'}, 
        body: JSON.stringify(dataObject)})
        .then((response) => {
            if (response.ok) {
                location.href= "/watched-movies"
                console.log("success")
            }
        })
        .catch((error) => {
            console.log(error)
        }) 
}

