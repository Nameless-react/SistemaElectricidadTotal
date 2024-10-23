export default class ConversationRepository {
    constructor(conversationModel, conversationParticipantsModel, sequelize) {
        this.conversationModel = conversationModel;
        this.conversationParticipantsModel = conversationParticipantsModel;
        this.sequelize = sequelize;
    }

    async saveConversation(conversation) {
        const result = await this.sequelize.query("CALL hacer algo(:p_email, :p_appointment_date, :p_appointment_time, :p_address, :p_confirmation_token, :p_is_in_office, :p_assign_employee)", {
            replacements: {
                p_email: conversation.email,
                p_appointment_date: conversation.appointmentDate,
                p_appointment_time: conversation.appointmentTime,
                p_address: conversation.address || "",
                p_is_in_office: conversation.isInOffice,
                p_assign_employee: null,
                p_confirmation_token: conversation.token
            },
            logging: console.log,
            type: this.sequelize.QueryTypes.RAW
        })

        return result;
    }

    async deleteConversation(id) {
        return await this.conversationModel.destroy({
            where: {
                idConversation: id
            }
        })
    }

    async getConversationById(id) {
        const result = await this.conversationModel.findByPk(id);
        return result ? result.dataValues : null;
    }

    async getConversationsByUserId(idUsers) {
        const result = await this.sequelize.query(`SELECT 
                                                    ID_CONVERSATION AS "idConversation",
                                                    CONVERSATION_NAME as "conversationName",
                                                    IMAGE_URL as "image",
                                                    LAST_MESSAGE_SEND_AT AS "lastMessageSend",
                                                    LAST_MESSAGE_CONTENT AS "lastMessage",
                                                    LAST_MESSAGE_AUTHOR_NAME AS "authorMessage" 
                                                FROM VIEW_CONVERSATIONS_PARTICIPANTS WHERE ID_USERS = :p_id_users`, {
            replacements: {
                p_id_users: idUsers
            },
            type: this.sequelize.QueryTypes.SELECT
        })

        return result; 
    }
    

    async getConversation(conversation) {
        return await this.conversationModel.findOne({
            where: {
                ...conversation
            }
        });
    }

    async updateConversation({ idConversation, ...newConversationData }) {
        const result = await this.conversationModel.update(newConversationData, {
            where: {
                idConversation
            },
            returning: true,
            plain: true
        });

        return result[1];
    }
}