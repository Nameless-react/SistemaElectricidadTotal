import { Model, DataTypes } from 'sequelize';
import sequelize from '/config/databaseConnection';
import ConversationParticipants from "./conversation_participants.model"

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

Conversation.hasMany(ConversationParticipants, {
    foreignKey: {
        name: "id_conversation",
        allowNull: false,
    }
});

export default Conversation;