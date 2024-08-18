"use client"
import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFileCsv, faFileExcel, faFilePdf } from '@fortawesome/free-solid-svg-icons';
import { Button } from '@nextui-org/button';
import { Input, Da } from '@nextui-org/input';
import DonutChart from "../../../components/charts/donutChart";
import BarChart from  "../../../components/charts/barChart";
import LineChart from '../../../components/charts/lineChart';



// Datos de ejemplo para los reportes
const sampleData = [
    { id: 1, name: 'Reporte 1', value: 100 },
    { id: 2, name: 'Reporte 2', value: 200 },
    // Agrega más datos según sea necesario
];

// Función para convertir datos a CSV
const convertToCSV = (data) => {
    const header = Object.keys(data[0]).join(',');
    const rows = data.map(row => Object.values(row).join(',')).join('\n');
    return `${header}\n${rows}`;
};

// Función para generar un archivo de Excel (XLSX) como un enlace de descarga
const generateExcelFile = (data) => {
    const header = Object.keys(data[0]).join('\t');
    const rows = data.map(row => Object.values(row).join('\t')).join('\n');
    return `data:text/tab-separated-values;charset=utf-8,${encodeURIComponent(header + '\n' + rows)}`;
};

// Función para generar un archivo PDF como un enlace de descarga
const generatePDFFile = () => {
    const pdfContent = `
        Reportes
        ID\tNombre\tValor
        1\tReporte 1\t100
        2\tReporte 2\t200
    `;
    return `data:text/plain;charset=utf-8,${encodeURIComponent(pdfContent)}`;
};

