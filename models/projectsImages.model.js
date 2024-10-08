import { Model, DataTypes } from 'sequelize';
import sequelize from '/config/databaseConnection';

class ProjectImages extends Model {}

ProjectImages.init({
    id_projects_images: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    url: {
        type: DataTypes.STRING(255),
        allowNull: false
    },
    id_project: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
}, {
    sequelize,
    tableName: 'projects_images', 
    timestamps: false
});


ProjectImages.associate = (models) => {
    ProjectImages.belongsTo(models.Project, { foreignKey: 'id_project', as: 'project' });
};

export default ProjectImages;
