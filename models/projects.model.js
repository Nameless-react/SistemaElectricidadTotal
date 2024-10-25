import { Model, DataTypes } from 'sequelize';
import sequelize from '/config/databaseConnection'; 
import Status from './status.model';

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
    budget: {
        type: DataTypes.DECIMAL(15,2),
        allowNull: false,
        validate: {
            min: 0
        }
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

export default Project;
