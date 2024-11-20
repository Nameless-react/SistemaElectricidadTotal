import { Model, DataTypes } from 'sequelize';
import sequelize from '/config/databaseConnection';
import User from './user.model';
import ProjectBudget from './project_budget.model';
import Project from './projects.model';
import ExpenseCategory from './expense_category.model';

class ExpensesProjects extends Model {}


ExpensesProjects.init({
    idExpensesProjects: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
        field: "id_expenses_projects"
    },
    description: {
        type: DataTypes.STRING(255),
        allowNull: false
    },
    amount: {
        type: DataTypes.DECIMAL(15, 2),
        allowNull: false,
        get() {
            const rawValue = this.getDataValue('amount');
            return rawValue !== null ? parseFloat(rawValue) : null;
        }
    },
    date: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW
    },
    idProjects: {
        type: DataTypes.INTEGER,
        allowNull: false,
        field: "id_project"
    },
    idUser: {
        type: DataTypes.INTEGER,
        field: "id_user"
    },

    idExpenseCategory: {
        type: DataTypes.INTEGER,
        allowNull: false,
        field: "id_expense_category"
    },

},
{
    sequelize: sequelize,    
    modelName: 'expensesProjects',
    tableName: 'expenses_projects',
    timestamps: false,
});


ExpensesProjects.belongsTo(User, {
    foreignKey: {
        name: "id_user",
        allowNull: false,
    }
});

ExpensesProjects.belongsTo(ExpenseCategory,{
    foreignKey: {
        name: "id_expense_category",
        allowNull: false,
        as: "idExpenseCategory"
    }
});

export default ExpensesProjects;