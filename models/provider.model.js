import { Model, DataTypes, Optional } from 'sequelize';
import sequelze from '../config/databaseConnection';

class Provider extends Model {

}

Provider.init({
    id_provider: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    description: {
        type: DataTypes.STRING,
        allowNull: false
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false
    },
    phone: {
        type: DataTypes.STRING,
        allowNull: false
    },
    address: {
        type: DataTypes.STRING,
        allowNull: false
    }
},
{
    sequelize: sequelze,
    tableName: 'provider',
    timestamps: false
});

export default Provider;