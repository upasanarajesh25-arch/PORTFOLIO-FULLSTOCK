async function loadProjects() {
  const projectList = document.getElementById("projectList");

  try {
    const response = await fetch("http://localhost:5000/api/projects");
    const projects = await response.json();

    projectList.innerHTML = "";

    projects.forEach((p) => {
      projectList.innerHTML += `
        <div class="project-card">
          <h3>${p.title}</h3>
          <p>${p.description}</p>
          <p><b>Tech Stack:</b> ${p.techStack}</p>

          <a href="${p.githubLink}" target="_blank">GitHub</a>
          <a href="${p.liveLink}" target="_blank">Live Demo</a>
        </div>
      `;
    });

    if (projects.length === 0) {
      projectList.innerHTML = `<p class="loading">No projects found.</p>`;
    }

  } catch (error) {
    projectList.innerHTML = `<p class="loading">Error loading projects. Check backend server.</p>`;
  }
}

// ADMIN ADD PROJECT FUNCTION
async function addProject() {
  const title = document.getElementById("title").value;
  const description = document.getElementById("description").value;
  const techStack = document.getElementById("techStack").value;
  const githubLink = document.getElementById("githubLink").value;
  const liveLink = document.getElementById("liveLink").value;

  const message = document.getElementById("message");

  if (!title || !description || !techStack || !githubLink) {
    message.style.color = "red";
    message.innerText = "Please fill all required fields!";
    return;
  }

  const projectData = {
    title,
    description,
    techStack,
    githubLink,
    liveLink
  };

  try {
    const response = await fetch("http://localhost:5000/api/projects", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(projectData)
    });

    const result = await response.json();

    message.style.color = "#22c55e";
    message.innerText = "Project Added Successfully ✅";

    document.getElementById("title").value = "";
    document.getElementById("description").value = "";
    document.getElementById("techStack").value = "";
    document.getElementById("githubLink").value = "";
    document.getElementById("liveLink").value = "";

    loadProjects();

  } catch (error) {
    message.style.color = "red";
    message.innerText = "Error adding project ❌";
  }
}

// SCROLL ANIMATION
const sections = document.querySelectorAll(".fade-in");

window.addEventListener("scroll", () => {
  sections.forEach((sec) => {
    const pos = sec.getBoundingClientRect().top;
    const screenHeight = window.innerHeight;

    if (pos < screenHeight - 100) {
      sec.classList.add("show");
    }
  });
});

loadProjects();