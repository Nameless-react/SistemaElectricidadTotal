export default class MessageRepository {
    constructor(messageModel, userModel, sequelize) {
        this.messageModel = messageModel;
        this.sequelize = sequelize;
        this.userModel = userModel;
    }

    async saveMessage(message) {
        const result = await this.sequelize.query("CALL save_message(:p_id_user_author, :p_message, :p_id_conversation)", {
            replacements: {
                p_id_user_author: message.idUserAuthor,
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

    // async getMessageById(id) {
    //     const result = await this.messageModel.findByPk(id);
    //     return result ? result.dataValues : null;
    // }

    async getMessagesByConversation(id) {
        const result = await this.messageModel.findAll({
            include: {
                model: this.userModel,
                required: true,
                attributes: ["email", "name"]
            },
            attributes: {
                exclude: ["id_users_author", "id_conversation"]
            },
            where: {
                idConversation: id
            }
        });
        
        return result.length ? result.map(message => message.get({ plain: true })) : null;
    }
}