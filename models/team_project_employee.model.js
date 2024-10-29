import { Model, DataTypes } from 'sequelize';
import sequelize from '/config/databaseConnection';
import TeamProject from './team_project.model';
import Employee from './employees.model';

class TeamProjectEmployee extends Model {}


TeamProjectEmployee.init({
    idTeamProjectEmployee: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
        field: "id_team_project_employee"
    },
    idTeamProject: {
        type: DataTypes.STRING,
        allowNull: false,
        field: "id_team_project"
    },
    idEmployee: {
        type: DataTypes.STRING,
        allowNull: false,
        field: "id_employee"
    },
},
{
    sequelize: sequelize,    
    modelName: 'teamProjectEmployee',
    tableName: 'team_project_employee',
    timestamps: false,
});



TeamProjectEmployee.belongsTo(TeamProject, {
    foreignKey: {
        name: "id_team_project",
        allowNull: false,
        as: "idTeamProject"
    }
});


TeamProjectEmployee.belongsTo(Employee, {
    foreignKey: {
        name: "id_employee",
        allowNull: false,
        as: "idEmployee"
    }
});

export default TeamProjectEmployee;