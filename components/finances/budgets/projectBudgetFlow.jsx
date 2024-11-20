export function ProjectBudgetFlow({ projectBudgets }) {
    return (
        <div className="sm:w-full w-[370px] mx-auto bg-gray-800 bg-opacity-20 rounded-lg shadow-lg mt-6 p-6 max-h-[400px] overflow-y-auto">
            <h2 className="text-2xl font-bold text-slate-200 mb-4">Presupuestos de Proyectos</h2>
            {projectBudgets.map((project) => (
                <div key={project.id} className="bg-gray-700 bg-opacity-80 p-4 rounded-lg shadow-inner mb-4">
                    <h3 className="text-lg font-semibold text-slate-100">{project.projectname}</h3>
                    <p>Presupuesto Asignado: <span className="text-green-500">₡{project.total_budget}</span></p>
                    <p>Presupuesto Utilizado: <span className="text-blue-500">₡{project.used_budget || 0}</span></p>
                    <p>Presupuesto Disponible: <span className="text-yellow-500">₡{project.remaining_budget}</span></p>
                    <p>Estado: <span className="text-slate-300">{project.status || "En curso"}</span></p>
                </div>
            ))}
        </div>
    );
}
