import { Model, DataTypes } from 'sequelize';
import sequelize from '/config/databaseConnection';

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
        field: "id_user_author"
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



export default Message;

// CONSTRAINT FK_ID_USERS_AUTHOR
//           FOREIGN KEY (ID_USERS_AUTHOR)
//           REFERENCES USERS(ID_USERS),
//     CONSTRAINT FK_CONVERSATION
//           FOREIGN KEY (ID_CONVERSATION)
//           REFERENCES CONVERSATIONS(ID_CONVERSATION)