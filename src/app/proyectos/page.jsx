'use client'
import styles from "/css/projects.module.css";
import Project from "/components/project/project";

export default function Projects() {
    return (
        <div className={styles.projectsContainer}>
            <Project
                status={"En progreso"}
                name={"Instalación eléctrica"}
                description="Lorem ipsum dolor sit amet consectetur adipisicing elit. Veniam tempora, enim sed beatae ullam maxime doloribus deserunt dolorum voluptas obcaecati ducimus ipsam cumque et veritatis magni! Blanditiis, ullam? Tenetur, nam?"
                progressValue={20}
            />
            <Project
                status={"En progreso"}
                name={"Instalación eléctrica"}
                description="Lorem ipsum dolor sit amet consectetur adipisicing elit. Veniam tempora, enim sed beatae ullam maxime doloribus deserunt dolorum voluptas obcaecati ducimus ipsam cumque et veritatis magni! Blanditiis, ullam? Tenetur, nam?"
                progressValue={20}
            />

            <Project
                status={"Completado"}
                name={"Desarrollo de software"}
                description="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio. Praesent libero. Sed cursus ante dapibus diam. Sed nisi. Nulla quis sem at nibh elementum imperdiet."
                progressValue={100}
            />

            <Project
                status={"En espera"}
                name={"Auditoría de sistemas"}
                description="Fusce nec tellus sed augue semper porta. Mauris massa. Vestibulum lacinia arcu eget nulla. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos."
                progressValue={0}
            />

            <Project
                status={"En progreso"}
                name={"Rediseño de la página web"}
                description="Curabitur sodales ligula in libero. Sed dignissim lacinia nunc. Curabitur tortor. Pellentesque nibh. Aenean quam. In scelerisque sem at dolor."
                progressValue={50}
            />

            <Project
                status={"Pendiente"}
                name={"Implementación de seguridad"}
                description="Maecenas mauris lacus, lacinia vel erat nec, varius luctus nisl. Ut id turpis eros. Vivamus at dui nunc. In hac habitasse platea dictumst."
                progressValue={10}
            />        
        </div>
    )
}

