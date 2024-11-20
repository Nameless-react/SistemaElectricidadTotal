import { Model, DataTypes } from 'sequelize';
import sequelize from '/config/databaseConnection';
import Project from './projects.model';
import User from './user.model';

class ProjectUser extends Model {}


ProjectUser.init({
    idProjectUser: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
        field: "id_project_user"
    },
    idProject: {
        type: DataTypes.STRING,
        field: "id_project"
    },
    idUser: {
        type: DataTypes.STRING,
        allowNull: false,
        field: "id_user"
    },
},
{
    sequelize: sequelize,    
    modelName: 'projectUser',
    tableName: 'project_user',
    timestamps: false,
});



ProjectUser.belongsTo(Project, {
    foreignKey: {
        name: "id_project",
        allowNull: false,
        as: "idProject"
    }
});


ProjectUser.belongsTo(User, {
    foreignKey: {
        name: "id_user",
        allowNull: false,
        as: "idUser"
    }
});

export default ProjectUser;