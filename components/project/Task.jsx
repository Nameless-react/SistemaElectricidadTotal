import style from "/css/projectDashboard.module.css"
import { Avatar } from "@nextui-org/avatar";

export default function Task({ name, status, deadline, assignee }) {
    return (
        <div className={style.task}>
            <h3>{name}</h3>
            <p>{deadline}</p>
            <p>{status}</p>
            <Avatar src="https://i.pravatar.cc/150?u=a042581f4e29026024d" />
        </div>
    )
}