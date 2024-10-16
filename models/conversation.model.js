import { Model, DataTypes } from 'sequelize';
import sequelize from '/config/databaseConnection';


class Conversation extends Model {}


Conversation.init({
    idConversation: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
        field: "id_conversation"
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    createdAt: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
        field: "created_at"
    },
},
{
    sequelize: sequelize,    
    modelName: "conversation",
    tableName: 'conversations',
    timestamps: false,
});

// AppointmentConfirmation.belongsTo(Appointment, {
//     foreignKey: {
//         name: "id_appointment",
//         allowNull: false,
//         as: "idAppointment"
//     }
// });

export default Conversation;