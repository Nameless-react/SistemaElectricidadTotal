import { Model, DataTypes } from 'sequelize';
import sequelize from '/config/databaseConnection';
import User from './user.model';

class ConversationParticipants extends Model {}


ConversationParticipants.init({
    idConversationParticipants: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
        field: "id_conversation_participants"
    },
    idUsers: {
        type: DataTypes.INTEGER,
        allowNull: false,
        field: "id_users"
    },
    idConversation: {
        type: DataTypes.INTEGER,
        allowNull: false,
        field: "id_conversation"
    },
},
{
    sequelize: sequelize,    
    modelName: "conversationParticipants",
    tableName: 'conversation_participants',
    timestamps: false,
    defaultScope: {
        attributes: ['idConversation', 'idUsers']
    }
});


ConversationParticipants.belongsTo(User, {
    foreignKey: {
        name: "id_users",
        allowNull: false,
    }
});

export default ConversationParticipants;