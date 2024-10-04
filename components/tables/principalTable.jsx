export const PrincipalTable = ({ }) => {
    return (
        <div className='flex-grow mx-auto max-w-7xl pt-16 px-6'>
            <h1 className="text-3xl text-center mb-8 font-semibold mt-10 text-white">Gestión de equipos</h1>
            <div className="flex mb-2 justify-end items-center">
                <Input
                    placeholder="Buscar"
                    className="flex flex-col text-xl justify-center rounded-xl dark mr-2"
                    onChange={(e) => handleSearch(e, setSearch)}
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
                                    handleDelete={(toolId) => handleDelete(toolId, router)}
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