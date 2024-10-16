import { useEffect, useState } from "react";
import { Progress } from "@nextui-org/progress";
import styles from "/css/projects.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Avatar, AvatarGroup } from "@nextui-org/avatar";
import { faPause, faPlay, faClock, faCheckCircle, faQuestionCircle, faArrowRight } from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";

const statusDetails = {
    'En progreso': { class: 'inProgress', icon: faPlay },
    'Pendiente': { class: 'pending', icon: faClock },
    'En espera': { class: 'onHold', icon: faPause },
    'Completado': { class: 'completed', icon: faCheckCircle }
};

const defaultStatus = { class: '', icon: faQuestionCircle };

export default function ProjectsList() {
    const [projects, setProjects] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchProjects = async () => {
            try {
                const response = await fetch('/api/project'); 
                if (!response.ok) {
                    throw new Error('Failed to fetch projects');
                }
                const data = await response.json();
                setProjects(data);
            } catch (err) {
                setError(err.message);
            }
        };

        fetchProjects();
    }, []);

    if (error) {
        return <p>Error: {error}</p>;
    }

    return (
        <div>
            {projects.map((project) => (
                <Project
                    key={project.id_projects} 
                    status={project.status}
                    name={project.name}
                    description={project.description}
                    progressValue={project.progressValue} 
                    employees={project.employees} 
                />
            ))}
        </div>
    );
}

function Project({ status, name, description, progressValue, employees }) {
    const { class: statusClass, icon: statusIcon } = statusDetails[status] || defaultStatus;

    return (
        <div className={styles.project}>
            <div className={styles.optionsProject}>
                <div className={`${styles.status} ${styles[statusClass]}`}>
                    <FontAwesomeIcon className="text-2xl" icon={statusIcon} />
                    <p>{status}</p>
                </div>
                <Link href="#">
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
                    {employees.map((employee, index) => (
                        <Avatar key={index} src={employee.avatarUrl || "https://i.pravatar.cc/150"} />
                    ))}
                </AvatarGroup>
            </div>
        </div>
    );
}
