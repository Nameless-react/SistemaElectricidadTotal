"use client";
import { ScrollShadow } from "@nextui-org/scroll-shadow";
import style from "/css/projectDashboard.module.css"
import ProjectFile from "./ProjectFile";

export default function ProjectFileContainer({ files }) {
    return (
        <div className={style.projectFileContainer}>
            <h3>Archivos</h3>
            <div className={style.projectFileHeader}>
                        <h4>Nombre</h4>
                        <p>Modificación</p>
                        <p></p>
                    </div>
            <ScrollShadow className="w-full flex gap-5 flex-col">
                {!files || files.length === 0 ? <p className="font-bold text-center">No hay archivos guardados</p> : files.map((file, index) => <ProjectFile key={index} {...file} />)}
            </ScrollShadow>
        </div>
    )
}