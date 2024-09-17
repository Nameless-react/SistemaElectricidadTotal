import { Model, DataTypes, Optional } from 'sequelize';
import sequelze from '../config/databaseConnection';
import Tools from './tools.model';
import Provider from './provider.model';

class ToolsProvider extends Model {

}


ToolsProvider.init({
    id_tools_provider: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    price: {
        type: DataTypes.FLOAT,
        allowNull: false
    },
    id_provider: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    las_purchase_date: {
        type: DataTypes.DATE,
        allowNull: false
    },
    id_tools: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
},
{
    sequelize: sequelze,
    tableName: 'tools_provider',
    timestamps: false
});

ToolsProvider.belongsTo(Tools,{foreignKey: "id_tools", as: "tools"});
ToolsProvider.belongsTo(Provider,{foreignKey: "id_provider", as: "provider"});

export default ToolsProvider;