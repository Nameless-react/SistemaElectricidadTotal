
import sequelize from "/config/databaseConnection";
import { ProjectsService, ProjectsImagesService, TaskService, TeamProjectService } from "/services";

import {
    AppointmentRepository,
    AppointmentConfirmationRepository,
    CategoryRepository,
    ConversationRepository,
    ConversationParticipantsRepository,
    MessageRepository,
    MaintenanceNotesRepository,
    MaterialRepository,
    ProviderRepository,
    TaskRepository,
    ToolRepository,
    UserRepository,
    ExpensesProjectsRepository,
    ExpensesRepository,
    ExpenseCategoryRepository,
    ProjectBudgetRepository,
    IncomeCategoryRepository,
    IncomeRepository,
    EmployeeRepository,
    LogRepository,
    ProjectsRepository,
    ProjectImagesRepository,
    TeamProjectRepository
} from "/repositories";

import {
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
    Income,
    ProjectImages,
    ProjectUser,
    ExpenseCategory,
    Log,
    Status,
    CustomerSatisfaction,
    TaskAssignments
} from "/models";


class IoCContainer {
    constructor() {
        this.services = new Map();
        this.initialized = false;
        this.initializing = new Set(); // Para rastrear servicios en proceso de inicialización
    }

    /**
     * Registra un servicio en el contenedor.
     */
    async register(name, definition, dependencies = [], lifecycle = 'singleton') {
        if (this.services.has(name)) {
            throw new Error(`Service ${name} is already registered.`);
        }
        this.services.set(name, {
            definition,
            dependencies,
            instance: null,
            lifecycle,
        });
        console.log(`Registered service: ${name}`);
    }

    /**
     * Resuelve un servicio, inicializándolo si es necesario.
     */
    async get(name) {
        const service = this.services.get(name);
        if (!service) {
            throw new Error(`Service ${name} not found.`);
        }

        if (this.initializing.has(name)) {
            throw new Error(`Circular dependency detected for service: ${name}`);
        }

        // Si el servicio ya está inicializado y es singleton, devuélvelo
        if (service.instance && service.lifecycle === 'singleton') {
            return service.instance;
        }

        // Marcar como en proceso de inicialización
        this.initializing.add(name);

        try {
            // Resolver dependencias
            const resolvedDependencies = await Promise.all(
                service.dependencies.map(dep => this.get(dep))
            );

            // Crear instancia
            service.instance = await service.definition(...resolvedDependencies);

            console.log(`Initialized service: ${name}`);
            return service.instance;
        } finally {
            // Quitar de la lista de inicialización
            this.initializing.delete(name);
        }
    }

    /**
     * Inicializa todos los servicios registrados.
     */
    async initialize() {
        console.log('Initializing IoC Container...');
        for (const name of this.services.keys()) {
            await this.get(name);
        }
        this.initialized = true;
        console.log('IoC Container initialized.');
    }

    clearInstances() {
        this.services.forEach(service => {
            service.instance = null;
        });
        this.initialized = false;
    }
    async registerDependencies() {
        // Registrar modelos
        this.register('AppointmentModel', () => Appointment);
        this.register('AppointmentConfirmationModel', () => AppointmentConfirmation);
        this.register('CategoryModel', () => Category);
        this.register('ConversationModel', () => Conversation);
        this.register('ConversationParticipantsModel', () => ConversationParticipants);
        this.register('EmployeeModel', () => Employee);
        this.register('ExpensesProjectsModel', () => ExpensesProjects);
        this.register('MessageModel', () => Message);
        this.register('MaintenanceNotesModel', () => MaintenanceNotes);
        this.register('MaterialProviderModel', () => MaterialProvider);
        this.register('MaterialModel', () => Material);
        this.register('ProviderModel', () => Provider);
        this.register('TaskModel', () => Task);
        this.register('ToolProviderModel', () => ToolProvider);
        this.register('TeamProjectModel', () => TeamProject);
        this.register('TeamProjectEmployeeModel', () => TeamProjectEmployee);
        this.register('ToolModel', () => Tool);
        this.register('ProjectModel', () => Project);
        this.register('ProjectBudgetModel', () => ProjectBudget);
        this.register('UserModel', () => User);
        this.register('IncomeCategoryModel', () => IncomeCategory);
        this.register('IncomeModel', () => Income);
        this.register('ProjectImagesModel', () => ProjectImages);
        this.register('ProjectUserModel', () => ProjectUser);
        this.register('ExpenseCategoryModel', () => ExpenseCategory);
        this.register('LogModel', () => Log);
        this.register('StatusModel', () => Status);
        this.register('CustomerSatisfactionModel', () => CustomerSatisfaction);
        this.register('TaskAssignmentsModel', () => TaskAssignments);
        this.register('sequelize', () => sequelize);

        // Registrar Repositorios
        this.register('ProjectsRepository', (ProjectModel, StatusModel, EmployeeModel, TaskModel, TeamProjectModel, TeamProjectEmployeeModel, UserModel, TaskAssignmentsModel, ExpensesProjectsModel, ProjectBudgetModel, ProjectUserModel, sequelize) => 
            new ProjectsRepository({
                projectModel: ProjectModel,
                statusModel: StatusModel,
                employeeModel: EmployeeModel,
                taskModel: TaskModel,
                teamProjectModel: TeamProjectModel,
                teamProjectEmployeeModel: TeamProjectEmployeeModel,
                userModel: UserModel,
                taskAssignmentModel: TaskAssignmentsModel,
                expensesModel: ExpensesProjectsModel,
                budgetModel: ProjectBudgetModel,
                projectUserModel: ProjectUserModel,
                sequelize: sequelize
            }), 
            ['ProjectModel', 'StatusModel', 'EmployeeModel', 'TaskModel', 'TeamProjectModel', 'TeamProjectEmployeeModel', 'UserModel', 'TaskAssignmentsModel', 'ExpensesProjectsModel', 'ProjectBudgetModel', 'ProjectUserModel', 'sequelize']
        );

        this.register("TaskRepository", (TaskModel, sequelize) => new TaskRepository(TaskModel, sequelize), ["TaskModel", "sequelize"]);
        this.register("TeamProjectRepository", (TeamProjectModel, TeamProjectEmployeeModel, sequelize) => new TeamProjectRepository(TeamProjectModel, TeamProjectEmployeeModel, sequelize), ["TeamProjectModel", "TeamProjectEmployeeModel", "sequelize"])




        // Registrar Servicios
        this.register('ProjectsService', (projectsRepository, projectsImagesService) => 
            new ProjectsService(projectsRepository, projectsImagesService), 
            ['ProjectsRepository', 'ProjectsImagesService']
        );

        this.register('ProjectsImagesService', () => 
            new ProjectsImagesService(), 
            []
        );

        this.register("TaskService", (taskRepository) => new TaskService(taskRepository), ["TaskRepository"])
        this.register("TeamProjectService", (teamProjectRepository) => new TeamProjectService(teamProjectRepository), ["TeamProjectRepository"])
    }
}

const container = new IoCContainer();
await container.registerDependencies();
export default container;