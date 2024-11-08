"use client";
import React from 'react';
import { Table, TableBody, TableCell, TableColumn, TableHeader, TableRow} from '@nextui-org/table';
import { Button } from '@nextui-org/button';
import { Input } from '@nextui-org/input';
import { CategoryDropDown } from './expensesManagmentCategoryDropdown';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFilePdf, faSearch } from '@fortawesome/free-solid-svg-icons';
import Link from 'next/link';
export const ExpensesManagmentTable = ({ columnHeaders, rows, categories, detailsLink }) => {
    return (
        <Table
            topContent={
                <div className="flex flex-col sm:flex-row justify-between items-center mb-4 gap-2 sm:gap-4">
                    <div className="flex items-center gap-2 sm:gap-4 w-full sm:w-auto">
                        <Input
                            startContent={<FontAwesomeIcon icon={faSearch} />}
                            placeholder="Buscar"
                            className="w-full"
                        />
                        <div className='w-full'>
                            <CategoryDropDown categories={categories} />
                        </div>
                    </div>
                    <div className="flex items-center gap-2 sm:gap-4">
                        <Button className="bg-red-600 text-white hover:bg-red-700 w-full sm:w-auto">
                            <FontAwesomeIcon icon={faFilePdf} className="mr-2" />
                            Exportar PDF
                        </Button>
                        <Button className="bg-green-700 hover:bg-green-800 text-white font-bold w-full sm:w-auto py-2 px-4 rounded-lg">
                            Agregar Gasto
                        </Button>
                    </div>
                </div>
            }
            aria-label="Table"
            className="sm:w-full w-[370px] mx-auto"
        >
            <TableHeader columns={[...columnHeaders, { key: 'actions', label: 'Acciones' }]}>
                {(column) => (
                    <TableColumn
                        key={column.key}
                        className="whitespace-nowrap text-xs sm:text-base"

                    >
                        {column.label}
                    </TableColumn>
                )}
            </TableHeader>
            <TableBody items={rows}>
                {(item) => (
                    <TableRow key={item.date} className="text-xs sm:text-base">
                        {columnHeaders.map((column) => (
                            <TableCell key={column.key} className="whitespace-nowrap py-2 px-1 sm:px-4">
                                {item[column.key]}
                            </TableCell>
                        ))}
                        <TableCell key="actions" className="flex gap-1 sm:gap-2 whitespace-nowrap">
                            <Link href={detailsLink } className="text-white font-bold px-3 py-2 text-xs sm:text-base">
                                Detalles
                            </Link>
                            <Button className="bg-blue-600 hover:bg-blue-700 text-white font-bold px-2 mx-1 text-xs sm:text-base">
                                Editar
                            </Button>
                            <Button className="bg-red-600 hover:bg-red-700 text-white font-bold px-2 mx-1 text-xs sm:text-base">
                                Eliminar
                            </Button>
                        </TableCell>
                    </TableRow>
                )}
            </TableBody>
        </Table>
    )
}