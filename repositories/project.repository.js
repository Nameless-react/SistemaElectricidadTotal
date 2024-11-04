export default class ProjectsRepository {
    constructor(projectModel, sequelize) {
        this.projectModel = projectModel;
        this.sequelize = sequelize;
    }


    async getProjects() {
        return await this.projectModel.findAll();
    }

    async getProjectById(id) {
        const result = await this.projectModel.findByPk(id);
        return result ? result.dataValues : null;
    }


    async createProject(project) {
        console.log(project)
        const result = await this.sequelize.query(
            `Call create_project_with_images(:p_name ,:p_description, :p_budget , :p_id_status , ARRAY[:p_images_url]);`, {
            replacements: {
                p_name: project.name,
                p_description: project.description,
                p_budget: project.budget,
                p_id_status: project.idStatus,
                p_images_url: project.images
            },
            type: this.sequelize.QueryTypes.RAW,
            logging: console.log,
        });
        return result[0];  
    }

    async updateProject({ idProjects, ...newProjectsData }) {
        const result = await this.projectModel.update(newProjectsData, {
            where: {
                idProjects
            },
            returning: true,
            plain: true
        });

        return result[1];
    }
    
    
    async deleteProject(id) {
        return await this.projectModel.destroy({
            where: {
                idProjects: id
            }
        })
    }
}
