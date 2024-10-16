import { Model, DataTypes, Optional } from 'sequelize';
import sequelze from '../config/databaseConnection';
import Category from './category.model';

class Tool extends Model {

}

Tool.init({
    
    id_tools:{
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    name:{
        type: DataTypes.STRING,
        allowNull: false
    },

    model:{
        type: DataTypes.STRING,
        allowNull: false
    },

    serial_number:{
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },

    status:{
        type: DataTypes.BOOLEAN,
        allowNull: false
    },

    image:{
        type: DataTypes.TEXT
    },

    id_category:{
        type: DataTypes.INTEGER,
        allowNull: false
    }

},{
    sequelize: sequelze,    
    tableName: 'tools',
    timestamps: false,
});

Tool.belongsTo(Category,{foreignKey: "id_category", as: "category"});

export default Tool;