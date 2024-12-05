import { Model, DataTypes } from 'sequelize';
import sequelize from '/config/databaseConnection';


class CustomerSatisfaction extends Model {}

CustomerSatisfaction.init({
    idCustomerSatisfaction: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
        field: 'id_customer_satisfaction'
    },
    email: {
        type: DataTypes.STRING(50),
        allowNull: false,
        validate: {
            isEmail: true
        }
    },
    appointmentId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        field: 'appointment_id'
    },
    feedbackDate: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
        field: 'feedback_date'
    },
    rating: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
            min: 1,
            max: 5
        }
    },
    comments: {
        type: DataTypes.TEXT,
        allowNull: true
    },
    serviceType: {
        type: DataTypes.STRING(50),
        allowNull: true,
        field: 'service_type'
    },
    isResolved: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
        field: 'is_resolved'
    },
    resolutionDate: {
        type: DataTypes.DATE,
        allowNull: true,
        field: 'resolution_date',
        validate: {
            isAfterFeedbackDate(value) {
                if (this.feedbackDate && value && value < this.feedbackDate) {
                    throw new Error('Resolution date must be after feedback date');
                }
            }
        }
    },
    idEmployeeResponsible: {
        type: DataTypes.INTEGER,
        allowNull: true,
        field: 'id_employee_responsible'
    }
}, {
    sequelize: sequelize,
    tableName: 'customer_satisfaction',
    timestamps: false,
    modelName: 'customerSatisfaction'
});


// CustomerSatisfaction.belongsTo(Appointment, {
//     foreignKey: 'appointmentId',
//     as: 'appointment'
// });

// CustomerSatisfaction.belongsTo(Employee, {
//     foreignKey: 'idEmployeeResponsible',
//     as: 'employeeResponsible'
// });

export default CustomerSatisfaction;
