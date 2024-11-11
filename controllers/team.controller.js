import { NextResponse } from "next/server";
import sequelize from "/config/databaseConnection";
import apiErrorWrapper from "/errors/apiErrorWrapper";
import TeamService from "/services/teams/team.service";
import { TeamProject, TeamProjectEmployee } from "/models/index";
import EmployeeRepository from "../repositories/employee.repository";



const teamRepository = new EmployeeRepository(TeamProject, TeamProjectEmployee, sequelize);
const teamService = new TeamService(teamRepository);


class TeamController {
    constructor(teamService) {
        this.teamService = teamService
    }

    getTeam = apiErrorWrapper(async (req, params) => {
        const { id } = params.params;
        const task = await this.teamService.getTaskById(parseInt(id));
        return NextResponse.json(task, { status: 200 });
    })
    
    getTeams = apiErrorWrapper(async (req, res) => {
        const tasks = await this.teamService.getTasks();
        return NextResponse.json(tasks, { status: 200 });
    });

    getTeamByProject = apiErrorWrapper(async (req, params) => {
        const { id } = params.params;
        const team = await this.teamService.getTeamByProject(parseInt(id));
        return NextResponse.json(team, { status: 200 });
    });
   
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

    addEmployee = apiErrorWrapper(async (req, params) => {
        const parseBody = await req.json();

        const addedEmployees = await this.teamService.addEmployee({ ...parseBody, employees: new Set([...parseBody.employees]) });

        return NextResponse.json(addedEmployees, { status: 200 })
    })
}

export default new TeamController(teamService);