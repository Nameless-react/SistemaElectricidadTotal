import { NextResponse } from "next/server";
import sequelize from "/config/databaseConnection";
import apiErrorWrapper from "/errors/apiErrorWrapper";
import { ProjectsService } from "../Services"; 
import ProjectModel from "../models/projects.model";
import ProjectsRepository from "../repositories/project.repository";
import StatusModel from "../models/status.model";
import EmployeeModel from "../models/employees.model";
import TaskModel from "../models/task.model"
import { revalidatePath } from "next/cache";
import TeamProjectEmployeeModel from "../models/team_project_employee.model";
import TeamProjectModel from "../models/team_project.model";
import UserModel from "../models/user.model";


ProjectModel.hasMany(TaskModel, {
    foreignKey: 'idProjects',
    sourceKey: 'idProjects',
});

TeamProjectModel.hasMany(TeamProjectEmployeeModel, {
    foreignKey: 'id_team_project', // Asegúrate de que coincide con el campo en la tabla
});


const projectsRepository = new ProjectsRepository(ProjectModel, StatusModel, EmployeeModel, TaskModel, TeamProjectModel, TeamProjectEmployeeModel, UserModel, sequelize);
const projectsService= new ProjectsService(projectsRepository);


class ProjectController {
    constructor(projectsService) {
        this.projectsService = projectsService
    }

    getProject = apiErrorWrapper(async (req, params) => {
        const { id } = params.params;
        const project = await this.projectsService.getProjectById(parseInt(id));
        return NextResponse.json(project, { status: 200 })
    })

    getProjects = apiErrorWrapper(async (req, res) => {
        const projects = await this.projectsService.getProjects();
        return NextResponse.json(projects, { status: 200 })
    })

    createProject = apiErrorWrapper(async (req, res) => {
        const parseBody = await req.json();
        await this.projectsService.createProject(parseBody);
        return NextResponse.json({ message: "El proyecto ha sido agreagado con éxito." }, { status: 201 });
    })

    deleteProject = apiErrorWrapper(async (req, params) => {
        const { id } = params.params;
        await this.projectsService.deleteProject(parseInt(id));
        revalidatePath("/proyectos")
        return NextResponse.json({ message: "El proyecto ha sido eliminado de manera exitosa" }, { status: 200 });
    })

    updateProject = apiErrorWrapper(async (req, params) => {
        const { id } = params.params;
        const parseBody = await req.json();

        const updatedProject = await this.projectsService.updateProject({ 
            idProjects: parseInt(id),
            ...parseBody    
        });

        return NextResponse.json(updatedProject, { status: 200 })
    })
}

export default new ProjectController(projectsService);