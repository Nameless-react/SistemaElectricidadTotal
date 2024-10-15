export default class ConversationParticipantsRepository {
    constructor(conversationParticipantsModel, sequelize) {
        this.conversationParticipantsModel = conversationParticipantsModel;
        this.sequelize = sequelize;
    }

    async saveConversation(conversationParticipant) {
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

    async deleteConversationParticipant(id) {
        return await this.conversationParticipantsModel.destroy({
            where: {
                idConversationParticipant: id
            }
        })
    }

    async getConversationById(id) {
        const result = await this.conversationParticipantsModel.findByPk(id);
        return result ? result.dataValues : null;
    }

    async getMessages() {
        return await this.conversationParticipantsModel.findAll();
    }

    async getConversation(conversationParticipant) {
        return await this.conversationParticipantsModel.findOne({
            where: {
                ...conversationParticipant
            }
        });
    }

    async updateConversation({ idConversationParticipant, ...newConversationParticipantData }) {
        const result = await this.conversationParticipantsModel.update(newConversationParticipantData, {
            where: {
                idConversationParticipant
            },
            returning: true,
            plain: true
        });

        return result[1];
    }
}