import { Model, DataTypes } from 'sequelize';
import sequelize from '/config/databaseConnection';
import Projects from  "./projects.model"


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

export default Task;