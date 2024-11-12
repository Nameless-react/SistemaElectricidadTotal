"use client"
import styles from "/css/projectConfiguration.module.css";
import { useContext } from "react";
import { ProjectContext } from "./context/ProjectContext";
import DeleteProject from "./DeleteProject";
import ChangeProjectInformation from "./ChangeProjectInformation"

export default function ConfigurationProject() {
    const { project } = useContext(ProjectContext);
    const { idProjects } = project;
    
    return (
        <div className={styles.projectConfiguration}>
            <ChangeProjectInformation />

            <DeleteProject />
        </div>

       
    )
}