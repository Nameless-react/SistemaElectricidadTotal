"use client";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Button } from '@nextui-org/button';
import { useState } from 'react';
import { faCoins, faDashboard, faDollarSign, faGear, faTag, faTimes, faWallet } from '@fortawesome/free-solid-svg-icons';
import React from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, BarElement, CategoryScale, LinearScale, Title, Tooltip, Legend } from 'chart.js';
// Register the necessary Chart.js components and elements
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const BarChart = () => {
    const data = {
        labels: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'],
        datasets: [
            {
                label: 'Gastos',
                data: [500, 700, 800, 600, 550, 700],
                backgroundColor: 'rgba(220, 38, 38, 0.7)',
            },
            {
                label: 'Ingresos',
                data: [1000, 900, 1200, 1100, 950, 1300],
                backgroundColor: 'rgba(22, 163, 74, 0.7)',
            },
        ],
    };

    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: 'bottom',
                labels: {
                    font: {
                        size: 18,
                    },
                },
            },
        },
        scales: {
            y: {
                beginAtZero: true,
                ticks: {
                    font: {
                        size: 18,
                    },
                },
            },
            x: {
                ticks: {
                    font: {
                        size: 18,
                    },
                },
            },
        },
    };

    return (
        <div className="w-full mt-8">
            <h2 className="text-2xl font-bold text-slate-200 text-center mb-4">Gastos vs Ingresos Mensuales</h2>
            <Bar data={data} options={options} />
        </div>
    );
};


export default function GestionGastos() {
    const statsCards = [
        { label: 'Ingresos Totales', amount: '$1.000.000' },
        { label: 'Gastos Totales', amount: '$1.000.000' },
        { label: 'Ingresos este Mes', amount: '$1.000.000' },
        { label: 'Gastos este Mes', amount: '$1.000.000' },
    ];
    return (
        <>
            {/* Main Content */}
            <div className="flex-1 p-4">
                <div className="w-[100%] mx-auto">
                    {/* Dashboard Content */}
                    <div className="bg-gray-800 bg-opacity-10  sm:w-full w-full mx-auto rounded-lg shadow-lg p-6">
                        <h1 className="text-2xl md:text-4xl font-bold text-slate-200 text-center mb-6">
                            Dashboard
                        </h1>
                        {/* Stats Grid */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                            {statsCards.map(({ label, amount }, index) => (
                                <div key={index}
                                    className={`bg-gray-800 ${label === 'Ingresos Totales' || label === 'Ingresos este Mes' ? 'bg-green-600' : 'bg-red-600'} bg-opacity-50 p-4 rounded-lg`}>
                                    <div className="flex justify-between items-center">
                                        <h3 className="text-sm md:text-base lg:text-xl text-slate-200">
                                            {label}
                                        </h3>
                                        <FontAwesomeIcon icon={faCoins} className="text-slate-200" />
                                    </div>
                                    <div className="mt-2">
                                        <h1 className="text-xl md:text-2xl lg:text-3xl font-bold text-slate-200">
                                            {amount}
                                        </h1>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <hr className="border-t border-gray-700 border-opacity-50 my-6" />
                        {/* Chart */}
                        <div className='w-[79%] mx-auto'>
                            <BarChart />
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}