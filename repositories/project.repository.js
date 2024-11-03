export default class ProjectsRepository {
    constructor(projectModel, statusModel, employeeModel, taskModel, teamProjectModel, teamProjectEmployeeModel, userModel, taskAssignmentModel, sequelize) {
        this.projectModel = projectModel;
        this.sequelize = sequelize;
        this.employeeModel = employeeModel;
        this.taskAssignmentModel = taskAssignmentModel;
        this.taskModel = taskModel;
        this.teamProjectEmployeeModel = teamProjectEmployeeModel;
        this.statusModel = statusModel;
        this.teamProjectModel = teamProjectModel;
        this.userModel = userModel;
    }

    async getProjects() {
        const projects = await this.projectModel.findAll({
            include: [
                {
                    model: this.statusModel,
                    attributes: ['name']
                },
                {
                    model: this.teamProjectModel,
                    include: [
                        {
                            model: this.teamProjectEmployeeModel,
                            required: false,
                            include: [
                                {
                                    model: this.employeeModel,
                                    include: [
                                        {
                                            model: this.userModel
                                        }
                                    ]
                                }
                            ]
                        }
                    ]
                }
            ],
            where: {
                deleted: false
            },
            attributes: ['idProjects', 'name', 'description', 'budget', 'percentage'],
        });
        
        const formattedProjects = projects.map(project => {
            const { Status, teamProject, ...projectData } = project.get({ plain: true });
            return {
                ...projectData,
                status: Status.name || 'Unknown',
                employees: teamProject?.teamProjectEmployees.map(employee => employee.employee.User.image)
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
                {
                    model: this.taskModel,
                    attributes: ['idTasks', 'title', 'deadline', 'description'],
                    required: false,
                    include: [
                        {
                            model: this.statusModel,
                            attributes: ['name'],
                            required: false
                        },
                        {
                            model: this.taskAssignmentModel,
                            include: [
                                {
                                    model: this.employeeModel,
                                    include: [
                                        {
                                            model: this.userModel
                                        }
                                    ]
                                }
                            ]
                        }
                    ]
                },
                {
                    model: this.teamProjectModel,
                    include: [
                        {
                            model: this.teamProjectEmployeeModel,
                            required: false,
                            include: [
                                {
                                    model: this.employeeModel,
                                    include: [
                                        {
                                            model: this.userModel
                                        }
                                    ]
                                }
                            ]
                        }
                    ]
                }
            ],
            attributes: ['idProjects', 'name', 'description', 'budget', 'percentage'],
            where: {
                deleted: false
            }
        });
        
       
        const { Status: projectStatus, tasks, teamProject, ...projectData } = result.get({ plain: true });


        const formattedProject = {
            ...projectData,
            status: projectStatus?.name || 'Unknown',
            employees: teamProject?.teamProjectEmployees.map(employee => ({
                image: employee.employee.User.image,
                email: employee.employee.User.email,
                name: employee.employee.User.name,
                job: employee.employee.job,
                idEmployee: employee.employee.idEmployees
            })),
            tasks: tasks.map(({ Status: taskStatus, taskAssignments, ...taskData }) => ({
                ...taskData,
                status: taskStatus?.name || 'Unknown',
                assignedEmployees: taskAssignments.map(taskResponsible => ({
                    idEmployee: taskResponsible.idEmployee,
                    image: taskResponsible.employee.User.image
                }))
            }))
            
        };

        return formattedProject;

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
