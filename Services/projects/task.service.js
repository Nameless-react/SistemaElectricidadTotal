import { validateAppointment, validatePartialAppointment, validateIdAppointment } from "/functions/validations/appointmentValidation";
import { ValidationFailureError, NotFoundError, DeletionError } from "/errors/errors";
import { randomUUID } from "node:crypto";
import VerificationAppointment from "/components/templateMails/VerificationAppointment";


export default class TaskService {
    constructor(taskRepository) {
        this.appointmentRepository = appointmentRepository;
    }

    async saveAppointment(task) {
        const validatedAppointment = validateAppointment(task);
        if (validatedAppointment.error) throw new ValidationFailureError(validatedAppointment.error.message);

        const token = randomUUID();
        

        const result = await this.appointmentRepository.saveAppointment({ ...validatedAppointment.data, token });
        const savedAppointment = await this.appointmentRepository.getAppointment(validatedAppointment.data)
    
        this.mailService.sendEmail('ElectricidadTotal <no-reply-citas@electricidadtotal.com>', validatedAppointment.data.email, "Confirmación de cita", 
            <VerificationAppointment 
                appointmentDate={savedAppointment.appointmentDate}
                appointmentTime={savedAppointment.appointmentTime}
                token={token}
                idAppointment={savedAppointment.idAppointment}
             />)
        return result;
    }

    async getAppointmentById(id) {
        const validIdAppointment = validateIdAppointment({ idAppointment: id });
        if (validIdAppointment.error) throw new ValidationFailureError(validIdAppointment.error);


        const appointment = await this.appointmentRepository.getAppointmentById(id);
        if (!appointment) throw new NotFoundError("La cita no fue encontrada")
        return appointment;
    }

    async getAppointment(appointmentFields) {
        const appointment = await this.appointmentRepository.getAppointment(appointmentFields);
        if (!appointment) throw new NotFoundError(`La cita no fue encontrada`)
        return appointment;
    }

    async getAppointments() {
        return await this.appointmentRepository.getAppointments();
    }

    async cancelAppointment(id) {
        const validIdAppointment = validateIdAppointment({ idAppointment: id });
        if (validIdAppointment.error) throw new ValidationFailureError(validIdAppointment.error);

        const deleted = await this.appointmentRepository.cancelAppointment(validIdAppointment.data.idAppointment);
        if (!deleted) throw new DeletionError("No se pudo eliminar la cita");
    }

    async updateAppointment(appointment) {
        const validatedAppointment = validatePartialAppointment(appointment);
        if (validatedAppointment.error) throw new ValidationFailureError(validatedAppointment.error.message);

        await this.getAppointmentById(validatedAppointment.data.idAppointment);
        return await this.appointmentRepository.updateAppointment(validatedAppointment.data);
    }

    async appointmentConfirmation(appointmentConfirmation) {
        return await this.appointmentConfirmationRepository.confirmAppointment(appointmentConfirmation.confirmToken);
    }
}