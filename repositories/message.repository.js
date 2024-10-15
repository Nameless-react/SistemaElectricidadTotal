export default class MessageRepository {
    constructor(messageModel, sequelize) {
        this.messageModel = messageModel;
        this.sequelize = sequelize;
    }

    async saveMessage(message) {
        const result = await this.sequelize.query("CALL save_message(:p_id_user, :p_message, :p_id_conversation)", {
            replacements: {
                p_id_user: message.idUser,
                p_message: message.message,
                p_id_conversation: message.idConversation
            },
            logging: console.log,
            type: this.sequelize.QueryTypes.RAW
        })

        return result;
    }

    async deleteMessage(id) {
        return await this.messageModel.destroy({
            where: {
                idMessage: id
            }
        })
    }

    async getMessageById(id) {
        const result = await this.messageModel.findByPk(id);
        return result ? result.dataValues : null;
    }

    async getMessagesByConversation(id) {
        const result = await this.messageModel.findAll({
            where: {
                idConversation: id
            }
        });
        return result ? result.dataValues : null;
    }
}