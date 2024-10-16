export default class AppointmentRepository {
    constructor(appointmentModel, sequelize) {
        this.appointmentModel = appointmentModel;
        this.sequelize = sequelize;
    }

    async saveAppointment(appointment) {
        const result = await this.sequelize.query("CALL save_appointment(:p_email, :p_appointment_date, :p_appointment_time, :p_address, :p_confirmation_token, :p_is_in_office, :p_assign_employee)", {
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

    async cancelAppointment(id) {
        return await this.appointmentModel.destroy({
            where: {
                idAppointment: id
            }
        })
    }

    async getAppointmentById(id) {
        const result = await this.appointmentModel.findByPk(id);
        return result ? result.dataValues : null;
    }

    async getAppointments() {
        return await this.appointmentModel.findAll();
    }

    async getAppointment(appointment) {
        return await this.appointmentModel.findOne({
            where: {
                ...appointment
            }
        });
    }

    async updateAppointment({ idAppointment, ...newAppointmentData }) {
        const result = await this.appointmentModel.update(newAppointmentData, {
            where: {
                idAppointment
            },
            returning: true,
            plain: true
        });

        return result[1];
    }
}