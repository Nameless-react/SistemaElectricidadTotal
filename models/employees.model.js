import { Model, DataTypes } from 'sequelize';
import sequelize from '/config/databaseConnection';
import Users from './users.model';

class Employee extends Model {}

Employee.init({
    idEmployees: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
        field: 'id_employees'
    },
    job: {
        type: DataTypes.STRING(40),
        allowNull: false,
    },
    joinAt: {
        type: DataTypes.DATE,
        allowNull: false,
        field: 'join_at'
    },
    idUsers: {
        type: DataTypes.INTEGER,
        allowNull: false,
        unique: true,
        field: 'id_users'
    }
}, {
    sequelize: sequelize,
    tableName: 'employees',
    timestamps: false,
    modelName: 'employee'
});

Employee.belongsTo(Users, {
    foreignKey: {
        allowNull: false,
        name: 'idUsers' 
    }
});

export default Employee;
