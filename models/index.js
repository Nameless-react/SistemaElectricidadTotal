import Tool from "./tool.model";
import Material from "./material.model";
import Provider from "./provider.model";
import ToolProvider from "./tools_provider.model";
import MaterialProvider from "./material_provider.model";
import MaintenanceNotes from "./maintance_notes.model";
import Category from "./category.model";
import Appointment from "./appointment.model";
import AppointmentConfirmation from "./appointment_confirmation.model";
import Conversation from "./conversation.model";
import ConversationParticipants from "./conversation_participants.model";
import Message from "./message.model";
import User from "./user.model";
import Task from "./task.model";
import Employee from "./employees.model";
import ExpensesProjects from "./expenses_project.model";
import Project from "./projects.model";

ExpensesProjects.belongsTo(Project, {
    foreignKey: {
        name: "idProjects",
        allowNull: false,
        as: "idProjects"
    }
});


export {
    Appointment,
    AppointmentConfirmation,
    Category,
    Conversation,
    ConversationParticipants,
    Employee,
    ExpensesProjects,
    Message,
    MaintenanceNotes,
    MaterialProvider,
    Material,
    Provider,
    Task,
    ToolProvider,
    Tool,
    Project,
    User
}