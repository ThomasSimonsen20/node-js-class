const tbody = document.querySelector('tbody')

function fetchCountry(countryName) {
    fetch("https://covid-api.mmediagroup.fr/v1/cases?country=" + countryName)
    .then(response => response.json())
    .then(result => {
        tbody.innerHTML += 
        `
            <tr>
                <td>${result.All.country}</td>
                <td>${result.All.confirmed}</td>
                <td>${result.All.deaths}</td>
            </tr>
        `;

    })
}



