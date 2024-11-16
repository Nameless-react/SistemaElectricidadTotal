import { NextResponse } from "next/server";
import sequelize from "/config/databaseConnection";
import apiErrorWrapper from "/errors/apiErrorWrapper";
import TeamService from "/services/teamProject/teamProject.service";
import { TeamProject, TeamProjectEmployee } from "/models/index";
import TeamProjectRepository from "../repositories/teamProject.repository";


const teamRepository = new TeamProjectRepository(TeamProject, TeamProjectEmployee, sequelize);
const teamService = new TeamService(teamRepository);


class TeamProjectController {
    constructor(teamService) {
        this.teamService = teamService
    }
    
    getTeams = apiErrorWrapper(async (req, res) => {
        const teams = await this.teamService.getTeams();
        return NextResponse.json(teams, { status: 200 });
    })
   

    saveTeam = apiErrorWrapper(async (req, res) => {
        const parseBody = await req.json();
        
        await this.teamService.saveTask({ ...parseBody, employees: new Set(parseBody.employees) });
        return NextResponse.json({ message: "Tarea guardada con éxito" }, { status: 201 });
    })

    deleteEmployee = apiErrorWrapper(async (req, params) => {
        const { id } = params.params;
        await this.teamService.deleteEmployee(parseInt(id));
        return NextResponse.json({ message: "El empleado se eliminó con éxito" }, { status: 200 });
    })

    changeEmployees = apiErrorWrapper(async (req, params) => {
        const { id } = params.params;
        const parseBody = await req.json();

        await this.teamService.changeEmployees({ idTeamProject: parseInt(id), employees: new Set(parseBody.employees) });
        return NextResponse.json({ message: "Se actualizo con éxito la lista de empleados" }, { status: 200 });
    })
}

export default new TeamProjectController(teamService);