class IncomeService {
    constructor(IncomeRepository){
        this.IncomeRepository = IncomeRepository;
    }

    async getIncomes(){
        return await this.IncomeRepository.getIncomes();
    }

}

export default IncomeService;