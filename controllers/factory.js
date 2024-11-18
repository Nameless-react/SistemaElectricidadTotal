
import { writeFile } from "fs/promises";
import path from "path";
import { z } from "zod";
import { validateUser } from "../functions/validations/userValidation";
import { validateProfileUpdate } from "../functions/validations/profileValidation";
import { ExpenseCategoryRepository, ExpensesRepository, ExpensesProjectsRepository, ToolRepository, CategoryRepository, ProviderRepository, MaintenanceNotesRepository, MaterialRepository, UserRepository, ProjectBudgetRepository, IncomeCategoryRepository, IncomeRepository } from "../repositories";
import { ValidationExpenseProjectService, ValidationExpenseCategoryService, ExpenseCategoryService, ExpensesService, ExpensesProjectsService, ValidationUserProfileService, ValidationUserService, ValidationMaterialService, MaintenanceNotesService, MaterialService, CategoryService, ProviderService, ImageService, ToolService, ValidationMaintenanceNotesService, ValidationToolsService, UserService, ProjectBudgetService, ValidationProjectBudgetService, ProjectsService, ProjectsImagesService, IncomeCategoryService, IncomeService, ValidationIncomeCategoryService} from "../Services";
import { ExpenseCategoryController, ExprensesController, SignUpController, ToolController, MaterialController, UserController, appointmentController, BudgetController, IncomeCategoryController, IncomeController } from "../controllers";
import sequelze from "../config/databaseConnection";
import { Income, ProjectBudget, Category, Provider, Tool, MaintenanceNotes, Material, ExpensesProjects, TeamProjectEmployee, TeamProject, Task, Employee, Project, IncomeCategory } from "../models";
import { validateMaterialsForm } from "../functions/validations/materialsValidtion";
import { validateFormTools } from "../functions/validations/toolsValidation";
import User from "../models/user.model";
import { ErrorHandler } from "../errors/errors";
import { admin } from "../config/firebaseConfig";
import ExpenseCategory from "../models/expense_category.model";
import { validateExpenseCategoryForm } from "../functions/validations/expenseCategoryValidation";
import { validateProjectBudgetForm } from "../functions/validations/projectBudgetValidation";
import ProjectsRepository from "../repositories/project.repository";
import TaskAssignments from "../models/taskAssignments.model";
import Status from "../models/status.model";
import ProjectImagesRepository from "../repositories/projectImages.repository";
import { validateProjectExpenseForm } from "../functions/validations/projectExpensesValidation";
import { validateIncomeCategoryForm } from "../functions/validations/incomeCategoryValidation";

/**
 * Creates an instance of ToolController.
 *
 * @returns {ToolController} - the ToolController instance
 */
export const createToolController = () => {
    const errorHandler = new ErrorHandler();
    const maintenanceNotesRepository = new MaintenanceNotesRepository(MaintenanceNotes);
    const validationToolsService = new ValidationToolsService(validateFormTools);
    const validationMaintenanceNotesService = new ValidationMaintenanceNotesService(z);
    const maintenanceNotesService = new MaintenanceNotesService(maintenanceNotesRepository, validationMaintenanceNotesService);
    const imageService = new ImageService(writeFile, path, admin);
    const categoryRepository = new CategoryRepository(Category);
    const providerRepository = new ProviderRepository(Provider);
    const categoryService = new CategoryService(categoryRepository);
    const providerService = new ProviderService(providerRepository);
    const toolRepository = new ToolRepository(Tool, sequelze);
    const toolService = new ToolService(toolRepository);
    return new ToolController(imageService, validationToolsService, categoryService, providerService, toolService, maintenanceNotesService, errorHandler);
}
/**
 * Creates an instance of MaterialController.
 *
 * @returns {MaterialController} - the MaterialController instance
 */
export const createMaterialController = () => {
    const errorHandler = new ErrorHandler();
    const categoryRepository = new CategoryRepository(Category);
    const providerRepository = new ProviderRepository(Provider);
    const providerService = new ProviderService(providerRepository);
    const categoryService = new CategoryService(categoryRepository);
    const materialRepository = new MaterialRepository(Material, sequelze);
    const materialService = new MaterialService(materialRepository);
    const validationMaterialService = new ValidationMaterialService(validateMaterialsForm);
    return new MaterialController(materialService, validationMaterialService, categoryService, providerService, errorHandler);
}
/**
 * Creates an instance of UserController.
 *
 * @returns {UserController} - the UserController instance
 */
export const createUserController = () => {
    const errorHandler = new ErrorHandler();
    const validationUserProfileService = new ValidationUserProfileService(validateProfileUpdate);
    const imageService = new ImageService(writeFile, path, admin);
    const userRepository = new UserRepository(User, sequelze);
    const userService = new UserService(userRepository);
    return new UserController(userService, imageService, validationUserProfileService, errorHandler);
}

