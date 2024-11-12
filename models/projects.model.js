import { Model, DataTypes } from 'sequelize';
import sequelize from '/config/databaseConnection'; 
import Status from './status.model';
import TeamProject from './team_project.model';
import ExpensesProjects from './expenses_project.model';
import ProjectBudget from './project_budget.model';

class Project extends Model {}

Project.init({
    idProjects: {
        field:'id_projects',
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    name: {
        type: DataTypes.STRING(100),
        allowNull: false
    },
    description: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    deleted: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
        allowNull: false
    },
    percentage: {
        type: DataTypes.DECIMAL(5,2),
        allowNull: true,
        defaultValue: 0.0,
        validate: {
            min:0 ,
            max:100
        }
    },
    idStatus: {
        field: 'id_status',
        type: DataTypes.INTEGER,
        allowNull: false
    },
    idTeamProject: {
        type: DataTypes.INTEGER,
        field: "id_team_project"
    }
}, {
    sequelize,
    tableName: 'projects',
    timestamps: false,
    modelName: 'projects'
});


Project.belongsTo(Status, {
    foreignKey: {
        name: "id_status",
        allowNull: false,
        as: "idStatus"
    }
});

Project.belongsTo(TeamProject, {
    foreignKey: {
        name: "id_team_project",
        allowNull: false,
        as: "idTeamProject"
    }
});


Project.hasMany(ExpensesProjects, {
    foreignKey: {
        name: "id_project",
        allowNull: false,
        as: "idProject"
    }
});

Project.hasMany(ProjectBudget, {
    foreignKey: {
        name: "id_project",
        allowNull: false,
        as: "idProject"
    }
});

export default Project;
