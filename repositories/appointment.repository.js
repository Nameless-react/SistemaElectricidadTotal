export default class AppointmentRepository {
    constructor(appointmentModel, employeeModel, appointmentConfirmationModel, sequelize) {
        this.appointmentModel = appointmentModel;
        this.employeeModel = employeeModel;
        this.appointmentConfirmationModel = appointmentConfirmationModel;
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
        const result = await this.appointmentModel.findAll({
            include: [
                {
                    model: this.employeeModel,
                    attributes: ["idUsers"]
                },
                {
                    model: this.appointmentConfirmationModel,
                    attributes: ["confirmed"]
                }
            ]
        });

        const formattedResult = {
            ...result,
            confirmed: appointmentConfirmation.confirmed
        }

        return formattedResult;

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