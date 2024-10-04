import { validateAppointment, validatePartialAppointment } from "/functions/validations/appointmentValidation";
import { ValidationFailureError, NotFoundError } from "/errors/errors";
import { randomUUID } from "node:crypto";
import VerificationAppointment from "/components/templateMails/VerificationAppointment";


export default class AppointmentService {
    constructor(appointmentRepository, mailService, appointmentConfirmationRepository) {
        this.appointmentRepository = appointmentRepository;
        this.mailService = mailService;
        this.appointmentConfirmationRepository = appointmentConfirmationRepository;
    }

    async saveAppointment(appointment) {
        const validatedAppointment = validateAppointment(appointment);
        if (validatedAppointment.error) throw new ValidationFailureError(validatedAppointment.error.message);

        const token = randomUUID();
        

        const result = await this.appointmentRepository.saveAppointment({ ...validatedAppointment.data, token });
        const savedAppointment = await this.appointmentRepository.getAppointment(validatedAppointment.data)
    
        this.mailService.sendEmail(validatedAppointment.data.email, "Confirmación de cita", 
            <VerificationAppointment 
                appointmentDate={validatedAppointment.data.appointmentDate}
                appointmentTime={validatedAppointment.data.appointmentTime}
                token={token}
                idAppointment={savedAppointment.idAppointment}
             />)
        return result;
    }

    async getAppointment(id) {
        const appointment = await this.appointmentRepository.getAppointment(id);
        if (!appointment) throw new NotFoundError(`El recurso con id: ${id} no fue encontrado`)
        return appointment;
    }

    async getAppointments() {
        return await this.appointmentRepository.getAppointments();
    }

    async cancelAppointment(id) {
        const affectedRows = await this.appointmentRepository.cancelAppointment(id);
        return affectedRows >= 1;
    }

    async updateAppointment(appointment) {
        const validatedAppointment = validatePartialAppointment(appointment);
        if (validatedAppointment.error) throw new ValidationFailureError(validatedAppointment.error.message);

        return await this.appointmentRepository.updateAppointment(validatedAppointment.data);
    }

    async appointmentConfirmation(appointmentConfirmation) {
        return await this.appointmentConfirmationRepository.confirmAppointment(appointmentConfirmation.confirmToken);
    }
}