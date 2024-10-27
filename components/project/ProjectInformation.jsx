"use client"
import { Tabs, Tab } from "@nextui-org/tabs"
import ConfigurationProject from "/components/project/ConfigurationProject";
import ProjectDashboard from "/components/project/ProjectDashboard";
import styles from "/css/projectPage.module.css";


export default function ProjectInformation({ project }) {
    return (
        <div className={styles.projectContainer}>
            <div className={styles.optionsProjects}>
                <h1>{project.name}</h1>
            </div>
            <Tabs fullWidth aria-label="Options" classNames={{
                tabList: "w-full px-6",
                tab: "font-bold"
            }}>      
                <Tab key={"Información"} title="Información">
                    <ProjectDashboard 
                        {...project}
                        //RECORDAR CAMBIAR EXPENSES
                        expenses={project.budget}
                    />
                </Tab>
                <Tab key={"Configuración"} title="Configuración">
                    <ConfigurationProject name={project.name} idProjects={project.idProjects}/>
                </Tab>
            </Tabs>
        </div>
    )
}