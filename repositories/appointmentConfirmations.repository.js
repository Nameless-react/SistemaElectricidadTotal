export default class AppointmentConfirmationRepository {
    constructor(appointmentConfirmationModel, sequelize) {
        this.appointmentConfirmationModel = appointmentConfirmationModel;
        this.sequelize = sequelize;
    }

    // async getAppointment(id) {
    //     const result = await this.appointmentModel.findByPk(id);
    //     return result ? result.dataValues : null;
    // }

    // async getAppointments() {
    //     return await this.appointmentModel.findAll();
    // }

    async confirmAppointment(confirmToken) {
        return await this.sequelize.query("CALL confirm_appointment(:p_token)", {
            replacements: {
                p_token: confirmToken
            },
            logging: console.log,
            type: this.sequelize.QueryTypes.RAW
        })
    }
}