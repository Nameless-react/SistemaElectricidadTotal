"use client";
import style from "/css/projectDashboard.module.css";
import { AvatarGroup, Avatar } from "@nextui-org/avatar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEllipsisVertical } from "@fortawesome/free-solid-svg-icons";
import { Dropdown, DropdownItem, DropdownTrigger, DropdownMenu } from "@nextui-org/dropdown";
import { format } from "@formkit/tempo";
import { deleteTaskAction } from "/functions/fetches/projects/taskActions";
import { useContext, useState } from "react";
import { ProjectContext } from "./context/ProjectContext";
import UpdateTaskModal from "./UpdateTaskModal";
import { useDisclosure } from "@nextui-org/modal"
import FormTask from "./FormTask"
import Status from "./Status";



export default function Task({ idTasks, title, status, deadline, assignedEmployees, idStatus, description }) {
    const { project, loadProjectData } = useContext(ProjectContext);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const {isOpen, onOpen, onOpenChange} = useDisclosure();


    const handleDelete = async (idTask) => {
        const result = await deleteTaskAction(idTask);
        await loadProjectData(project?.idProjects)
    };

    

    return (
        <div className={style.task}>
            <h3>{title}</h3>
            <p>{format(deadline, "DD/MM/YYYY")}</p>
            {/* <p>{status}</p> */}
            <Status status={status} size="s" />
            <AvatarGroup isBordered>
                {assignedEmployees.map((employee, index) => (
                    <Avatar size="sm" key={index} src={employee.image || "https://i.pravatar.cc/150"} />
                ))}
            </AvatarGroup>

            <Dropdown className="dark" isOpen={isDropdownOpen} onOpenChange={setIsDropdownOpen}>
                <DropdownTrigger>
                    <div className="w-full h-full flex items-center justify-center">
                        <FontAwesomeIcon icon={faEllipsisVertical} />
                    </div>
                </DropdownTrigger>
                <DropdownMenu aria-label="Static Actions">
                    <DropdownItem onPress={onOpen} key="update" className="text-blue-600 outline-none font-bold">Editar</DropdownItem>
                    <DropdownItem onClick={() => handleDelete(idTasks)} key="delete" className="text-danger outline-none font-bold">Eliminar</DropdownItem>
                </DropdownMenu>
            </Dropdown>

            <UpdateTaskModal onOpenChange={onOpenChange} isOpen={isOpen}>
                {({ onClose }) => <FormTask title={title} deadline={deadline} description={description} idStatus={idStatus} employees={assignedEmployees} idTasks={idTasks} onClose={onClose} />}
            </UpdateTaskModal>
        </div>
    )
}