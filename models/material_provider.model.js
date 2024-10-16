import { Model, DataTypes, Optional } from 'sequelize';
import sequelze from '../config/databaseConnection';
import Materials from './material.model';
import Provider from './provider.model';

class MaterialProvider extends Model {

}

MaterialProvider.init({
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
    last_purchase_date: {
        type: DataTypes.DATE,
        allowNull: false
    },

    id_materials: {
        type: DataTypes.INTEGER,
        allowNull: false
    },

    id_provider: {
        type: DataTypes.INTEGER,
        allowNull: false
    }

},
    {
        sequelize: sequelze,
        tableName: 'materials_provider',
        timestamps: false
    });

MaterialProvider.belongsTo(Materials, { foreignKey: "id_materials", as: "materials" });
MaterialProvider.belongsTo(Provider, { foreignKey: "id_provider", as: "provider" });

export default MaterialProvider;