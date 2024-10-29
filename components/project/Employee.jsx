"use client"
import style from "/css/projectDashboard.module.css"
import { Avatar } from "@nextui-org/avatar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEllipsisVertical } from "@fortawesome/free-solid-svg-icons";
import { Dropdown, DropdownItem, DropdownTrigger, DropdownMenu } from "@nextui-org/dropdown";
import { deleteEmployeeAction } from "/functions/fetches/employees/employeeActions"
import { ProjectContext } from "./context/ProjectContext";
import { useContext } from "react";

export default function Employee({ idEmployee, image, name, job, email }) {
    const { project, employee, setEmployee } = useContext(ProjectContext)

    const handleDelete = async (idEmployee) => {
        const result = await deleteEmployeeAction(idEmployee);
        setEmployee(prevEmployee => prevEmployee.filter(employee => employee.idEmployee === idEmployee));
    }

    return (
        <div className={style.employee}>
            <Avatar src={image}/>
            <h3>{name}</h3>
            <p>{job}</p>
            <p>{email}</p>
            <Dropdown className="dark">
                <DropdownTrigger>
                    <div className="w-full h-full flex items-center justify-center">
                        <FontAwesomeIcon icon={faEllipsisVertical} />
                    </div>
                </DropdownTrigger>
                <DropdownMenu aria-label="Static Actions">
                    <DropdownItem onClick={() => handleDelete(idEmployee)} key="delete" className="text-danger outline-none">Eliminar</DropdownItem>
                </DropdownMenu>
            </Dropdown>
        </div>
    )
}