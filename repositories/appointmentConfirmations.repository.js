export default class AppointmentConfirmationRepository {
    constructor(appointmentConfirmationModel, sequelize) {
        this.appointmentConfirmationModel = appointmentConfirmationModel;
        this.sequelize = sequelize;
    }
    
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