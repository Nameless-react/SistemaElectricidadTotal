export default class ProjectImagesRepository {
    constructor(projectImagesModel, sequelize) {
        this.projectImagesModel = projectImagesModel;
        this.sequelize = sequelize;
    }


    async getProjectsImages() {
        return await this.projectImagesModel.findAll();
    }

    async getProjectImagesById(id) {
        const result = await this.projectImagesModel.findByPk(id);
        return result ? result.dataValues : null;
    }


    async createProjectImages(projectImages) {
        return await this.projectImagesModel.create(projectImages);
    }


    async deleteProjectImages(id) {
        return await this.projectImagesModel.destroy({
            where: {
                idProjectsImages: id
            }
        })
    }
}
