class ProjectsService {
    constructor(projectsRepository) {
        this.projectsRepository = projectsRepository;
    }

    async getProjects() {
        try {
            return await this.projectsRepository.getProjects();
        } catch (error) {
            throw new Error("Error while getting projects: " + error.message);
        }
    }

    async getProjectById(id) {
        try {
            return await this.projectsRepository.getProjectById(id);
        } catch (error) {
            throw new Error("Error while getting the project by ID: " + error.message);
        }
    }

    async createProject(projectData) {
        try {
            return await this.projectsRepository.createProject(projectData);
        } catch (error) {
            throw new Error("Error while creating the project: " + error.message);
        }
    }


    async updateProject(id, projectData) {
        try {
            return await this.projectsRepository.updateProject(id, projectData);
        } catch (error) {
            throw new Error("Error while updating the project: " + error.message);
        }
    }


    /**
     * Deletes a project given its ID
     * @param {number} id - The ID of the project to be deleted
     * @throws {Error} If there is an error while deleting the project
     * @returns {Promise<void>} 
     */
    async deleteProject(id) {
        try {
            return await this.projectsRepository.deleteProject(id);
        } catch (error) {
            throw new Error("Error while deleting the project: " + error.message);
        }
    }
}

export default ProjectsService;
