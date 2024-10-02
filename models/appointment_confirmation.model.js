import { Model, DataTypes } from 'sequelize';
import sequelize from '/config/databaseConnection';
import Appointment from "/models/appointment.model"


class AppointmentConfirmation extends Model {}


  
AppointmentConfirmation.init({
    idConfirmation: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
        field: "id_confirmation"
    },
    confirmationToken: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false,
        field: "confirmation_token"
    },
    confirmed: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
    },
    idAppointment: {
        type: DataTypes.INTEGER,
        allowNull: false,
        unique: true,
        field: "id_appointment",
    },
    createdAt: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
        field: "created_at"
    },
    expiresAt: {
        type: DataTypes.DATE,
        defaultValue: sequelize.fn('NOW', sequelize.literal("+'1 hour'")),
        field: 'expires_at'
    }
},
{
    sequelize: sequelize,    
    modelName: "appointmentConfirmation",
    tableName: 'appointment_confirmations',
    timestamps: false,
});

AppointmentConfirmation.belongsTo(Appointment, {
    foreignKey: {
        name: "id_appointment",
        allowNull: false,
        as: "idAppointment"
    }
});

export default AppointmentConfirmation;