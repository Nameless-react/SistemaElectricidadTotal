export default class ProjectsRepository {
    constructor(projectModel, statusModel, employeeModel, sequelize) {
        this.projectModel = projectModel;
        this.sequelize = sequelize;
        this.employeeModel = employeeModel;
        this.statusModel = statusModel;
    }

    async getProjects() {
        const projects = await this.projectModel.findAll({
            include: [
                {
                    model: this.statusModel,
                    attributes: ['name']
                },
                // {
                //     model: this.employeeModel
                // }
            ],
            where: {
                deleted: false
            },
            attributes: ['idProjects', 'name', 'description', 'budget', 'percentage'],
        });

        const formattedProjects = projects.map(project => {
            const { Status, ...projectData } = project.get({ plain: true });
            return {
                ...projectData,
                status: Status.name || 'Unknown'
            };
        });

        return formattedProjects;
    }


    async getProjectById(id) {
        const result = await this.projectModel.findByPk(id, {
            include: [
                {
                    model: this.statusModel,
                    attributes: ['name']
                },
                // {
                //     model: this.employeeModel
                // }
            ],
            where: {
                deleted: false
            }
        });
        console.log (result)
        const { Status, ...projectData } = result.get({ plain: true });
        const formattedProjects = {
            ...projectData,
            status: Status.name || 'Unknown'
        };

        return formattedProjects;
    }


    async createProject(project) {
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


    async deleteProject(idProjects) {
        return await this.projectModel.update({
            deleted: true
        }, {
            where: {
                idProjects
            }
        })
    }
}
