"use client"
import styles from "/css/projectConfiguration.module.css";
import DeleteProject from "./DeleteProject";
import ChangeProjectInformation from "./ChangeProjectInformation"
import { useContext } from "react";
import { ProjectContext } from "./context/ProjectContext";


export default function ConfigurationProject() {
    const { project, loadProjectData } = useContext(ProjectContext);
    
    return (
        <div className={styles.projectConfiguration}>
            <ChangeProjectInformation project={project} loadProjectData={loadProjectData} />

            <DeleteProject />
        </div>
    )
}