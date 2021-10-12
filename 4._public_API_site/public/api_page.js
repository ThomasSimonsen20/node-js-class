const tbody = document.querySelector('tbody')

function fetchCountry(countryName) {
    fetch("https://covid-api.mmediagroup.fr/v1/cases?country=" + firstLetterBig(countryName))
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

function firstLetterBig(str) {
    const strLowerCase = str.toLowerCase()
    const strFirstLetterUpperCase = strLowerCase.charAt(0).toUpperCase() + strLowerCase.slice(1)
    return strFirstLetterUpperCase
}



