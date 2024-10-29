"use server"
import { Progress } from "@nextui-org/progress";
import styles from "/css/projects.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Avatar, AvatarGroup } from "@nextui-org/avatar";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";
import Status from "./Status";


export default async function Project({ idProjects, status, name, description, progressValue, employees }) {
   
    return (
        <div className={styles.project}>
            <div className={styles.optionsProject}>
                <Status status={status}/>
                <Link href={`/proyectos/${idProjects}`}>
                    <FontAwesomeIcon className="text-2xl" icon={faArrowRight} />
                </Link>
            </div>
            <h2>{name}</h2>
            <p>{description}</p>
            <hr />
            <Progress
                aria-label="Loading..."
                size="md"
                value={progressValue}
                color="success"
                showValueLabel={true}
                className="max-w-md"
                classNames={{
                    track: "bg-gray-900 w-full order-first",
                    base: "flex-row justify-center items-center gap-4"
                }}
            />
            <div className={styles.members}>
                <AvatarGroup isBordered>
                    {employees && employees.map((image, index) => (
                        <Avatar key={index} src={image || "https://i.pravatar.cc/150"} />
                    ))}
                </AvatarGroup>
            </div>
        </div>
    );
}
