import { Model, DataTypes } from 'sequelize';
import sequelize from '/config/databaseConnection';
import Project from './projects.model';


class TeamProject extends Model {}


TeamProject.init({
    idTeamProject: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
        field: "id_team_project"
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    }
},
{
    sequelize: sequelize,    
    modelName: 'teamProject',
    tableName: 'team_project',
    timestamps: false,
});



// TeamProject.belongsTo(Project, {
//     foreignKey: {
//         name: "id_project",
//         allowNull: false,
//         as: "idProject"
//     }
// });

export default TeamProject;