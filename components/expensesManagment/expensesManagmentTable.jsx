"use client";
import React, { useEffect } from 'react';
import { Pagination } from '@nextui-org/pagination';
import { Table, TableBody, TableCell, TableColumn, TableHeader, TableRow } from '@nextui-org/table';
import { Button } from '@nextui-org/button';
import { Input } from '@nextui-org/input';
import { CategoryDropDown } from './expensesManagmentCategoryDropdown';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFilePdf, faSearch } from '@fortawesome/free-solid-svg-icons';
import Link from 'next/link';
import { searchFilter } from '../../functions/utils/searchingUtils';
import { handleSearch } from '../../functions/handles/searchHandles';
import { getCurrentPageItems } from '../../functions/utils/nextUIPagUtils';
import { formatDate } from '../../functions/utils/formatDate';

export const ExpensesManagmentTable = ({ columnHeaders, rows, categories, detailsLink }) => {
    const [search, setSearch] = React.useState('');
    const [page, setPage] = React.useState(1);
    const itemsPerPage = 8;

    useEffect(() => {
        setPage(1);
    }, [search]);

    const results = searchFilter(rows, search);
    const totalItems = results.length;
    const totalPages = Math.ceil(totalItems / itemsPerPage);
    const currentPageItems = getCurrentPageItems(page, itemsPerPage, results)

    return (
        <Table
            topContent={
                <div className="flex flex-col sm:flex-row justify-between items-center mb-4 gap-2 sm:gap-4">
                    <div className="flex items-center gap-2 sm:gap-4 w-full sm:w-auto">
                        <Input
                            startContent={<FontAwesomeIcon icon={faSearch} />}
                            placeholder="Buscar"
                            className="w-full"
                            onChange={(e) => handleSearch(e, setSearch)}
                        />
                        <div className='w-full'>
                            <CategoryDropDown categories={categories} title={"Filtrar por categoria"} classNames={{
                                base: "",
                                button: "bg-blue-500 text-white hover:bg-blue-600 w-full sm:w-auto",
                            }} />
                        </div>
                    </div>
                    <div className="flex items-center gap-2 sm:gap-4">
                        <Button className="bg-red-600 text-white hover:bg-red-700 w-full sm:w-auto">
                            <FontAwesomeIcon icon={faFilePdf} className="mr-2" />
                            Exportar PDF
                        </Button>
                        <Link href={"/gestion-gastos/gastos/gestionar"} className="bg-green-700 hover:bg-green-800 text-white font-bold w-full sm:w-auto py-2 px-4 rounded-lg">
                            Agregar Gasto
                        </Link>
                    </div>
                </div>
            }
            bottomContent={
                <div className="flex w-full justify-center">
                    <Pagination
                        variant="flat"
                        isCompact
                        page={page}
                        total={totalPages}
                        onChange={(page) => setPage(page)}
                    />
                </div>
            }
            aria-label="Table"
            className="sm:w-full w-[370px] mx-auto"
        >
            <TableHeader columns={[...columnHeaders, { key: 'actions', label: 'Acciones' }]}>
                {(column) => (
                    <TableColumn
                        key={column.key}
                        className={`whitespace-nowrap text-xs sm:text-base ${column.key === 'actions' ? 'text-center' : ''}`}
                    >
                        {column.label}
                    </TableColumn>
                )}
            </TableHeader>
            <TableBody items={currentPageItems}>
                {(item) => (
                    <TableRow key={item.id} className="text-xs sm:text-base">
                        {columnHeaders.map((column) => (
                            <TableCell key={column.key} className="whitespace-nowrap py-2 px-1 sm:px-4">
                                {column.key === 'entry_date' ? formatDate(item[column.key]) : item[column.key]}
                            </TableCell>
                        ))}
                        <TableCell
                            key="actions"
                            className="whitespace-nowrap text-right py-2 px-1 sm:px-4"
                        >
                            <div className="flex justify-center gap-1 sm:gap-2">
                                <Link
                                    href={`${detailsLink}/${item.id}`}
                                    className="text-white font-bold px-3 py-2 text-xs sm:text-base"
                                >
                                    Detalles
                                </Link>
                                <Button
                                    className="bg-blue-600 hover:bg-blue-700 text-white font-bold px-2 mx-1 text-xs sm:text-base"
                                >
                                    Editar
                                </Button>
                                <Button
                                    className="bg-red-600 hover:bg-red-700 text-white font-bold px-2 mx-1 text-xs sm:text-base"
                                >
                                    Eliminar
                                </Button>
                            </div>
                        </TableCell>
                    </TableRow>
                )}
            </TableBody>
        </Table>
    );
};