
function fetchCountry(countryName) {
    fetch("https://covid-api.mmediagroup.fr/v1/cases?country=" + countryName)
    .then(response => response.json())
    .then(result => {
        document.getElementById("country").append(result.All.country)
        document.getElementById("confirmed").append(result.All.confirmed)
        document.getElementById("deaths").append(result.All.deaths)

    })
}



