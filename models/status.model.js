import { Model, DataTypes } from 'sequelize';
import sequelize from '../config/databaseConnection';  
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


export default Status;