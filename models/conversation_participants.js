import { Model, DataTypes } from 'sequelize';
import sequelize from '/config/databaseConnection';


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
});

//     CONSTRAINT FK_USERS
// FOREIGN KEY(ID_USERS)
// REFERENCES USERS(ID_USERS),
// CONSTRAINT FK_CONVERSATIONS
// FOREIGN KEY(ID_CONVERSATION)
// REFERENCES CONVERSATIONS(ID_CONVERSATION)
export default ConversationParticipants;