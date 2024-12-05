import { NextResponse } from "next/server";
import apiErrorWrapper from "/errors/apiErrorWrapper";
import { revalidatePath } from "next/cache";
import IoCContainer from "/functions/others/IoCContainer"


const projectsService = await IoCContainer.get('ProjectsService');


class ProjectController {
    constructor(projectsService) {
        this.projectsService = projectsService
    }

    getProject = apiErrorWrapper(async (req, params) => {
        const { id } = await params.params;
        const project = await this.projectsService.getProjectById(parseInt(id));
        return NextResponse.json(project, { status: 200 })
    })

    getProjects = apiErrorWrapper(async (req, res) => {
        const projects = await this.projectsService.getProjects();
        return NextResponse.json(projects, { status: 200 })
    })
    getMyProjects = apiErrorWrapper(async (req, params) => {
        const { id } = await params.params;
        const projects = await this.projectsService.getMyProjects(parseInt(id));
        return NextResponse.json(projects, { status: 200 })
    })

    createProject = apiErrorWrapper(async (req, res) => {
        const parseBody = await req.json();
        await this.projectsService.createProject(parseBody);
        return NextResponse.json({ message: "El proyecto ha sido agreagado con éxito." }, { status: 201 });
    })

    deleteProject = apiErrorWrapper(async (req, params) => {
        const { id } = await params.params;
        await this.projectsService.deleteProject(parseInt(id));
        revalidatePath("/proyectos")
        return NextResponse.json({ message: "El proyecto ha sido eliminado de manera exitosa" }, { status: 200 });
    })

    updateProject = apiErrorWrapper(async (req, params) => {
        const { id } = await params.params;
        const parseBody = await req.json();

        const updatedProject = await this.projectsService.updateProject({ 
            idProjects: parseInt(id),
            ...parseBody    
        });

        return NextResponse.json(updatedProject, { status: 200 })
    })
}

export default new ProjectController(projectsService);