export default function Reportes() {

    //Inventory data
    const labelsInventory = ['En uso', 'Disponible', 'En mantenimiento'];
    const dataInventory = [300, 150, 50];
    const backgroundColorsInventory = [
        'rgba(255, 99, 132, 0.8)',
        'rgba(54, 162, 235, 0.8)',
        'rgba(255, 206, 86, 0.8)',
    ];
    const borderColorsInventory = [
        'rgba(255, 99, 132, 1)',
        'rgba(54, 162, 235, 1)',
        'rgba(255, 206, 86, 1)',
    ];
    const titleInventory = 'Estado de los inventarios';



    const labelsProyects = ['En espera', 'En progreso', 'Completado'];
    const dataProyects = [4, 8, 6];
    const backgroundColorsProyects = [
        'rgba(255, 0, 0, 0.8)',
        'rgba(245, 165, 36, 0.8)',
        'rgba(23, 201, 100, 0.8)',
    ];
    const borderColorsProyects = [
        'rgba(255, 0, 0,1)',
        'rgba(245, 165, 36, 1)',
        'rgba(23, 201, 100, 1)',
    ];
    const titleProyects = 'Estado de los proyectos';


    const labelsClients = ['Nuevo', 'Activo', 'Inactivo'];
    const dataClients = [10, 50, 15];
    const backgroundColorsClients = [
        'rgba(75, 192, 192, 0.8)',
        'rgba(153, 102, 255, 0.8)',
        'rgba(255, 159, 64, 0.8)',
    ];
    const borderColorsClients = [
        'rgba(75, 192, 192, 1)',
        'rgba(153, 102, 255, 1)',
        'rgba(255, 159, 64, 1)',
    ];
    const titleClients = 'Estado de los clientes';

    return (
        <div className='flex flex-col items-center  mt-[100px]'>
            <h1 className='text-5xl font-bold text-center'>Reportes y Análisis</h1>

            <div className='flex flex-col gap-4 mt-10'>
                <h2 className='self-start text-3xl'>Reportes generales</h2>
                <div className='flex  gap-4 justify-start items-center mt-4 '>
                    <div className='bg-slate-800 w-[500px] h-[150px] p-4 rounded-lg'>
                        <h2 className='text-3xl '>  Inventario</h2>
                        <div className='flex gap-4 mt-4 justify-end '>
                            <a
                                href={`data:text/csv;charset=utf-8,${encodeURIComponent(convertToCSV(sampleData))}`}
                                download="reportes.csv"
                                className='text-4xl'
                            >
                                <Button auto>
                                    <FontAwesomeIcon
                                        className='text-blue-400'
                                        icon={faFileCsv} />
                                </Button>
                            </a>
                            <a
                                href={generateExcelFile(sampleData)}
                                download="reportes.xlsx"
                                className='text-4xl'
                            >
                                <Button auto>
                                    <FontAwesomeIcon
                                        icon={faFileExcel}
                                        className='text-green-400'
                                    />
                                </Button>
                            </a>
                            <a
                                href={generatePDFFile()}
                                download="reportes.pdf"
                                className='text-4xl'
                            >
                                <Button auto>
                                    <FontAwesomeIcon
                                        className='text-red-400'
                                        icon={faFilePdf} />
                                </Button>
                            </a>
                        </div>
                    </div>
                    <div className='bg-slate-800 w-[500px] h-[150px] p-4 rounded-lg'>
                        <h2 className='text-3xl '>  Proyectos</h2>
                        <div className='flex gap-4 mt-4 justify-end '>
                            <a
                                href={`data:text/csv;charset=utf-8,${encodeURIComponent(convertToCSV(sampleData))}`}
                                download="reportes.csv"
                                className='text-4xl'
                            >
                                <Button auto>
                                    <FontAwesomeIcon
                                        className='text-blue-400'
                                        icon={faFileCsv} />
                                </Button>
                            </a>
                            <a
                                href={generateExcelFile(sampleData)}
                                download="reportes.xlsx"
                                className='text-4xl'
                            >
                                <Button auto>
                                    <FontAwesomeIcon
                                        icon={faFileExcel}
                                        className='text-green-400'
                                    />
                                </Button>
                            </a>
                            <a
                                href={generatePDFFile()}
                                download="reportes.pdf"
                                className='text-4xl'
                            >
                                <Button auto>
                                    <FontAwesomeIcon
                                        className='text-red-400'
                                        icon={faFilePdf} />
                                </Button>
                            </a>
                        </div>
                    </div>
                    <div className='bg-slate-800 w-[500px] h-[150px] p-4 rounded-lg'>
                        <h2 className='text-3xl '>  Clientes</h2>
                        <div className='flex gap-4 mt-4 justify-end '>
                            <a
                                href={`data:text/csv;charset=utf-8,${encodeURIComponent(convertToCSV(sampleData))}`}
                                download="reportes.csv"
                                className='text-4xl'
                            >
                                <Button auto>
                                    <FontAwesomeIcon
                                        className='text-blue-400'
                                        icon={faFileCsv} />
                                </Button>
                            </a>
                            <a
                                href={generateExcelFile(sampleData)}
                                download="reportes.xlsx"
                                className='text-4xl'
                            >
                                <Button auto>
                                    <FontAwesomeIcon
                                        icon={faFileExcel}
                                        className='text-green-400'
                                    />
                                </Button>
                            </a>
                            <a
                                href={generatePDFFile()}
                                download="reportes.pdf"
                                className='text-4xl'
                            >
                                <Button auto>
                                    <FontAwesomeIcon
                                        className='text-red-400'
                                        icon={faFilePdf} />
                                </Button>
                            </a>
                        </div>
                    </div>
                </div>
            </div>
            <div className='flex flex-col gap-4 mt-10'>
                <h2 className='self-start text-3xl'>Reportes por fechas</h2>
                <div className='flex  gap-4 justify-start items-center '>
                    <div className='bg-slate-800 w-[500px] h-auto p-4 rounded-lg'>
                        <h2 className='text-3xl mb-4'>  Inventario </h2>
                        <div className='flex flex-col gap-4 mb-6'>

                            <div className="w-full flex  gap-4">

                                <Input type='date' />
                                <Input type='date' />

                            </div>

                            <Button auto color="primary" className='w-full self-start hover:bg-blue-700' onClick={() => console.log("Filtrar datos")}>
                                Filtrar Reportes
                            </Button>
                        </div>
                        <div className='flex gap-4 mt-4 justify-end'>
                            <a
                                href={`data:text/csv;charset=utf-8,${encodeURIComponent(convertToCSV(sampleData))}`}
                                download="reportes.csv"
                                className='text-4xl'
                            >
                                <Button auto>
                                    <FontAwesomeIcon
                                        className='text-blue-400'
                                        icon={faFileCsv} />
                                </Button>
                            </a>
                            <a
                                href={generateExcelFile(sampleData)}
                                download="reportes.xlsx"
                                className='text-4xl'
                            >
                                <Button auto>
                                    <FontAwesomeIcon
                                        icon={faFileExcel}
                                        className='text-green-400'
                                    />
                                </Button>
                            </a>
                            <a
                                href={generatePDFFile()}
                                download="reportes.pdf"
                                className='text-4xl'
                            >
                                <Button auto>
                                    <FontAwesomeIcon
                                        className='text-red-400'
                                        icon={faFilePdf} />
                                </Button>
                            </a>
                        </div>
                    </div>

                    <div className='bg-slate-800 w-[500px] h-auto p-4 rounded-lg'>
                        <h2 className='text-3xl mb-4'>  Proyectos</h2>
                        <div className='flex flex-col gap-4 mb-6'>

                            <div className="w-full flex  gap-4">

                                <Input type='date' />
                                <Input type='date' />

                            </div>

                            <Button auto color="primary" className='w-full self-start hover:bg-blue-700' onClick={() => console.log("Filtrar datos")}>
                                Filtrar Reportes
                            </Button>
                        </div>
                        <div className='flex gap-4 mt-4 justify-end'>
                            <a
                                href={`data:text/csv;charset=utf-8,${encodeURIComponent(convertToCSV(sampleData))}`}
                                download="reportes.csv"
                                className='text-4xl'
                            >
                                <Button auto>
                                    <FontAwesomeIcon
                                        className='text-blue-400'
                                        icon={faFileCsv} />
                                </Button>
                            </a>
                            <a
                                href={generateExcelFile(sampleData)}
                                download="reportes.xlsx"
                                className='text-4xl'
                            >
                                <Button auto>
                                    <FontAwesomeIcon
                                        icon={faFileExcel}
                                        className='text-green-400'
                                    />
                                </Button>
                            </a>
                            <a
                                href={generatePDFFile()}
                                download="reportes.pdf"
                                className='text-4xl'
                            >
                                <Button auto>
                                    <FontAwesomeIcon
                                        className='text-red-400'
                                        icon={faFilePdf} />
                                </Button>
                            </a>
                        </div>
                    </div>
                    <div className='bg-slate-800 w-[500px] h-auto p-4 rounded-lg'>
                        <h2 className='text-3xl mb-4'>  Clientes</h2>
                        <div className='flex flex-col gap-4 mb-6'>

                            <div className="w-full flex  gap-4">

                                <Input type='date' />
                                <Input type='date' />

                            </div>

                            <Button auto color="primary" className='w-full self-start hover:bg-blue-700' onClick={() => console.log("Filtrar datos")}>
                                Filtrar Reportes
                            </Button>
                        </div>
                        <div className='flex gap-4 mt-4 justify-end'>
                            <a
                                href={`data:text/csv;charset=utf-8,${encodeURIComponent(convertToCSV(sampleData))}`}
                                download="reportes.csv"
                                className='text-4xl'
                            >
                                <Button auto>
                                    <FontAwesomeIcon
                                        className='text-blue-400'
                                        icon={faFileCsv} />
                                </Button>
                            </a>
                            <a
                                href={generateExcelFile(sampleData)}
                                download="reportes.xlsx"
                                className='text-4xl'
                            >
                                <Button auto>
                                    <FontAwesomeIcon
                                        icon={faFileExcel}
                                        className='text-green-400'
                                    />
                                </Button>
                            </a>
                            <a
                                href={generatePDFFile()}
                                download="reportes.pdf"
                                className='text-4xl'
                            >
                                <Button auto>
                                    <FontAwesomeIcon
                                        className='text-red-400'
                                        icon={faFilePdf} />
                                </Button>
                            </a>
                        </div>
                    </div>
                </div>
            </div>
            <div className='flex flex-col gap-4 mt-10'>
                <h2 className='self-start text-3xl'>Reportes por búsqueda</h2>
                <div className='flex gap-4 justify-start items-center'>
                    {/*   Inventario */}
                    <div className='bg-slate-800 w-[500px] h-auto p-4 rounded-lg'>
                        <h2 className='text-3xl mb-4'>  Inventario</h2>
                        <div className='flex flex-col gap-4 mb-6'>
                            <div className="w-full flex gap-4">
                                <Input
                                    type='text'
                                    placeholder='Buscar en inventario'
                                    className='w-full'
                                />
                            </div>
                            <Button
                                auto
                                color="primary"
                                className='w-full self-start hover:bg-blue-700'
                                onClick={() => console.log("Filtrar datos de inventario")}
                            >
                                Filtrar Reportes
                            </Button>
                        </div>
                        <div className='flex gap-4 mt-4 justify-end'>
                            <a
                                href={`data:text/csv;charset=utf-8,${encodeURIComponent(convertToCSV(sampleData))}`}
                                download="reportes.csv"
                                className='text-4xl'
                            >
                                <Button auto>
                                    <FontAwesomeIcon
                                        className='text-blue-400'
                                        icon={faFileCsv} />
                                </Button>
                            </a>
                            <a
                                href={generateExcelFile(sampleData)}
                                download="reportes.xlsx"
                                className='text-4xl'
                            >
                                <Button auto>
                                    <FontAwesomeIcon
                                        icon={faFileExcel}
                                        className='text-green-400'
                                    />
                                </Button>
                            </a>
                            <a
                                href={generatePDFFile()}
                                download="reportes.pdf"
                                className='text-4xl'
                            >
                                <Button auto>
                                    <FontAwesomeIcon
                                        className='text-red-400'
                                        icon={faFilePdf} />
                                </Button>
                            </a>
                        </div>
                    </div>

                    {/*   Proyectos */}
                    <div className='bg-slate-800 w-[500px] h-auto p-4 rounded-lg'>
                        <h2 className='text-3xl mb-4'>  Proyectos</h2>
                        <div className='flex flex-col gap-4 mb-6'>
                            <div className="w-full flex gap-4">
                                <Input
                                    type='text'
                                    placeholder='Buscar en proyectos'
                                    className='w-full'
                                />
                            </div>
                            <Button
                                auto
                                color="primary"
                                className='w-full self-start hover:bg-blue-700'
                                onClick={() => console.log("Filtrar datos de proyectos")}
                            >
                                Filtrar Reportes
                            </Button>
                        </div>
                        <div className='flex gap-4 mt-4 justify-end'>
                            <a
                                href={`data:text/csv;charset=utf-8,${encodeURIComponent(convertToCSV(sampleData))}`}
                                download="reportes.csv"
                                className='text-4xl'
                            >
                                <Button auto>
                                    <FontAwesomeIcon
                                        className='text-blue-400'
                                        icon={faFileCsv} />
                                </Button>
                            </a>
                            <a
                                href={generateExcelFile(sampleData)}
                                download="reportes.xlsx"
                                className='text-4xl'
                            >
                                <Button auto>
                                    <FontAwesomeIcon
                                        icon={faFileExcel}
                                        className='text-green-400'
                                    />
                                </Button>
                            </a>
                            <a
                                href={generatePDFFile()}
                                download="reportes.pdf"
                                className='text-4xl'
                            >
                                <Button auto>
                                    <FontAwesomeIcon
                                        className='text-red-400'
                                        icon={faFilePdf} />
                                </Button>
                            </a>
                        </div>
                    </div>

                    {/*   Clientes */}
                    <div className='bg-slate-800 w-[500px] h-auto p-4 rounded-lg'>
                        <h2 className='text-3xl mb-4'> Clientes</h2>
                        <div className='flex flex-col gap-4 mb-6'>
                            <div className="w-full flex gap-4">
                                <Input
                                    type='text'
                                    placeholder='Buscar en clientes'
                                    className='w-full'
                                />
                            </div>
                            <Button
                                auto
                                color="primary"
                                className='w-full self-start hover:bg-blue-700'
                                onClick={() => console.log("Filtrar datos de clientes")}
                            >
                                Filtrar Reportes
                            </Button>
                        </div>
                        <div className='flex gap-4 mt-4 justify-end'>
                            <a
                                href={`data:text/csv;charset=utf-8,${encodeURIComponent(convertToCSV(sampleData))}`}
                                download="reportes.csv"
                                className='text-4xl'
                            >
                                <Button auto>
                                    <FontAwesomeIcon
                                        className='text-blue-400'
                                        icon={faFileCsv} />
                                </Button>
                            </a>
                            <a
                                href={generateExcelFile(sampleData)}
                                download="reportes.xlsx"
                                className='text-4xl'
                            >
                                <Button auto>
                                    <FontAwesomeIcon
                                        icon={faFileExcel}
                                        className='text-green-400'
                                    />
                                </Button>
                            </a>
                            <a
                                href={generatePDFFile()}
                                download="reportes.pdf"
                                className='text-4xl'
                            >
                                <Button auto>
                                    <FontAwesomeIcon
                                        className='text-red-400'
                                        icon={faFilePdf} />
                                </Button>
                            </a>
                        </div>
                    </div>
                </div>
            </div>
            
            <div className='mt-10'>
                <div className='flex flex-col gap-4 items-center mt-20'>
                    <h2 className='text-3xl mb-4'>Estadisticas de estado</h2>
                    <div className=' flex gap-6  h-auto p-4'>
                        <div>
                            <h2 className='text-3xl mb-4 text-center'>Inventario</h2>
                            <DonutChart
                                labels={labelsInventory}
                                backgroundColors={backgroundColorsInventory}
                                data={dataInventory}
                                title={titleInventory}
                                borderColors={borderColorsInventory}
                            />
                        </div>
                        <div>
                            <h2 className='text-3xl mb-4 text-center'>Proyectos</h2>
                            {<DonutChart labels={labelsProyects}
                                data={dataProyects}
                                backgroundColors={backgroundColorsProyects} b
                                orderColors={borderColorsProyects}
                                title={titleProyects} />}
                        </div>
                        <div>
                            <h2 className='text-3xl mb-4 text-center'>Clientes</h2>
                            {<DonutChart
                                labels={labelsClients}
                                data={dataClients}
                                backgroundColors={backgroundColorsClients}
                                title={titleClients}
                                borderColors={borderColorsClients}
                            />}
                        </div>
                    </div>
                    <div className='mt-20 flex flex-col  items-center '>
                        <h2 className='text-3xl mb-4 text-center'>Citas por mes</h2>
                        <BarChart/>           
                    </div>
                    <div className='mt-20 flex flex-col  items-center'>
                        <h2 className='text-3xl mb-4 text-center'>Citas por mes</h2>
                        <LineChart/>           
                    </div>
                </div>
            </div>
        </div>
    );
}