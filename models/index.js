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
import TeamProject from "./team_project.model";
import TeamProjectEmployee from "./team_project_employee.model";
import Project from "./projects.model";
import ProjectBudget from "./project_budget.model";
import IncomeCategory from "./income_category.model";
import Income from "./income.model";


Income.belongsTo(IncomeCategory, {
    foreignKey: {
        name: "idIncomeCategory",
        allowNull: false,
        as: "idIncomeCategory"
    }
});

Income.belongsTo(Project, {
    foreignKey: {
        name: "idProject",
        allowNull: false,
        as: "idProject"
    }
});

Income.belongsTo(User, {
    foreignKey: {
        name: "idUser",
        allowNull: false,
        as: "idUser"
    }
});

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
    TeamProject,
    TeamProjectEmployee,
    Tool,
    Project,
    ProjectBudget,
    User,
    IncomeCategory,
    Income
}