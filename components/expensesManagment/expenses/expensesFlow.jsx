import React, { useMemo } from 'react';

export function ExpensesFlow({ expensesFlow }) {

    return (
        <div className="sm:w-full w-[370px] mx-auto bg-gray-800 bg-opacity-20 p-6 rounded-lg shadow-lg mt-6 mb-6">
        <div className="flex flex-col items-center text-center bg-gradient-to-r from-gray-700 to-gray-800 p-6 rounded-lg shadow-lg mb-6">
            <h2 className="text-4xl font-bold text-slate-200">Flujo de Gastos</h2>
        </div>
        
        {/* Contenedor de Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            
            {/* Monto Total de Gastos */}
            <div className="flex flex-col items-center text-center bg-gray-700 bg-opacity-80 p-6 rounded-lg shadow-lg">
                <p className="text-xl text-white mb-2">Monto Total de Gastos:</p>
                <p className="text-2xl font-semibold text-red-600">₡{expensesFlow.accumulatedspending}</p>
            </div>
    
            {/* Presupuesto Total */}
            <div className="flex flex-col items-center text-center bg-gray-700 bg-opacity-80 p-6 rounded-lg shadow-lg">
                <p className="text-xl text-white mb-2">Presupuesto Total:</p>
                <p className="text-2xl font-semibold text-green-600">₡{expensesFlow.allocatedfunds}</p>
            </div>
    
            {/* Presupuesto Utilizado en Proyectos */}
            <div className="flex flex-col items-center text-center bg-gray-700 bg-opacity-80 p-6 rounded-lg shadow-lg">
                <p className="text-xl text-white mb-2">Usado en Proyectos: </p>
                <p className="text-2xl font-semibold text-blue-600">₡{expensesFlow.accummulatedprojectbudgets}</p>
            </div>
    
            {/* Presupuesto Restante */}
            <div className="flex flex-col items-center text-center bg-gray-700 bg-opacity-80 p-6 rounded-lg shadow-lg">
                <p className="text-xl text-white mb-2">Presupuesto Restante:</p>
                <p className="text-2xl font-semibold text-yellow-600">₡{expensesFlow.unusedfunds}</p>
            </div>
            
        </div>
    </div>
    );
}