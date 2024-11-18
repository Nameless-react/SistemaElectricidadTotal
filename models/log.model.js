import { Model, DataTypes } from 'sequelize';
import sequelize from '/config/databaseConnection'; 

class Log extends Model {}

Log.init({
    idLog: {
        field:'id_log',
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    table_name: {
        type: DataTypes.STRING(100),
        allowNull: false
    },
    action: {
        type: DataTypes.STRING(50),
        allowNull: false
    },
    action_date_time: {
        type: DataTypes.DATE,
        allowNull: false
    }   
}, {
    sequelize,
    tableName: 'log',
    timestamps: false,
    modelName: 'log'
});


export default Log;
