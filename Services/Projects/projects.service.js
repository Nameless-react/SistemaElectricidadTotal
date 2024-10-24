import { validateProject, validateIdProject, validatePartiaProject } from "/functions/validations/projectValidation";
import { ValidationFailureError , NotFoundError} from "/errors/errors";

class ProjectsService {
    constructor(projectsRepository, projectsImagesService) {
        this.projectsRepository = projectsRepository;
        this.projectsImagesService = projectsImagesService;
    }

    async getProjects() {
        return await this.projectsRepository.getProjects();
    }

    async getProjectById(id) {
        const validIdProject = validateIdProject({ idProjects: id });
        if (validIdProject.error) throw new ValidationFailureError(validIdProject.error);


        const project = await this.projectsRepository.getProjectById(id);
        if (!project) throw new NotFoundError("El proyecto no fue encontrado")

        return project
       
    }

    async createProject(projectData) {
        const validatedProject = validateProject(projectData);
        if (validatedProject.error) throw new ValidationFailureError(validatedProject.error.message);

        return await this.projectsRepository.createProject(validatedProject.data );
    }


    async updateProject( projectData) {
        console.log(projectData)
        const validatedProject = validatePartiaProject(projectData);
        if (validatedProject.error) throw new ValidationFailureError(validatedProject.error.message);

        await this.getProjectById(validatedProject.data.idProjects);
        return await this.projectsRepository.updateProject( {...validatedProject.data});
    }


    async deleteProject(id) {
        const validIdProject= validateIdProject({ idProjects: id });
        if (validIdProject.error) throw new ValidationFailureError(validIdProject.error);

        const deleted = await this.projectsRepository.deleteProject(validIdProject.data.idProjects);
        if (!deleted) throw new DeletionError("No se pudo eliminar el proyecto");   
    }
}

export default ProjectsService;

