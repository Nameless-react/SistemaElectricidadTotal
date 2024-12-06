import { NextResponse } from "next/server";
import apiErrorWrapper from "/errors/apiErrorWrapper";
import { revalidatePath } from "next/cache";
import IoCContainer from "/functions/others/IoCContainer"


const projectFilesService = await IoCContainer.get('ProjectsService');


class ProjectFilesController {
    constructor(projectFilesService) {
        this.projectFilesService = projectFilesService
    }

    getProjectFiles = apiErrorWrapper(async (req, params) => {
        const { id } = await params.params;
        const files = await this.projectFilesService.getProjectFiles(parseInt(id));
        return NextResponse.json(files, { status: 200 })
    })

    createProjectFile = apiErrorWrapper(async (req, res) => {
        const parseBody = await req.json();
        await this.projectFilesService.createProjectFile(parseBody);
        return NextResponse.json({ message: "El proyecto ha sido agreagado con éxito." }, { status: 201 });
    })

    deleteProjectFile = apiErrorWrapper(async (req, params) => {
        const { id } = await params.params;
        await this.projectFilesService.deleteProjectFile(parseInt(id));
        revalidatePath("/proyectos")
        return NextResponse.json({ message: "El proyecto ha sido eliminado de manera exitosa" }, { status: 200 });
    })
}

export default new ProjectFilesController(projectFilesService);