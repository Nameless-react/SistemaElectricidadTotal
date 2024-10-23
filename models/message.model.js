import { Model, DataTypes } from 'sequelize';
import sequelize from '/config/databaseConnection';
import User from './user.model';
import Conversation from './conversation.model';

class Message extends Model {}


Message.init({
    idMessage: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
        field: "id_messages"
    },
    idUserAuthor: {
        type: DataTypes.INTEGER,
        allowNull: false,
        field: "id_users_author"
    },
    message: {
        type: DataTypes.STRING,
        defaultValue: " "
    },
    sendAt: {
        type: DataTypes.DATE,
        allowNull: false,
        field: "send_at",
        defaultValue: DataTypes.NOW
    },
    idConversation: {
        type: DataTypes.INTEGER,
        allowNull: false,
        field: "id_conversation"
    },
    checked: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
    }
},
{
    sequelize: sequelize,    
    modelName: 'message',
    tableName: 'messages',
    timestamps: false,
});



Message.belongsTo(User, {
    foreignKey: {
        name: "id_users_author",
        allowNull: false,
        as: "idUserAuthor"
    }
});


Message.belongsTo(Conversation, {
    foreignKey: {
        name: "id_conversation",
        allowNull: false,
        as: "idConversation"
    }
});

export default Message;