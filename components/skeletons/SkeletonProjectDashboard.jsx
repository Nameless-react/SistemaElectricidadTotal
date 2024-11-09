import style from "/css/projectDashboard.module.css";

export default function SkeletonProjectDashboard() {


    return (
        <div className={style.containerSkeleton}>
            <div className={style.headerSkeleton}></div>
            <div className={style.container}>
                <div className={style.overviewProject}>
                    <div>
                        <div>
                         
                        </div>
                        <div>
                         
                        </div>
                    </div>
                    <div>
                        <div>
                            
                        </div>
                        <div>
                           
                        </div>
                    </div>
                    <div>
                        <div>
                           
                        </div>
                        <div>
                            
                        </div>
                    </div>
                </div>
                <div className={style.overviewGraphs}></div>
                <div className={style.tasksContainer}>
                    <div className={style.taskHeader}></div>
                    <div className={style.tasks}></div>
                </div>
                <div className={style.projectFiles}></div>

                <div className={style.employeesContainer}>
                    <div className={style.employeeHeader}></div>
                    <div className={style.employees}></div>
                </div>
            </div>
        </div>
    )
}