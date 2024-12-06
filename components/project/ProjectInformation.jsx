"use client"
import { Tabs, Tab } from "@nextui-org/tabs"
import ConfigurationProject from "/components/project/ConfigurationProject";
import ProjectDashboard from "/components/project/ProjectDashboard";
import styles from "/css/projectPage.module.css";
import Status from "./Status";
import { useContext } from "react";
import { ProjectContext } from "./context/ProjectContext";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";

export default function ProjectInformation() {
    const { project } = useContext(ProjectContext);
    const { data: session } = useSession();


    return (
        project && (<div className={styles.projectContainer}>
            <div className={styles.optionsProjects}>
                <Link href="/proyectos"><FontAwesomeIcon icon={faArrowLeft} className="text-4xl"/></Link>
                <h1>{project.name}</h1>
                <Status size="s" status={project.status} />
            </div>
            <Tabs fullWidth aria-label="Options" classNames={{
                tabList: "w-full px-6 bg-[#182237]",
                tab: "font-bold text-white"
            }}>
                <Tab key={"Información"} title="Información">
                    <ProjectDashboard />
                </Tab>
                {session?.user.roles.includes("Administrador") && <Tab key={"Configuración"} title="Configuración">
                    <ConfigurationProject />
                </Tab>}
            </Tabs>
        </div>)
    )
}