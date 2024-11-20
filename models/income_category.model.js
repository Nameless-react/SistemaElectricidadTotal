const { Model, DataTypes } = require("sequelize");
import sequelze from "../config/databaseConnection";

class IncomeCategory extends Model { };

IncomeCategory.init({
    idIncomeCategory: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
        field: "id_income_category"
    },

    name: {
        type: DataTypes.STRING(255),
        field: "name",
        allowNull: false
    },

    description: {
        type: DataTypes.STRING(255),
        field: "description",
        allowNull: false
    },

    status: {
        type: DataTypes.STRING(50),
        allowNull: false,
        field: "status",
        defaultValue: true
    },

    createdAt: {
        type: DataTypes.DATE,
        allowNull: false,
        field: "created_at",
        defaultValue: DataTypes.NOW
    },


    updatedAt: {
        type: DataTypes.DATE,
        allowNull: false,
        field: "updated_at",
        defaultValue: DataTypes.NOW
    }
}, {
    sequelize: sequelze,
    modelName: "incomeCategory",
    tableName: "income_category",
    timestamps: false
});

export default IncomeCategory;