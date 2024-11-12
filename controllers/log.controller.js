import { NextResponse } from "next/server";
import sequelize from "/config/databaseConnection";
import apiErrorWrapper from "/errors/apiErrorWrapper";
import LogRepository from "../repositories/log.repository";
import LogModel from "../models/log.model";
import LogService from "../Services/log/log.service";


const logRepository = new LogRepository(LogModel, sequelize);
const logService = new LogService(logRepository);


class LogController {
    constructor(logService) {
        this.logService = logService
    }
    
    getLog = apiErrorWrapper(async (req, params) => {
        const { id } = params.params;
        const log = await this.logService.getById(parseInt(id));
        return NextResponse.json(log, { status: 200 });
    });
    
    getLogs = apiErrorWrapper(async (req, res) => {
        const log = await this.logService.getLogs();
        return NextResponse.json(log, { status: 200 })
    })

    
}

export default new LogController(logService);