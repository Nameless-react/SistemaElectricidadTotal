class ProjectsImagesService {
    constructor(projectsImagesRepository) {
        this.projectsImagesRepository = projectsImagesRepository;
    }

    async getProjectsImages() {

        return await this.projectsImagesRepository.getProjectsImages();

    }

    async getProjectImagesById(id) {

        return await this.projectsImagesRepository.getProjectImagesById(id);

    }

    async createProjectImages(projectImagesData) {

        return await this.projectsImagesRepository.createProjectImages(projectImagesData);

    }

    async deleteProjectImages(id) {

        return await this.projectsImagesRepository.deleteProjectImages(id);

    }
}

export default ProjectsImagesService;

