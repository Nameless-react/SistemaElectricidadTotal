"use client"
import style from "/css/projectDashboard.module.css"
import { AvatarGroup, Avatar } from "@nextui-org/avatar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEllipsisVertical } from "@fortawesome/free-solid-svg-icons";
import { Dropdown, DropdownItem, DropdownTrigger, DropdownMenu } from "@nextui-org/dropdown";
import { format } from "@formkit/tempo";
import { deleteTaskAction } from "/functions/fetches/projects/taskActions"
import { useContext } from "react";
import { ProjectContext } from "./context/ProjectContext";


export default function Task({ idTasks, title, status, deadline, assignedEmployees }) {
    const { project, setProject } = useContext(ProjectContext)

    const handleDelete = async (idTask) => {
        const result = await deleteTaskAction(idTask);

        setProject(prevProject => ({
            ...prevProject,
            tasks: prevProject.tasks.filter((task) => task.idTasks !== idTask),
        }));
    }

    return (
        <div className={style.task}>
            <h3>{title}</h3>
            <p>{format(deadline, "DD/MM/YYYY")}</p>
            <p>{status}</p>
            <AvatarGroup isBordered>
                    {assignedEmployees.map((employee, index) => (
                        <Avatar size="sm" key={index} src={employee.avatarUrl || "https://i.pravatar.cc/150"} />
                    ))}
            </AvatarGroup>
            <Dropdown className="dark">
                <DropdownTrigger>
                    <div className="w-full h-full flex items-center justify-center">
                        <FontAwesomeIcon icon={faEllipsisVertical} />
                    </div>
                </DropdownTrigger>
                <DropdownMenu aria-label="Static Actions">
                    <DropdownItem key="update" className="text-blue-600 outline-none">Editar</DropdownItem>
                    <DropdownItem onClick={() => handleDelete(idTasks, project.idProjects)} key="delete" className="text-danger outline-none">Eliminar</DropdownItem>
                </DropdownMenu>
            </Dropdown>
        </div>
    )
}