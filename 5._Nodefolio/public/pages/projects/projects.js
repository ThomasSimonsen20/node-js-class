fetch("/api/projects")
.then(response => response.json())
.then(( projects ) => { //({ destructor object, så vi lettere kan hjælpe de forskellige informationer.})
    // group the projects by category (reduce?)


    const projectWrapper = document.getElementById('projects-wrapper')

    projects.map(project => {
        const projectDiv = document.createElement("div")
        projectDiv.innerHTML = `
            <h3>${escapeHTML(project.name)}</h3>
            <p>${escapeHTML(project.category)}</p>
            <p>Technologies: ${escapeHTML(project.technologies)}</p>
            <p>Links: ${escapeHTML(project.githubLink)}</p>
        `

        projectWrapper.appendChild(projectDiv)

    })
})

//<p>Technologies: ${escapeHTML(project.technologies.join(", "))}</p>