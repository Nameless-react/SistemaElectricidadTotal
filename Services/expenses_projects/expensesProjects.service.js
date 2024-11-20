

class ExpensesProjectsService {
    constructor(expensesProjectsRepository){
        this.expensesProjectsRepository = expensesProjectsRepository;
    }

    async getExpensesProjects(){
        return await this.expensesProjectsRepository.getExpensesProjects();
    }

    async  getProjectsExpensesFlow(){
        return await this.expensesProjectsRepository.getProjectsExpensesFlow()
    }

    async getExpenseProjectById(id){
        return await this.expensesProjectsRepository. getExpenseProjectById(id);
    }



    async save(formData){
        return await this.expensesProjectsRepository.saveExpensesProjects(formData);
    }

    async update(id, formData){
        return await this.expensesProjectsRepository.updateExpensesProjects(id, formData);
    }

}

export default ExpensesProjectsService;