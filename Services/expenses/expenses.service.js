 class ExpensesService {
    constructor(expensesRepository){
        this.expensesRepository = expensesRepository;
    }

    async getExpensesFlow(){
        return await this.expensesRepository.getExpensesFlow();
    }
 }

    export default ExpensesService;