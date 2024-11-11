
import { Model, DataTypes } from 'sequelize';
import sequelize from '/config/databaseConnection';
import Employee from './employees.model';
import Task from './task.model';


class TaskAssignments extends Model {}

TaskAssignments.init({
    idTaskAssignment: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
        field: "id_task_assignment"
    },
    idTask: {
        type: DataTypes.INTEGER,
        allowNull: false,
        field: "id_task"
    },
    idEmployee: {
        type: DataTypes.INTEGER,
        allowNull: false,
        field: "id_employee"
    }
},
{
    sequelize: sequelize,    
    modelName: 'taskAssignments',
    tableName: 'task_assignments',
    timestamps: false,
});



TaskAssignments.belongsTo(Task, {
    foreignKey: {
        name: "id_task",
        allowNull: false,
        as: "idTask"
    }
});


TaskAssignments.belongsTo(Employee, {
    foreignKey: {
        name: "id_employee",
        allowNull: false,
        as: "idEmployee"
    }
});

export default TaskAssignments;