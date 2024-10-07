export default class ProjectsRepository {
    constructor(projectModel, sequelize) {
        this.projectModel = projectModel;
        this.sequelize = sequelize;
    }


    async getProjects() {
        try {
            const result = await this.sequelize.query("SELECT * FROM projects", {
                type: this.sequelize.QueryTypes.SELECT,
                logging: console.log,
            });
            return result;
        } catch (error) {
            throw new Error("Error while fetching projects");
        }
    }


    async getProjectById(id) {
        try {
            const result = await this.sequelize.query("SELECT * FROM projects WHERE id_projects = :id", {
                replacements: { id },
                type: this.sequelize.QueryTypes.SELECT,
                logging: console.log,
            });
            return result[0]; 
        } catch (error) {
            throw new Error("Error while fetching the project");
        }
    }


    async createProject(project) {
        try {
            const result = await this.sequelize.query(
                `INSERT INTO projects (name, description, budget, id_status, percentage) 
                 VALUES (:name, :description, :budget, :id_status, :percentage) RETURNING *`, {
                replacements: {
                    name: project.name,
                    description: project.description,
                    budget: project.budget,
                    id_status: project.id_status,
                    percentage: project.percentage,
                },
                type: this.sequelize.QueryTypes.INSERT,
                logging: console.log,
            });
            return result[0];  
        } catch (error) {
            throw new Error("Error while creating the project");
        }
    }


    async updateProject(id, updatedProject) {
        try {
            const result = await this.sequelize.query(
                `UPDATE projects 
                 SET name = :name, description = :description, budget = :budget, id_status = :id_status, percentage = :percentage 
                 WHERE id_projects = :id RETURNING *`, {
                replacements: {
                    id,
                    name: updatedProject.name,
                    description: updatedProject.description,
                    budget: updatedProject.budget,
                    id_status: updatedProject.id_status,
                    percentage: updatedProject.percentage,
                },
                type: this.sequelize.QueryTypes.UPDATE,
                logging: console.log,
            });
            return result[0]; 
        } catch (error) {
            throw new Error("Error while updating the project");
        }
    }


    async deleteProject(id) {
        try {
            const result = await this.sequelize.query("DELETE FROM projects WHERE id_projects = :id RETURNING *", {
                replacements: { id },
                type: this.sequelize.QueryTypes.DELETE,
                logging: console.log,
            });
            if (result.length === 0) {
                throw new Error("Project not found or could not be deleted");
            }
            return result[0];  
        } catch (error) {
            throw new Error("Error while deleting the project");
        }
    }
}
