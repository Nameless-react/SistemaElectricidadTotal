import { Model, DataTypes, Optional } from 'sequelize';
import sequelze from '../config/databaseConnection';

class Category extends Model {

}

Category.init({
    id_category:{
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    name:{
        type: DataTypes.STRING,
        allowNull: false
    }
},
{
    sequelize: sequelze,    
    tableName: 'category',
    timestamps: false,
});

export default Category;