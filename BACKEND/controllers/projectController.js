const Project = require("../models1/Project");

// GET all projects
exports.getProjects = async (req, res) => {
  try {
    const projects = await Project.find();
    res.json(projects);
  } catch (error) {
    res.status(500).json({ message: "Error fetching projects" });
  }
};

// POST add project
exports.addProject = async (req, res) => {
  try {
    const newProject = new Project(req.body);
    await newProject.save();
    res.json({ message: "Project Added Successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error adding project" });
  }
};