"use client"
import style from "/css/projectDashboard.module.css"
import { Avatar } from "@nextui-org/avatar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEllipsisVertical } from "@fortawesome/free-solid-svg-icons";
import { Dropdown, DropdownItem, DropdownTrigger, DropdownMenu } from "@nextui-org/dropdown";
import { deleteTeamProjectEmployeeAction } from "/functions/fetches/teams/teamActions"
import { ProjectContext } from "./context/ProjectContext";
import { useContext } from "react";


export default function Employee({ idTeamProjectEmployee, image, name, job, email }) {
    const { setEmployees } = useContext(ProjectContext)

    const handleDelete = async (idTeamProjectEmployee) => {
        const result = await deleteTeamProjectEmployeeAction(idTeamProjectEmployee);
        setEmployees(prevEmployee => prevEmployee.filter(employee => employee.idTeamProjectEmployee !== idTeamProjectEmployee));
    }

    return (
        <div className={style.employee}>
            <Avatar src={image}/>
            <h3>{name}</h3>
            <p>{job}</p>
            <a href={`mailto:${email}`}>{email}</a>
            <Dropdown className="dark">
                <DropdownTrigger>
                    <div className="w-full h-full flex items-center justify-center">
                        <FontAwesomeIcon icon={faEllipsisVertical} />
                    </div>
                </DropdownTrigger>
                <DropdownMenu aria-label="Static Actions">
                    <DropdownItem onClick={() => handleDelete(idTeamProjectEmployee)} key="delete" className="text-danger outline-none">Eliminar</DropdownItem>
                </DropdownMenu>
            </Dropdown>
        </div>
    )
}