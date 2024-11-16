export default class ProjectsRepository {
    constructor(projectModel, statusModel, employeeModel, taskModel, teamProjectModel, teamProjectEmployeeModel, userModel, taskAssignmentModel, expensesModel, budgetModel, sequelize) {
        this.projectModel = projectModel;
        this.sequelize = sequelize;
        this.employeeModel = employeeModel;
        this.taskAssignmentModel = taskAssignmentModel;
        this.taskModel = taskModel;
        this.teamProjectEmployeeModel = teamProjectEmployeeModel;
        this.statusModel = statusModel;
        this.teamProjectModel = teamProjectModel;
        this.userModel = userModel;
        this.expensesModel = expensesModel;
        this.budgetModel = budgetModel;
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
            attributes: ['idProjects', 'name', 'description', 'percentage'],
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
                    model: this.budgetModel,
                    attributes: ["description", "amount", "date", "idUser"]
                },
                {
                    model: this.expensesModel,
                    attributes: ["description", "amount", "date", "idUser"]
                },
                {
                    model: this.statusModel,
                    attributes: ['name', "idStatus"]
                },
                {
                    model: this.taskModel,
                    attributes: ['idTasks', 'title', 'deadline', 'description'],
                    required: false,
                    include: [
                        {
                            model: this.statusModel,
                            attributes: ['name', "idStatus"],
                            required: false
                        },
                        {
                            model: this.taskAssignmentModel,
                            attributes: {
                                exclude: ["idTaskAssignment", "id_task", "id_employee", "idTask"]
                            },
                            include: [
                                {
                                    model: this.employeeModel,
                                    attributes: {
                                        exclude: ["idEmployees"]
                                    },
                                    include: [
                                        {
                                            model: this.userModel,
                                            attributes: {
                                                exclude: ["password", "createdAt", "updatedAt", "deleted", "verify", "id_users"]
                                            }
                                        }
                                    ]
                                }
                            ],
                        }
                    ]
                },
                {
                    model: this.teamProjectModel,
                    include: [
                        {
                            model: this.teamProjectEmployeeModel,
                            attributes: {
                                exclude: ["idEmployee", "id_team_project"]
                            },
                            required: false,
                            include: [
                                {
                                    model: this.employeeModel,
                                    attributes: {
                                        exclude: ["idEmployees"]
                                    },
                                    include: [
                                        {
                                            model: this.userModel,
                                            attributes: {
                                                exclude: ["password", "created_at", "updated_at", "deleted", "verify", "id_users"]
                                            }
                                        }
                                    ]
                                }
                            ]
                        }
                    ]
                }
            ],
            attributes: ['idProjects', 'name', 'description', 'percentage'],
            where: {
                deleted: false
            },
            order: [[{ model: this.taskModel }, 'idTasks', 'ASC']],
            subQuery: false 
        });
        
        
       
        const { Status: projectStatus, tasks, teamProject, ...projectData } = result.get({ plain: true });


        const formattedProject = {
            ...projectData,
            status: projectStatus?.name || 'Unknown',
            idStatus: projectStatus?.idStatus,
            teamProjectName: teamProject?.name,
            idTeamProject: teamProject?.idTeamProject,
            employees: teamProject?.teamProjectEmployees?.map(employee => ({
                image: employee.employee.User.image,
                email: employee.employee.User.email,
                name: employee.employee.User.name,
                job: employee.employee.job,
                idEmployee: employee.id_employee,
                idTeamProjectEmployee: employee.idTeamProjectEmployee
            })) || [],
            tasks: tasks?.map(({ Status: taskStatus, taskAssignments, ...taskData }) => ({
                ...taskData,
                status: taskStatus?.name || 'Unknown',
                idStatus: taskStatus?.idStatus,
                assignedEmployees: taskAssignments?.map(taskResponsible => ({
                    idEmployee: taskResponsible.idEmployee,
                    image: taskResponsible.employee.User.image,
                    email: taskResponsible.employee.User.email,
                    name: taskResponsible.employee.User.name
                })) || []
            })) || []
            
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
