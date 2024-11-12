import { validateLog,validateIdLog,validatePartialLog } from "/functions/validations/logValidations";
import { ValidationFailureError, NotFoundError, DeletionError } from "/errors/errors";


export default class LogService {
    constructor(logRepository) {
        this.logRepository = logRepository;
    }

    async getLogs() {
        return await this.logRepository.getLogs();
    }

    async getLogById(id) {
        const validIdEmployee = validateIdLog({ idLog: id });
        if (validIdEmployee.error) throw new ValidationFailureError(validateIdLog.error);


        const log = await this.logRepository.getLogById(id);
        if (!log) throw new NotFoundError("El historial no fue encontrado")

        return log
       
    }

}