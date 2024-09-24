'use client';

import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell } from "@nextui-org/table";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faEdit, faTrash, faSearch, faSortUp, faSortDown } from "@fortawesome/free-solid-svg-icons";
import { Input } from "@nextui-org/input";

export default function ToolsTable({ tools }) {
    return (
        <div className='flex-grow mx-auto max-w-7xl pt-16 px-6'>
            <h1 className="text-3xl text-center mb-8 font-semibold mt-10 text-white">Gestión de equipos</h1>
            <div className="flex mb-2 justify-end items-center">
                <Input placeholder="Buscar" className="flex flex-col text-xl justify-center rounded-xl dark mr-2"
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
            <Table className="dark" aria-label="Tabla de equipos">
                <TableHeader>
                   <TableColumn>Nombre</TableColumn>
                    <TableColumn>Serial</TableColumn>
                    <TableColumn>Modelo</TableColumn>
                    <TableColumn>Imagen</TableColumn>
                    <TableColumn>Categoria</TableColumn>
                    <TableColumn>Proveedoredor</TableColumn>
                    <TableColumn>Estado</TableColumn>
                    <TableColumn>Acciones</TableColumn>
                </TableHeader>
                <TableBody emptyContent="No hay resultados">
                    {tools.map((tool) => (
                        <TableRow key={tool.id}>
                            <TableCell>{tool.name}</TableCell>
                            <TableCell>{tool.serial_number}</TableCell>
                            <TableCell>{tool.model}</TableCell>
                            <TableCell>{tool.image}</TableCell>
                            <TableCell>{tool.category}</TableCell>
                            <TableCell>{tool.provider}</TableCell>
                            <TableCell>{tool.status}</TableCell>
                            <TableCell>
                                <div className="flex w-full gap-2">
                                    <div className="bg-blue-700 hover:bg-blue-800 transition duration-300 ease-in-out text-white font-bold py-1 px-2 rounded-lg">
                                        <Link className="text-xl" href={"/gestion-inventario/equipos/gestionar?id=" + tool.id}>
                                            <FontAwesomeIcon icon={faEdit} />
                                        </Link>
                                    </div>
                                    <div className="bg-red-700 hover:bg-red-800 transition duration-300 ease-in-out text-white font-bold py-1 px-2 rounded-lg">
                                        <Link className="text-xl" href={"#"}>
                                            <FontAwesomeIcon icon={faTrash} />
                                        </Link>
                                    </div>
                                </div>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    );
}