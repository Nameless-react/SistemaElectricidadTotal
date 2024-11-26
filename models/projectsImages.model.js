import { Model, DataTypes } from 'sequelize';
import sequelize from '/config/databaseConnection';

class ProjectImages extends Model {}

ProjectImages.init({
    idProjectsImages: {
        type: DataTypes.INTEGER,
        field: 'id_projects_images',
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    url: {
        type: DataTypes.STRING(255),
        allowNull: false
    },
    idProject: {
        type: DataTypes.INTEGER,
        field: "id_project",
        allowNull: false
    }
}, {
    sequelize,
    tableName: 'projects_images', 
    modelName: 'projectImages',
    timestamps: false
});


// ProjectImages.belongsTo(Projects, {
//     foreignKey: {
//         name: "id_projects",
//         allowNull: false,
//         as: "idProjects"
//     }
// });
export default ProjectImages;
