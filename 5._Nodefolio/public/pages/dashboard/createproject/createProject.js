function createProject() {
    fetch("/api/projects", {
        method: "POST",
        headers: { "Content-type": "application/json; charset=UTF-8" },
        body: JSON.stringify({
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

document.getElementById("create-button").addEventListener("click", createProject);
