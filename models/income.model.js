const { Model, DataTypes} = require("sequelize");
import sequelze from "../config/databaseConnection";
class Income extends Model {}

Income.init({
    idIncome:{
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
        field: "id_income"
    },

    idProject:{
        type: DataTypes.INTEGER,
        allowNull: false,
        field: "id_project"
    },

    amount:{
        type: DataTypes.DECIMAL(15, 2),
        allowNull: false,
        field: "amount"
    },

    incomeDate:{
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
        field: "income_date"
    },

    description:{
        type: DataTypes.STRING(255),
        allowNull: false,
        field: "description"
    },

    paymentMethod:{
        type: DataTypes.STRING(50),
        allowNull: false,
        field: "payment_method"
    },

    status:{
        type: DataTypes.STRING(50),
        allowNull: false,
        field: "status"
    },

    idUser:{
        type: DataTypes.INTEGER,
        allowNull: false,
        field: "id_user"
    },

    idIncomeCategory:{
        type: DataTypes.INTEGER,
        allowNull: false,
        field: "id_income_category"
    },

    createdAt:{
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
        field: "created_at"
    },

    updatedAt:{
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
        field: "updated_at"
    }

},{
    sequelize: sequelze,
    modelName: "income",
    tableName: "incomes",
    timestamps: false
});

export default Income;