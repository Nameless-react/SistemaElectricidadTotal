import { Model, DataTypes } from 'sequelize';
import sequelize from '../config/databaseConnection'; 
import Projects from './projects.model'; 
class Status extends Model {
}

Status.init(
    {
        idStatus: {
            field:'id_status',
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false,
        },
        name: {
            type: DataTypes.STRING(20),
            allowNull: false,
        },
    },
    {
        sequelize, 
        tableName: 'status', 
        timestamps: false, 
        modelName: 'Status'
    }
);

Status.belongsTo(Projects, { foreignKey: 'id_status', as: 'idStatus' });

export default Status;
