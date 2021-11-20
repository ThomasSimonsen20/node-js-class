fetch("/api/projects")
.then(response => response.json())
.then(( projects ) => { 

    const projectWrapper = document.getElementById('projects-wrapper')

    projects.map(project => {
        const projectDiv = document.createElement("div")
        projectDiv.classList.add("project-container")
        projectDiv.innerHTML = `
            <div class="project-card">
                <div class="project-card-headline">
                    <p class="projectId">ID: ${project.id}</p>
                    <h3 class="projectName">${escapeHTML(project.name)}</h3>
                </div>
                <p class="projectCategory">Category: ${escapeHTML(project.category)}</p>
                <p class="projectLanguage">Language: ${escapeHTML(project.language)}</p>
                <p class="projectTechnologies">Technologies: ${escapeHTML(project.technologies)}</p>
                <p class="ProjectGithubLink">Links: ${escapeHTML(project.githubLink)}</p>
            </div>
            <div class="btn-container">
                <button class="btn" onclick="update(${project.id})">Update</button>
                <button class="btn btn-delete" onclick="deleting(${project.id})">Delete</button>
                </div>
        `
        projectWrapper.appendChild(projectDiv)

    })
})

function deleting(value){
    const dataObject = {id: value}

    fetch('/api/projects/', { 
        method: 'DELETE',   
        headers: {'Content-Type': 'application/json; charset=UTF-8'}, 
        body: JSON.stringify(dataObject)})
        .then(function (response) {
            if (response.ok) {
                location.href= "/dashboard"
                console.log("success")
            }
            throw new Error('Request failed.')
        })
        .catch(function (error) {
            console.log(error)
        })
        
    }

function update(value) {
    localStorage.setItem('id', value)
    location.href = "/updateProject"
}

