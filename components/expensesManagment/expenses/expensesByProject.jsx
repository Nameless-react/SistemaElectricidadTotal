import React, { useMemo } from 'react';

export function ExpensesByProject({ rows, projectBudgets }) {
    const projectExpenses = useMemo(() => {
        return rows.reduce((acc, row) => {
            const amount = parseFloat(row.amount.replace('$', ''));
            if (!acc[row.project]) acc[row.project] = 0;
            acc[row.project] += isNaN(amount) ? 0 : amount;
            return acc;
        }, {});
    }, [rows]);

    return (
        <div className="sm:w-full w-[370px] mx-auto bg-gray-800 bg-opacity-20 rounded-lg shadow-lg mt-6 p-6 max-h-[400px] overflow-y-auto">
            <h2 className="text-2xl font-bold text-slate-200 mb-4">Gasto por Proyecto</h2>
            {Object.keys(projectBudgets).map((project) => (
                <div key={project} className="bg-gray-700 bg-opacity-80 p-4 rounded-lg shadow-inner mb-4">
                    <h3 className="text-lg font-semibold text-slate-100">{project}</h3>
                    <p>Presupuesto Asignado: <span className="text-green-500">${projectBudgets[project].toFixed(2)}</span></p>
                    <p>Gastos Totales: <span className="text-red-500">${projectExpenses[project]?.toFixed(2) || 0}</span></p>
                    <p>Presupuesto Restante: <span className="text-yellow-500">${(projectBudgets[project] - (projectExpenses[project] || 0)).toFixed(2)}</span></p>
                </div>
            ))}
        </div>
    );
}