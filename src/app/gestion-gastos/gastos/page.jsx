"use client";
import React, { useMemo } from 'react';
import { ExpensesManagmentTable } from '../../../../components/expensesManagment/expensesManagmentTable';
import { ExpensesFlow } from '../../../../components/expensesManagment/expenses/expensesFlow';
import { ExpensesByProject } from '../../../../components/expensesManagment/expenses/expensesByProject';

export default function Gastos() {
    const totalBudget = 1000;
    const projectBudgets = { Alpha: 300, Beta: 200, Gamma: 500 };
    const columns = [
        { key: 'date', label: 'Fecha' },
        { key: 'project', label: 'Proyecto' },
        { key: 'description', label: 'Descripción' },
        { key: 'category', label: 'Categoría' },
        { key: 'amount', label: 'Monto' },
    ];
    const rows = [
        { date: '2023-01-01', project: 'Alpha', description: 'Electricity Bill', category: 'Category 1', amount: '$100' },
        { date: '2023-02-01', project: 'Beta', description: 'Water Bill', category: 'Category 1', amount: '$50' },
        { date: '2023-03-01', project: 'Gamma', description: 'Internet Bill', category: 'Category 1', amount: '$75' },
    ];

    const categories = [
        { id: 1, name: 'Category 1' },
        { id: 2, name: 'Category 2' },
        { id: 3, name: 'Category 3' },
    ];
    
    return (
        <div className="flex-1 min-h-screen sm:p-4 ">
            <div className="">
                <div className="bg-gray-800 bg-opacity-10 rounded-lg shadow-lg p-6 min-h-full overflow-auto">
                    <ExpensesFlow rows={rows} totalBudget={totalBudget} />
                    <ExpensesManagmentTable
                        rows={rows}
                        columnHeaders={columns}
                        categories={categories}
                        detailsLink={"/gestion-gastos/gastos/detalles"}
                    />
                    <ExpensesByProject rows={rows} projectBudgets={projectBudgets} />
                </div>
            </div>
        </div>
    );
}