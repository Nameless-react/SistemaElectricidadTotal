"use client"
import style from "/css/projectConfiguration.module.css"
import { useContext } from "react"
import { ProjectContext } from "./context/ProjectContext"
import SelectWrapper from "../others/SelectWrapper"


export default function ManageAccesProjectUser() {
    const { project, users, employees } = useContext(ProjectContext);

    return (
        <div className="flex align-center justify-center gap-8 flex-col w-full">
            <div className={style.addUsersProject}>
                <h3>Manejar Acceso</h3>
                <form>
                    {/* <SelectWrapper items={["1", "2"]}>
                        {(item) => <p>{item}</p>}

                    </SelectWrapper> */}


                </form>
            </div>
        </div>
    )
} 