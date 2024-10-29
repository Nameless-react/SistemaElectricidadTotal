import { Model, DataTypes } from 'sequelize';
import sequelize from '/config/databaseConnection';
import Projects from  "./projects.model"
import Status from './status.model';


class Task extends Model {}

Task.init({
    idTasks: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
        field: "id_tasks"
    },
    title: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    deadline: {
        type: DataTypes.DATE,
        allowNull: false,
    },
    description: {
        type: DataTypes.STRING,
        allowNull: false
    },
    idProjects: {
        type: DataTypes.INTEGER,
        allowNull: false,
        field: "id_projects"
    },
    idStatus: {
        type: DataTypes.INTEGER,
        allowNull: false,
        field: "id_status"
    }
},
{
    sequelize: sequelize,    
    modelName: "task",
    tableName: 'tasks',
    timestamps: false,
});


Task.belongsTo(Projects, {
    foreignKey: {
        name: "idProjects",
        allowNull: false,
    }
});

Task.belongsTo(Status, {
    foreignKey: {
        name: "idStatus",
        allowNull: false
    }
})

export default Task;