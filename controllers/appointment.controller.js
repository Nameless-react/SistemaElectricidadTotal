import { NextResponse } from "next/server";
import apiErrorWrapper from "/errors/apiErrorWrapper";
import AppointmentService from "/services/appointments/appointment.service";
import AppointmentRepository from "/repositories/appointment.repository"
import appointmentModel from "/models/appointment.model";
import appointmentConfirmationModel from "/models/appointment_confirmation.model"
import sequelize from "/config/databaseConnection";
import MailService from "/services/appointments/mail.service";
import AppointmentConfirmationRepository from "/repositories/appointmentConfirmations.repository";

const mailService = new MailService(process.env.RESEND_API_KEY);
const appointmentConfirmationRepository = new AppointmentConfirmationRepository(appointmentConfirmationModel, sequelize);
const appointmentRepository = new AppointmentRepository(appointmentModel, sequelize);
const appointmentService = new AppointmentService(appointmentRepository, mailService,appointmentConfirmationRepository );


class AppointmentController {
    constructor(appointmentService) {
        this.appointmentService = appointmentService
    }

    getAppointment = apiErrorWrapper(async (req, params) => {
        const { id } = params.params;
        const appointment = await this.appointmentService.getAppointment(parseInt(id));
        return NextResponse.json(appointment, { status: 200 })
    })

    getAppointments = apiErrorWrapper(async (req, res) => {
        const appointments = await this.appointmentService.getAppointments();
        return NextResponse.json(appointments, { status: 200 })
    })

    saveAppointment = apiErrorWrapper(async (req, res) => {
        const parseBody = await req.json();
        await this.appointmentService.saveAppointment(parseBody);
        return NextResponse.json({ message: "La cita ha sido agendada exitosamente. Para confirmar la cita revisar el correo que se envió" }, { status: 201 });
    })

    cancelAppointment = apiErrorWrapper(async (req, params) => {
        const { id } = params.params;
        await this.appointmentService.cancelAppointment(parseInt(id));
        return NextResponse.json({ message: "la cita ha sido cancelada exitosamente" }, { status: 200 });
    })
    updateAppointment = apiErrorWrapper(async (req, params) => {
        const { id } = params.params;
        const parseBody = await req.json();

        const updatedAppointment = await this.appointmentService.updateAppointment({ 
            idAppointment: parseInt(id),
            ...parseBody    
        });

        return NextResponse.json(updatedAppointment, { status: 200 })
    })
    
    appointmentConfirmation = apiErrorWrapper(async (req, params) => {
        const confirmToken = req.nextUrl.searchParams.get("token");
        const result = await this.appointmentService.appointmentConfirmation({ confirmToken });
        console.log(result)
        return NextResponse.redirect(new URL(`/agendar-cita/confirmacion-exitosa?error=${result}`, req.url));
    })
}

export default new AppointmentController(appointmentService);