'use client';

import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell } from "@nextui-org/table";
import { Pagination } from "@nextui-org/pagination";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faEdit, faTrash, faSearch, faSortUp, faSortDown } from "@fortawesome/free-solid-svg-icons";
import { Input } from "@nextui-org/input";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { SuccessModal } from "../../modals/formSuccessModal/successModal";
import Image from "next/image";
import { useDisclosure } from "@nextui-org/modal";
import { SubmitModal } from "../../modals/formSuccessModal/SubmitModal";

export default function ToolsTable({ tools }) {
    const searchParams = useSearchParams();
    const { isOpen, onOpen, onOpenChange } = useDisclosure();
    const router = useRouter();
    const updateSuccess = searchParams.get("updateSuccess");
    const createSuccess = searchParams.get("createSuccess");
    const [search, setSearch] = useState("");
    const [sortConfig, setSortConfig] = useState({ key: 'name', direction: 'ascending' });
    const [page, setPage] = useState(1);
    const itemsPerPage = 8;

    useEffect(() => {
        const newSearchParams = new URLSearchParams(window.location.search);
        if (updateSuccess) newSearchParams.delete("updateSuccess");
        if (createSuccess) newSearchParams.delete("createSuccess");

        if (newSearchParams.toString() !== "") {
            router.replace(`${window.location.pathname}?${newSearchParams.toString()}`);
        } else {
            router.replace(window.location.pathname);
        }
    }, [updateSuccess, createSuccess, router]);

    useEffect(() => {
        setPage(1);
    }, [search]);

    const handleSearch = (event) => {
        setSearch(event.target.value);
    };

    // Implementación de la búsqueda
    const results = !search ? tools : tools.filter((tool) =>
        (tool.name && tool.name.toLowerCase().includes(search.toLowerCase())) ||
        (tool.serial_number && tool.serial_number.toLowerCase().includes(search.toLowerCase())) ||
        (tool.model && tool.model.toLowerCase().includes(search.toLowerCase())) ||
        (tool.category && tool.category.toLowerCase().includes(search.toLowerCase())) ||
        (tool.status && tool.status.toLowerCase().includes(search.toLowerCase())) ||
        (tool.provider && tool.provider.toLowerCase().includes(search.toLowerCase()))
    );

    const sortResults = (data, sortConfig) => {
        return data.sort((a, b) => {
            if (a[sortConfig.key] < b[sortConfig.key]) {
                return sortConfig.direction === 'ascending' ? -1 : 1;
            }
            if (a[sortConfig.key] > b[sortConfig.key]) {
                return sortConfig.direction === 'ascending' ? 1 : -1;
            }
            return 0;
        });
    };

    const getSortIcon = (key) => {
        if (sortConfig.key === key) {
            return sortConfig.direction === 'ascending' ? faSortUp : faSortDown;
        }
        return faSortDown; 
    };

    const requestSort = (key) => {
        let direction = 'ascending';
        if (sortConfig.key === key && sortConfig.direction === 'ascending') {
            direction = 'descending';
        }
        setSortConfig({ key, direction });
    };

    const sortedResults = sortResults(results, sortConfig);
    const totalItems = sortedResults.length;
    const totalPages = Math.ceil(totalItems / itemsPerPage);

    const getCurrentPageItems = () => {
        const startIndex = (page - 1) * itemsPerPage;
        const endIndex = startIndex + itemsPerPage;
        return sortedResults.slice(startIndex, endIndex);
    };

    const handleDelete = async (id) => {
        try {
            const response = await fetch(`/api/inventory/tools/tool/delete?id=${id}`, {
                method: 'DELETE',
            });

            if (!response.ok) {
                throw new Error('Error al eliminar el equipo');
            }
            const data = await response.json();
            router.refresh();

        } catch (error) {
            console.log(error);
            alert("Error al eliminar el equipo");
        }

        alert(`El equipo con id ${id} ha sido eliminado`);
    };

    const currentPageItems = getCurrentPageItems();

    const columns = [
        { title: "Nombre", key: "name" },
        { title: "Serial", key: "serial_number" },
        { title: "Modelo", key: "model" },
        { title: "Categoría", key: "category" },
        { title: "Proveedor", key: "provider" },
        { title: "Imagen", key: "image" },
        { title: "Estado", key: "status" },
        { title: "Acciones", key: "actions" },
    ];

    return (
        <div className='flex-grow mx-auto max-w-7xl pt-16 px-6'>
            <h1 className="text-3xl text-center mb-8 font-semibold mt-10 text-white">Gestión de equipos</h1>
            <div className="flex mb-2 justify-end items-center">
                <Input
                    placeholder="Buscar"
                    className="flex flex-col text-xl justify-center rounded-xl dark mr-2"
                    onChange={handleSearch}
                    startContent={
                        <div>
                            <FontAwesomeIcon size="sm" icon={faSearch} />
                        </div>
                    }
                />
                <Link className="bg-green-700 hover:bg-green-800 transition duration-300 ease-in-out text-white font-bold py-2 px-8 rounded-xl " href={"/gestion-inventario/equipos/gestionar"}>
                    <FontAwesomeIcon icon={faPlus} />
                </Link>
            </div>
            <SuccessModal
                title={updateSuccess ? "Equipo actualizado" : "Equipo creado"}
                message={
                    updateSuccess ? "Equipo actualizado exitosamente" : "Equipo creado exitosamente"
                }
                router={router}
                updateSearchParam={updateSuccess}
                createSearchParam={createSuccess}
            />

            <Table className="dark" aria-label="Tabla de equipos"
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
            >
                <TableHeader>
                    {columns.map((column) => (
                        <TableColumn key={column.key}>
                            <div className="flex items-center">
                                {column.title}
                                {column.key !== 'actions' && (
                                    <FontAwesomeIcon
                                        className="ml-2 cursor-pointer"
                                        icon={getSortIcon(column.key)}
                                        onClick={() => requestSort(column.key)}
                                    />
                                )}
                            </div>
                        </TableColumn>
                    ))}
                </TableHeader>
                <TableBody emptyContent="No hay resultados">
                    {currentPageItems.map((tool) => (
                        <TableRow key={tool.id}>
                            <TableCell>{tool.name}</TableCell>
                            <TableCell>{tool.serial_number}</TableCell>
                            <TableCell>{tool.model}</TableCell>
                            <TableCell>{tool.category}</TableCell>
                            <TableCell>{tool.provider}</TableCell>
                            <TableCell>
                                <Image
                                    src={tool.image}
                                    alt={tool.name}
                                    width={50}
                                    height={50}
                                />
                            </TableCell>
                            <TableCell>{tool.status}</TableCell>
                            <TableCell>
                                <div className="flex w-full gap-2">
                                    <Link
                                        href={`/gestion-inventario/equipos/gestionar?id=${tool.id}`}
                                        className="bg-blue-700 hover:bg-blue-800 transition duration-300 ease-in-out text-white font-bold rounded-lg flex items-center justify-center w-8 h-8"
                                    >
                                        <FontAwesomeIcon icon={faEdit} className="text-sm" />
                                    </Link>

                                    <button
                                        onClick={onOpen} // Abrimos el modal al hacer clic
                                        className="bg-red-700 hover:bg-red-800 transition duration-300 ease-in-out text-white font-bold rounded-lg flex items-center justify-center w-8 h-8"
                                    >
                                        <FontAwesomeIcon icon={faTrash} className="text-sm" />
                                    </button>
                                </div>
                                <SubmitModal
                                    isOpen={isOpen}
                                    onOpenChange={onOpenChange}
                                    handleDelete={handleDelete}
                                    toolId={tool.id}
                                />
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    );
}