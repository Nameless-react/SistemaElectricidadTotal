import { Model, DataTypes } from 'sequelize';
import sequelize from '/config/databaseConnection';

class Appointment extends Model {}

Appointment.init({
    idAppointment: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
        field: "id_appointment"
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            is: "^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$",
            isEmail: true
        }
    },
    appointmentDate: {
        type: DataTypes.DATE,
        allowNull: false,
        field: "appointment_date",
        validate: {
            isAfterToday(value) {
                if (new Date(value) <= new Date()) {
                    throw new Error('La fecha debe ser mayor a la fecha actual.');
                }
            }
        }
    },
    appointmentTime: {
        type: DataTypes.TIME,
        allowNull: false,
        field: "appointment_time"
    },
    address: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            addressLength(value) {
                if (value.length < 5 && !this.isInOffice) throw new Error("La dirección es demasiado corta")
            }
        }
    },
    isInOffice: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
        field: "is_in_office"
    },
    assignEmployee: {
        type: DataTypes.INTEGER,
        field: "assign_employee"
    }
},
{
    sequelize: sequelize,    
    modelName: 'appointment',
    tableName: 'appointment',
    timestamps: false,
});

export default Appointment;