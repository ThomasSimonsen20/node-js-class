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
                window.location.href = "http://localhost:8080/dashboard"
            }
            throw new Error('Request failed.')
        })
        .catch(function (error) {
            console.log(error)
        })
        
    }

function update(value) {
    const dataObject = {id: value}
    window.location.href = "http://localhost:8080/updateProject"

    fetch('/api/project/', { 
        method: 'GET',   
        headers: {'Content-Type': 'application/json; charset=UTF-8'}, 
        body: JSON.stringify(dataObject)})
        .then(function (response) {
            if (response.ok) {
                document.getElementById("updateName").value = "test"
            }
            throw new Error('Request failed.')
        })
        .catch(function (error) {
            console.log(error)
        })

}

function updateProject() {
    fetch("/api/projects", {
        method: "PUT",
        headers: { "Content-type": "application/json; charset=UTF-8" },
        body: JSON.stringify({
            id: document.getElementById("id").value,
            name: document.getElementById("name").value,
            category: document.getElementById("category").value,
            technologies: document.getElementById("technologies").value,
            githubLink: document.getElementById("githubLink").value,
        })}).then(response => {
        if (response.status === 200) {
            window.location.href = "http://localhost:8080/dashboard"
        } else {
            console.log("Error sending the contact message", response.status);
        }
    });
}
  

function createProject() {
    fetch("/api/projects", {
        method: "POST",
        headers: { "Content-type": "application/json; charset=UTF-8" },
        body: JSON.stringify({
            name: document.getElementById("name").value,
            category: document.getElementById("category").value,
            technologies: document.getElementById("technologies").value,
            githubLink: document.getElementById("githubLink").value,
        })}).then(response => {
        if (response.status === 200) {
            window.location.href = "http://localhost:8080/dashboard"
        } else {
            console.log("Error sending the contact message", response.status);
        }
    });
}

document.getElementById("create-button").addEventListener("click", createProject);