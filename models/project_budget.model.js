import { Model, DataTypes } from 'sequelize';
import sequelize from '/config/databaseConnection';
import User from './user.model';

class ProjectBudget extends Model {}


ProjectBudget.init({
    idProjectBudget: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
        field: "id_project_budget"
    },
    description: {
        type: DataTypes.STRING(255),
        allowNull: false
    },
    amount: {
        type: DataTypes.DECIMAL(15, 2),
        allowNull: false,
        get() {
            const rawValue = this.getDataValue('amount');
            return rawValue !== null ? parseFloat(rawValue) : null;
        },
    },
    date: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW
    },
    idProject: {
        type: DataTypes.INTEGER,
        allowNull: false,
        field: "id_project"
    },
    idUser: {
        type: DataTypes.INTEGER,
        allowNull: false,
        field: "id_user"
    }
},
{
    sequelize: sequelize,    
    modelName: 'projectBudget',
    tableName: 'project_budget',
    timestamps: false,
});


ProjectBudget.belongsTo(User, {
    foreignKey: "idUser", 
    targetKey: "id_users"
});


export default ProjectBudget;