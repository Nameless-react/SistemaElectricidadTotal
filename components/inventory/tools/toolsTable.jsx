'use client';

import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell } from "@nextui-org/table";
import { Pagination } from "@nextui-org/pagination";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";
import { Button } from "@nextui-org/button";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { handleDelete } from "../../../functions/handles/formHandles";
import { getSortIcon, getSortResults, requestSort } from "../../../functions/utils/sortingUtils";
import { searchFilter } from "../../../functions/utils/searchingUtils";
import { getCurrentPageItems } from "../../../functions/utils/nextUIPagUtils";
import { handleSearch } from "../../../functions/handles/searchHandles";
import { SuccessModal } from "../../modals/formSuccessModal/successModal";
import Image from "next/image";
import { useDisclosure } from "@nextui-org/modal";
import { SearchInput } from "../../search/searchInput";
import SubmitModal from "../../modals/submitModal";


/**
 * Renders a table displaying a list of tools with options for sorting, searching, and pagination.
 * Provides functionality to add, edit, and delete tools, as well as view tool details.
 * Displays success messages for create, update, and delete actions.
 *
 * @param {Array} tools - Array of tool objects to be displayed in the table.
 * @returns {JSX.Element} A React component rendering the tools table.
 */
export default function ToolsTable({ tools }) {
    const searchParams = useSearchParams();
    const { isOpen, onOpen, onOpenChange } = useDisclosure();
    const router = useRouter();
    const updateSuccess = searchParams.get("updateSuccess");
    const createSuccess = searchParams.get("createSuccess");
    const deleteSuccess = searchParams.get("deleteSuccess");
    const [search, setSearch] = useState("");
    const [serverError, setServerError] = useState({});
    const [sortConfig, setSortConfig] = useState({ key: 'name', direction: 'ascending' });
    const [page, setPage] = useState(1);
    const itemsPerPage = 8;
    const columns = [
        { title: "ID", key: "id" },
        { title: "Nombre", key: "name" },

        { title: "Serial", key: "serial_number" },
        { title: "Modelo", key: "model" },
        { title: "Categoría", key: "category" },
        { title: "Proveedor", key: "provider" },
        { title: "Imagen", key: "image" },
        { title: "Estado", key: "status" },
        { title: "Acciones", key: "actions" },
    ];

    const handleOnModalClose = () => {
        const newSearchParams = new URLSearchParams(window.location.search);
        if (updateSuccess) newSearchParams.delete("updateSuccess");
        if (createSuccess) newSearchParams.delete("createSuccess");
        if (deleteSuccess) newSearchParams.delete("deleteSuccess");

        if (newSearchParams.toString() !== "") {
            router.replace(`${window.location.pathname}?${newSearchParams.toString()}`);
        } else {
            router.replace(window.location.pathname);
        }
    }
    
    useEffect(() => {
        setPage(1);
    }, [search]);


    const results = searchFilter(tools, search);
    const sortedResults = getSortResults(results, sortConfig);
    const totalItems = sortedResults.length;
    const totalPages = Math.ceil(totalItems / itemsPerPage);
    const currentPageItems = getCurrentPageItems(page, itemsPerPage, sortedResults);

    return (
        <div className='flex-grow mx-auto max-w-7xl pt-16 px-6'>
            <h1 className="text-3xl text-center mb-8 font-semibold mt-10 text-white">Gestión de equipos</h1>
            <div className="flex flex-col md:flex-row mb-2 justify-end items-center">
                <SearchInput handleSearch={(e) => handleSearch(e, setSearch)} className="flex flex-col text-xl justify-center rounded-xl mr-2r" />
                <Link className=" flex items-center mt-2 sm:mt-0 justify-center w-full sm:w-auto bg-green-700 hover:bg-green-800 transition duration-300 ease-in-out text-white font-bold py-3 ml-1 px-8 rounded-xl " href={"/gestion-inventario/equipos/gestionar"}>
                    <FontAwesomeIcon icon={faPlus} />
                </Link>
            </div>
            <div>
                {serverError && serverError.error && <p className="text-red-500 text-center mt-4 mb-4">{serverError.error.internal_server_error.message}</p>}
            </div>
            <SuccessModal
                title={updateSuccess ? "Equipo actualizado" : "Equipo creado"}
                message={
                    updateSuccess ? "Equipo actualizado exitosamente" :
                        createSuccess ? "Equipo creado exitosamente" :
                            deleteSuccess ? "Equipo eliminado exitosamente" :
                                "Equipo creado exitosamente"
                }
                onModalClose={handleOnModalClose}
                router={router}
                updateSearchParam={updateSuccess}
                createSearchParam={createSuccess}
                deleteSearchParam={deleteSuccess}
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
                                        icon={getSortIcon(column.key, sortConfig)}
                                        onClick={() => requestSort(column.key, sortConfig, setSortConfig)}
                                    />
                                )}
                            </div>
                        </TableColumn>
                    ))}
                </TableHeader>
                <TableBody emptyContent="No hay resultados">
                    {currentPageItems.map((tool) => (
                        <TableRow key={tool.id}>
                            <TableCell>{tool.id}</TableCell>
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
                                    <Link href={`/gestion-inventario/equipos/gestionar?id=${tool.id}`} passHref>
                                        <Button
                                            size="sm"
                                            href={`/gestion-inventario/equipos/gestionar?id=${tool.id}`}
                                            className="bg-blue-700 hover:bg-blue-800 transition duration-300 ease-in-out text-white font-bold rounded-lg flex items-center justify-center w-8 h-8"
                                        >
                                            <FontAwesomeIcon icon={faEdit} className="text-sm" />
                                        </Button>
                                    </Link>
                                    <SubmitModal
                                        onSubmit={() => handleDelete(tool.id, process.env.NEXT_PUBLIC_URL_TOOLS_Tool, process.env.NEXT_PUBLIC_URL_TOOLS, setServerError)}
                                        title={"Eliminar equipo"}
                                        message={"¿Estas seguro de eliminar este equipo?"}
                                        actionValue={"Eliminar"}
                                        classNameSubmitButton="bg-red-700 hover:bg-red-800 transition duration-300 ease-in-out text-white font-bold rounded-lg flex items-center justify-center"
                                        classNameModalButton="bg-red-700 hover:bg-red-800 transition duration-300 ease-in-out text-white font-bold rounded-lg flex items-center justify-center w-8 h-8"
                                        isWithIcon
                                        icon={faTrash}
                                    />
                                </div>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    );
}