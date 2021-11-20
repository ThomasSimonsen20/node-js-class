fetch("/api/project/" + localStorage.getItem('id'))
    .then(response => response.json())
    .then(( project ) => { 
        document.getElementById('id').value = project.id,
        document.getElementById('name').value = project.name,
        document.getElementById('category').value = project.category,
        document.getElementById('language').value = project.language,
        document.getElementById('technologies').value = project.technologies,
        document.getElementById('githubLink').value = project.githubLink
    })

function updateProject() {
    fetch("/api/projects", {
        method: "PUT",
        headers: { "Content-type": "application/json; charset=UTF-8" },
        body: JSON.stringify({
            id: document.getElementById("id").value,
            name: document.getElementById("name").value,
            category: document.getElementById("category").value,
            language: document.getElementById("language").value,
            technologies: document.getElementById("technologies").value,
            githubLink: document.getElementById("githubLink").value,
        })}).then(response => {
        if (response.status === 200) {
            location.href= "/dashboard"
        } else {
            console.log("Error sending the contact message", response.status);
        }
    });
}
  
document.getElementById("update-button").addEventListener("click", updateProject);
