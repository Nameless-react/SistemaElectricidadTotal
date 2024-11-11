

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

}

export default ExpensesProjectsService;