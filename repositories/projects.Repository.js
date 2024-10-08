class ProjectsRepository {
    constructor(project, projectImage, sequelize) {
        this.project = project; 
        this.projectImage = projectImage; 
        this.sequelize = sequelize;
    }


    async getAllProjects() {
        try {
            const projects = await this.sequelize.query(`
                SELECT p.*, pi.URL
                FROM PROJECTS p
                LEFT JOIN PROJECTS_IMAGES pi ON p.ID_PROJECTS = pi.ID_PROJECT`, {
                type: this.sequelize.QueryTypes.SELECT
            });

            if (!projects) {
                throw new Error("Projects not found");
            }

            return projects;
        } catch (error) {
            throw new Error("Error while getting projects: " + error.message);
        }
    }


    async getProjectById(id) {
        try {
            const project = await this.sequelize.query(`
                SELECT p.*, pi.URL
                FROM PROJECTS p
                LEFT JOIN PROJECTS_IMAGES pi ON p.ID_PROJECTS = pi.ID_PROJECT
                WHERE p.ID_PROJECTS = :p_id`, {
                replacements: { p_id: id },
                type: this.sequelize.QueryTypes.SELECT
            });

            if (!project || project.length === 0) {
                throw new Error("Project not found");
            }

            return project[0];
        } catch (error) {
            throw new Error("Error while getting project: " + error.message);
        }
    }


    async saveProject(formData) {
        try {
            const result = await this.sequelize.query(`
                INSERT INTO PROJECTS (NAME, DESCRIPTION, BUDGET, ID_STATUS, PERCENTAGE)
                VALUES (:p_name, :p_description, :p_budget, :p_status, :p_percentage)`, {
                replacements: {
                    p_name: formData.name,
                    p_description: formData.description,
                    p_budget: formData.budget,
                    p_status: formData.status,
                    p_percentage: formData.percentage
                },
                type: this.sequelize.QueryTypes.INSERT
            });

            return result; 
        } catch (error) {
            throw new Error("Error while saving project: " + error.message);
        }
    }


    async updateProject(formData, id) {
        try {
            const result = await this.sequelize.query(`
                UPDATE PROJECTS
                SET NAME = :p_name, DESCRIPTION = :p_description, BUDGET = :p_budget,
                    ID_STATUS = :p_status, PERCENTAGE = :p_percentage
                WHERE ID_PROJECTS = :p_id`, {
                replacements: {
                    p_id: id,
                    p_name: formData.name,
                    p_description: formData.description,
                    p_budget: formData.budget,
                    p_status: formData.status,
                    p_percentage: formData.percentage
                },
                type: this.sequelize.QueryTypes.UPDATE
            });

            return result;
        } catch (error) {
            throw new Error("Error while updating project: " + error.message);
        }
    }


    async deleteProject(id) {
        try {
            const result = await this.sequelize.query(`
                DELETE FROM PROJECTS
                WHERE ID_PROJECTS = :p_id`, {
                replacements: { p_id: id },
                type: this.sequelize.QueryTypes.DELETE
            });

            return result;
        } catch (error) {
            throw new Error("Error while deleting project: " + error.message);
        }
    }


    async saveProjectImage(formData) {
        try {
            const result = await this.sequelize.query(`
                INSERT INTO PROJECTS_IMAGES (URL, ID_PROJECT)
                VALUES (:p_url, :p_id_project)`, {
                replacements: {
                    p_url: formData.url,
                    p_id_project: formData.projectId
                },
                type: this.sequelize.QueryTypes.INSERT
            });

            return result;
        } catch (error) {
            throw new Error("Error while saving project image: " + error.message);
        }
    }

    async getImagesByProjectId(id) {
        try {
            const images = await this.sequelize.query(`
                SELECT * FROM PROJECTS_IMAGES
                WHERE ID_PROJECT = :p_id_project`, {
                replacements: { p_id_project: id },
                type: this.sequelize.QueryTypes.SELECT
            });

            return images;
        } catch (error) {
            throw new Error("Error while getting project images: " + error.message);
        }
    }
}

export default ProjectsRepository;
