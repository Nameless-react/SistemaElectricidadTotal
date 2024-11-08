import React, { useMemo } from 'react';

export function ExpensesFlow({ rows, totalBudget }) {
    const totalAmount = useMemo(() => {
        return rows.reduce((sum, row) => {
            const amount = parseFloat(row.amount.replace('$', ''));
            return sum + (isNaN(amount) ? 0 : amount);
        }, 0);
    }, [rows]);

    return (
        <div className=" sm:w-full w-[370px] mx-auto flex flex-col sm:flex-row bg-gray-800 bg-opacity-20 p-6 rounded-lg shadow-lg mt-6 mb-6 gap-6">
            <div className="flex flex-col items-center text-center bg-gradient-to-r from-gray-700 to-gray-800 p-6 rounded-lg shadow-lg flex-1">
                <h2 className="text-4xl font-bold text-slate-200 mb-4">Flujo de Gastos</h2>
            </div>
            <div className="flex flex-col items-center text-center bg-gray-700 bg-opacity-80 p-6 rounded-lg shadow-lg flex-1">
                <p className="text-xl text-white mb-2">Monto Total de Gastos:</p>
                <p className="text-2xl font-semibold text-red-600">${totalAmount.toFixed(2)}</p>
            </div>
            <div className="flex flex-col items-center text-center bg-gray-700 bg-opacity-80 p-6 rounded-lg shadow-lg flex-1">
                <p className="text-xl text-white mb-2">Presupuesto Total:</p>
                <p className="text-2xl font-semibold text-green-600">${totalBudget.toFixed(2)}</p>
            </div>
            <div className="flex flex-col items-center text-center bg-gray-700 bg-opacity-80 p-6 rounded-lg shadow-lg flex-1">
                <p className="text-xl text-white mb-2">Presupuesto Restante:</p>
                <p className="text-2xl font-semibold text-yellow-600">${(totalBudget - totalAmount).toFixed(2)}</p>
            </div>
        </div>
    );
}