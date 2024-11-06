"use client"
import { Tabs, Tab } from "@nextui-org/tabs"
import ConfigurationProject from "/components/project/ConfigurationProject";
import ProjectDashboard from "/components/project/ProjectDashboard";
import styles from "/css/projectPage.module.css";
import Status from "./Status";
import { useContext } from "react";
import { ProjectContext } from "./context/ProjectContext";


export default function ProjectInformation() {
    const { project } = useContext(ProjectContext);
    
    return (
        project && (<div className={styles.projectContainer}>
            <div className={styles.optionsProjects}>
                <h1>{project.name}</h1>
                <Status size="s" status={project.status} />
            </div>
            <Tabs fullWidth aria-label="Options" classNames={{
                tabList: "w-full px-6 bg-[#182237]",
                tab: "font-bold"
            }}>
                <Tab key={"Información"} title="Información">
                    <ProjectDashboard />
                </Tab>
                <Tab key={"Configuración"} title="Configuración">
                    <ConfigurationProject />
                </Tab>
            </Tabs>
        </div>)
    )
}