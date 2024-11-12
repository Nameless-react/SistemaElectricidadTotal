export default class LogRepository {
    constructor(logModel, sequelize) {
        this.logModel = logModel;
        this.sequelize = sequelize;
    }

    async getLogs (){
        const logs = await this.logModel.findAll();
        return logs
    }
}




