/**
 * Service class for managing project budgets.
 */
class ProjectBudgetService {
    /**
     * Creates an instance of ProjectBudgetService.
     */
    constructor(projectBudgetRepository) {
        this.projectBudgetRepository = projectBudgetRepository;
    }

    /**
     * Retrieves all project budgets.
     * @returns {Promise<Array>} A promise that resolves to an array of project budgets.
     */
    async getProjectBudgets() {
        return await this.projectBudgetRepository.getProjectBudgets();
    }

    /**
     * Retrieves the flow of project budgets.
     * @returns {Promise<Array>} A promise that resolves to an array of project budget flows.
     */
    async getProjectBugetsFlow() {
        return await this.projectBudgetRepository.getProjectBugetsFlow();
    }

    async getProjectBudgetById(id) {
        return await this.projectBudgetRepository.getProjectBudgetById(id);
    }

    

    /**
     * Saves the project budget data.
     *
     * @param {Object} formData - The form data containing project budget information.
     * @returns {Promise<Object>} A promise that resolves to the saved project budget data.
     */
    async save(formData) {
        return await this.projectBudgetRepository.saveProjectBudget(formData);
    }
    
    async update(formData, id) {
        return await this.projectBudgetRepository.updateProjectBudget(formData, id);
    }
}


export default ProjectBudgetService;