/**
 * Creates an instance of SignUpController.
 *
 * @returns {SignUpController} - the SignUpController instance
 */
export const createSignUpController = () => {
    const errorHandler = new ErrorHandler();
    const userRepository = new UserRepository(User, sequelze);
    const userService = new UserService(userRepository);
    const validationUserService = new ValidationUserService(validateUser);
    return new SignUpController(userService, validationUserService, errorHandler);
}

/**
 * Creates an instance of ExpensesController.
 *
 * @returns {ExprensesController} An instance of ExpensesController.
 */
export const createExpensesController = () => {
    const userRepository = new UserRepository(User, sequelze);
    const expenseCategoryRepository = new ExpenseCategoryRepository(sequelze, ExpenseCategory);
    const expensesProjectsRepository = new ExpensesProjectsRepository(ExpensesProjects, sequelze);
    const expensesRepository = new ExpensesRepository(sequelze);
    const errorHandler = new ErrorHandler();
    const validationExpenseProjectService = new ValidationExpenseProjectService(validateProjectExpenseForm)
    const expensesService = new ExpensesService(expensesRepository);
    const expensesProjectsService = new ExpensesProjectsService(expensesProjectsRepository);
    const userService = new UserService(userRepository);
    const expenseCategoryService = new ExpenseCategoryService(expenseCategoryRepository);
    return new ExprensesController(expensesProjectsService, validationExpenseProjectService, expensesService, userService, expenseCategoryService, errorHandler);
}

/**
 * Creates an instance of ExpenseCategoryController.
 *
 * This function sets up the necessary dependencies for the ExpenseCategoryController,
 * including the ErrorHandler, ExpenseCategoryRepository, and ExpenseCategoryService.
 *
 * @returns {ExpenseCategoryController} An instance of ExpenseCategoryController.
 */
export const createExpensesCategoryController = () => {
    const errorHandler = new ErrorHandler();
    const validationExpenseCategoryService = new ValidationExpenseCategoryService(validateExpenseCategoryForm);
    const expenseCategoryRepository = new ExpenseCategoryRepository(sequelze, ExpenseCategory);
    const expenseCategoryService = new ExpenseCategoryService(expenseCategoryRepository);
    return new ExpenseCategoryController(expenseCategoryService, validationExpenseCategoryService, errorHandler);
}

/**
 * Creates and returns a new instance of BudgetController.
 *
 * This function sets up the necessary dependencies for the BudgetController,
 * including the ErrorHandler, ProjectBudgetRepository, and ProjectBudgetService.
 *
 * @returns {BudgetController} A new instance of BudgetController.
 */
export const createBudgetController = () => {
    const errorHandler = new ErrorHandler();
    const userRepository = new UserRepository(User, sequelze);
    const projectBudgetRepository = new ProjectBudgetRepository(sequelze, ProjectBudget);
    const projectsRepository = new ProjectsRepository(Project, Status, Employee, Task, TeamProject, TeamProjectEmployee, User, TaskAssignments, ExpensesProjects, ProjectBudget, sequelze);
    const validationProjectBudgetService = new ValidationProjectBudgetService(validateProjectBudgetForm);
    const userService = new UserService(userRepository);
    const projectService = new ProjectsService(projectsRepository)
    const projectBudgetService = new ProjectBudgetService(projectBudgetRepository);
    return new BudgetController(projectBudgetService, projectService, userService, validationProjectBudgetService, errorHandler);
}

/**
 * Creates an instance of IncomeCategoryController.
 *
 * This function sets up the necessary dependencies for the IncomeCategoryController,
 * including the ErrorHandler, IncomeCategoryRepository, and IncomeCategoryService.
 *
 * @returns {IncomeCategoryController} An instance of IncomeCategoryController.
 */
export const createIncomeCategoryController = () => {
    const errorHandler = new ErrorHandler();
    const validationIncomeCategoryService = new ValidationIncomeCategoryService(validateIncomeCategoryForm);
    const incomeCategoryRepository = new IncomeCategoryRepository(IncomeCategory, sequelze);
    const incomeCategoryService = new IncomeCategoryService(incomeCategoryRepository);
    return new IncomeCategoryController(incomeCategoryService, validationIncomeCategoryService, errorHandler);
}

export const createIncomeController = () => {
    const errorHandler = new ErrorHandler();
    const incomeRepository = new IncomeRepository(Income);
    const incomeService = new IncomeService(incomeRepository);
    return new IncomeController(incomeService, errorHandler);
}




