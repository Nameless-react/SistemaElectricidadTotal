import Projects from "/models/projects.model";

class ProjectsController {
    getProjects = async (req, res) => {
        try {

            const projects = await Projects.findAll();

            const projectData = projects.map(project => project.dataValues);


            return projectData;
        } catch (error) {
            console.error(error);
            res.status(500).send("Error while getting projects");
        }
    };
}

export default ProjectsController;
