export default class ConversationRepository {
    constructor(conversationModel, sequelize) {
        this.conversationModel = conversationModel;
        this.sequelize = sequelize;
    }

    async saveConversation(conversation) {
        const result = await this.sequelize.query("CALL hacer algo(:p_email, :p_appointment_date, :p_appointment_time, :p_address, :p_confirmation_token, :p_is_in_office, :p_assign_employee)", {
            replacements: {
                p_email: appointment.email,
                p_appointment_date: appointment.appointmentDate,
                p_appointment_time: appointment.appointmentTime,
                p_address: appointment.address || "",
                p_is_in_office: appointment.isInOffice,
                p_assign_employee: null,
                p_confirmation_token: appointment.token
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

    async getMessages() {
        return await this.conversationModel.findAll();
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