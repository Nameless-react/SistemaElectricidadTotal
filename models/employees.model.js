import { Model, DataTypes } from 'sequelize';
import sequelize from '/config/databaseConnection';

class Employee extends Model {}

export default Employee.init({
    
},
{
    sequelize: sequelize,    
    modelName: 'employee',
    tableName: 'EMPLOYEE',
    timestamps: false,
});