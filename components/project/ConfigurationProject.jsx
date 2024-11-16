"use client"
import styles from "/css/projectConfiguration.module.css";
import DeleteProject from "./DeleteProject";
import ChangeProjectInformation from "./ChangeProjectInformation"

export default function ConfigurationProject() {  
    return (
        <div className={styles.projectConfiguration}>
            <ChangeProjectInformation />

            <DeleteProject />
        </div>
    )
}