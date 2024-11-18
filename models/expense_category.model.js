const { Model, DataTypes} = require("sequelize");
import sequelze from "../config/databaseConnection";
class ExpenseCategory extends Model {};

ExpenseCategory.init({
    idExpenseCategory: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
        field: "id_expense_category"
    },

    name: {
        
        type: DataTypes.STRING(255),
        allowNull: false
    },

    description:{
        type: DataTypes.STRING(255),
        allowNull: false
    },

    status:{
        type: DataTypes.STRING(50),
        allowNull: false,
        defaultValue: true
    }
},{
    sequelize: sequelze,
    modelName: "expenseCategory",
    tableName: "expense_category",
    timestamps: false
});

export default ExpenseCategory;