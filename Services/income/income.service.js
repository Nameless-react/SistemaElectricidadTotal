class IncomeService {
    constructor(IncomeRepository) {
        this.IncomeRepository = IncomeRepository;
    }

    async getIncomes() {
        return await this.IncomeRepository.getIncomes();
    }

    async getIncomeById(id) {
        return await this.IncomeRepository.getIncomeById(id);
    }

    async save(data) {
        return await this.IncomeRepository.saveIncome(data);
    }

    async update(data, id) {
        return await this.IncomeRepository.updateIncome(data, id);
    }

    async inactivate(id) {
        return await this.IncomeRepository.inactivateIncome(id);
    }

}

export default IncomeService;