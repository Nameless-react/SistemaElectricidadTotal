import { Model, DataTypes, Optional } from 'sequelize';
import sequelze from '../config/databaseConnection';
import Category from './category.model';

class Material extends Model {
    
}

Material.init({
    id_materials: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    stock: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    is_available: {
        type: DataTypes.BOOLEAN,
        allowNull: false
    },
    description: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    expiration_date: {
        type: DataTypes.DATE,
        allowNull: false
    },

    id_category: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
},
{
    sequelize: sequelze,
    tableName: 'materials',
    timestamps: false
});

Material.belongsTo(Category,{foreignKey: "id_category", as: "category"});

export default Material;