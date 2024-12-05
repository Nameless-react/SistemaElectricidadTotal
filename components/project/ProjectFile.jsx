"use client";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDownload, faEllipsisVertical, faTrash } from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";
import style from "/css/projectDashboard.module.css"
import { Dropdown, DropdownItem, DropdownTrigger, DropdownMenu } from "@nextui-org/dropdown";


export default function ProjectFile({ name, modifiedAt, link }) {
    const handleFileDownload = () => {

    }
    return (
        <div className={style.projectFile}>
            <span>{name.substring(name.lastIndexOf('.') + 1)}</span>
            <h4>{name}</h4>
            <p>{modifiedAt}</p>
            <Dropdown className="dark">
                <DropdownTrigger>
                    <div className="w-3 h-full flex items-center justify-center cursor-pointer">
                        <FontAwesomeIcon icon={faEllipsisVertical} />
                    </div>
                </DropdownTrigger>
                <DropdownMenu aria-label="Static Actions">
                    <DropdownItem onClick={() => handleDelete(idTeamProjectEmployee)} key="delete" className="text-danger outline-none"><FontAwesomeIcon icon={faTrash} /> Eliminar</DropdownItem>
                    <DropdownItem className="text-[#F1B217]"><FontAwesomeIcon icon={faDownload} /> Descargar</DropdownItem>
                </DropdownMenu>
            </Dropdown>
        </div>
    )
}