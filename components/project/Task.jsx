import style from "/css/projectDashboard.module.css"
import { Avatar } from "@nextui-org/avatar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEllipsisVertical } from "@fortawesome/free-solid-svg-icons";
import { Dropdown, DropdownItem, DropdownTrigger, DropdownMenu } from "@nextui-org/dropdown";


export default function Task({ idTask, name, status, deadline, assignee }) {
    return (
        <div className={style.task}>
            <h3>{name}</h3>
            <p>{deadline}</p>
            <p>{status}</p>
            <Avatar src="https://i.pravatar.cc/150?u=a042581f4e29026024d" />
            <Dropdown className="dark">
                <DropdownTrigger>
                    <div className="w-full h-full flex items-center justify-center">
                        <FontAwesomeIcon icon={faEllipsisVertical} />
                    </div>
                </DropdownTrigger>
                <DropdownMenu aria-label="Static Actions">
                    <DropdownItem key="update" className="text-blue-600 outline-none">Editar</DropdownItem>
                    <DropdownItem key="delete" className="text-danger outline-none">Eliminar</DropdownItem>
                </DropdownMenu>
            </Dropdown>
        </div>
    )
}