import databaseErrorWrapper from "/errors/databaseErrorWrapper";

class AppointmentRepository {
    constructor(appointmentModel, sequelize) {
        this.appointmentModel = appointmentModel;
        this.sequelize = sequelize;
    }



    async saveTool(formData) {
        return databaseErrorWrapper(async () => {
            const result = await this.sequelize.query('CALL save_appointment()', {
                replacements: {
                    p_name: formData.name,
                    p_model: formData.model,
                    p_serial_number: formData.serial,
                    p_status: formData.status,
                    p_image: formData.image,
                    p_description: formData.description,
                    p_id_category: formData.category,
                    p_id_provider: formData.provider,
                    p_last_purchase_date: formData.date,
                    p_price: formData.cost,
                    p_toolId: null,
                    p_Success: null
                },
                type: this.sequelize.QueryTypes.RAW
            });

            return result;

        })

    }
}