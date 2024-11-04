import { NextResponse } from "next/server";
import sequelize from "/config/databaseConnection";
import apiErrorWrapper from "/errors/apiErrorWrapper";
import AppointmentService from "/services/appointments/appointment.service";
import appointmentModel from "/models/appointment.model";
import appointmentConfirmationModel from "/models/appointment_confirmation.model"
import MailService from "/services/appointments/mail.service";
import { AppointmentConfirmationRepository, AppointmentRepository } from "/repositories/index";
import config from "/config/config"


const mailService = new MailService(config.resend);
const appointmentConfirmationRepository = new AppointmentConfirmationRepository(appointmentConfirmationModel, sequelize);
const appointmentRepository = new AppointmentRepository(appointmentModel, sequelize);
const appointmentService = new AppointmentService(appointmentRepository, mailService,appointmentConfirmationRepository );


class AppointmentController {
    constructor(appointmentService) {
        this.appointmentService = appointmentService
    }

    getAppointment = apiErrorWrapper(async (req, params) => {
        const { id } = params.params;
        const appointment = await this.appointmentService.getAppointmentById(parseInt(id));
        return NextResponse.json(appointment, { status: 200 })
    })

    getAppointments = apiErrorWrapper(async (req, res) => {
        const appointments = await this.appointmentService.getAppointments();
        return NextResponse.json(appointments, { status: 200 })
    })

    saveAppointment = apiErrorWrapper(async (req, res) => {
        const parseBody = await req.json();
        await this.appointmentService.saveAppointment(parseBody);
        return NextResponse.json({ message: "Su cita ha sido agendada con éxito. Por favor, revise su correo electrónico para confirmar la cita." }, { status: 201 });
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
        return NextResponse.redirect(new URL(`/citas/confirmacion-exitosa`, req.url));
    })
}

export default new AppointmentController(appointmentService);