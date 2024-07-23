"use client"
import React from 'react'
import { Input, Textarea } from "@nextui-org/input";
import { Dropdown, DropdownTrigger, DropdownMenu, DropdownItem } from "@nextui-org/dropdown";
import { Button } from "@nextui-org/button";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCaretDown, faCaretUp } from "@fortawesome/free-solid-svg-icons";
export default function Add() {

    const [selectedKeys, setSelectedKeys] = React.useState(new Set(["Estado"]));
    const [selectedKeys2, setSelectedKeys2] = React.useState(new Set(["Tipo"]));
    const [selectedProvider, setSelectedProvider] = React.useState(new Set(["Provider"]));
    const [isStateDropdownOpen, setIsStateDropdownOpen] = React.useState(false);

    const selectedValue = React.useMemo(
        () => Array.from(selectedKeys).join(", ").replaceAll("_", " "),
        [selectedKeys]

    );
    const selectedValue2 = React.useMemo(
        () => Array.from(selectedKeys2).join(", ").replaceAll("_", " "),
        [selectedKeys2]
    );

    const selectedProviderValue = React.useMemo(
        () => Array.from(selectedProvider).join(", ").replaceAll("_", " "),
        [selectedProvider]
    );

    const handleStateOpenChange = (isStateDropdownOpen) => {
        setIsStateDropdownOpen(isStateDropdownOpen);
    };

    return (
        <div className='flex-grow mx-auto max-w-7xl pt-10 px-6'>
            <h1 className="text-3xl text-center mb-8 font-semibold mt-10 text-white">Agregar Material</h1>
            <div className="flex flex-col justify-center items-center mb-1 bg-neutral-950 sm:w-[600px]  rounded-xl mx-auto py-8 px-8 ">
                <form>
                    <div className="flex justify-center mb-5 gap-4 items-center">
                        <div>
                            <Input
                                bordered
                                color="default "
                                label="Nombre"
                                labelPlacement="outside"
                                className="dark w-full"
                                size="md"
                                placeholder="Nombre del material "
                            />
                        </div>
                        <div>
                            <Input
                                bordered
                                label="Marca"
                                labelPlacement="outside"
                                className="dark w-full"
                                color="default "
                                size="md"
                                placeholder="Marca"
                            />
                        </div>

                    </div>
                    <div className="flex justify-center mb-5  items-center">
                        <Textarea
                            labelPlacement="inside"
                            className="dark"
                            placeholder="Descripción" />
                    </div>
                    <div className="flex justify-center gap-4 mb-5  items-center">
                        <div className='flex flex-col w-1/2'>
                            <Input
                                bordered
                                label="Costo Unitario"
                                labelPlacement="outside"
                                type="number"
                                color="default "
                                className="dark w-full"
                                size="md"
                                placeholder="Costo"
                            />
                        </div>
                        <div className='flex flex-col w-1/2'>
                            <Input
                                bordered
                                label="Fecha de compra"
                                labelPlacement="outside"
                                type="date"
                                className="dark w-full"
                                color="default "
                                size="md"
                                placeholder="Modelo"
                            />
                        </div>
                    </div>
                    <div className="flex justify-center gap-4 mb-5 items-center">
                        <div className='flex flex-col w-1/2'>
                            <label className="text-white">Estado</label>
                            <Dropdown
                                className='dark w-full '
                                open={isStateDropdownOpen}
                                onOpenChange={handleStateOpenChange}
                            >
                                <DropdownTrigger>
                                    <Button
                                        variant="flat"
                                        className="dark capitalize"
                                    >
                                        {selectedValue}
                                        <div>
                                            <FontAwesomeIcon
                                                icon={faCaretDown}
                                                className={`ml-1 transition-transform duration-200 ${isStateDropdownOpen ? 'rotate-180' : ''}`}
                                            />
                                        </div>
                                    </Button>
                                </DropdownTrigger>
                                <DropdownMenu
                                    aria-label="Single selection example"
                                    variant="flat"
                                    disallowEmptySelection
                                    selectionMode="single"
                                    selectedKeys={selectedKeys}
                                    onSelectionChange={setSelectedKeys}
                                >
                                    <DropdownItem key="state">Estado</DropdownItem>
                                    <DropdownItem key="disponible">Disponible</DropdownItem>
                                    <DropdownItem key="no_disponible">No Disponible</DropdownItem>
                                </DropdownMenu>
                            </Dropdown>
                        </div>
                        <div className='flex flex-col w-1/2'>
                            <label className="text-white">Tipo</label>
                            <Dropdown
                                className='dark w-full '
                                open={isStateDropdownOpen}
                                onOpenChange={handleStateOpenChange}
                            >
                                <DropdownTrigger>
                                    <Button
                                        variant="flat"
                                        className="dark capitalize"
                                    >
                                        {selectedValue2}
                                        <div>
                                            <FontAwesomeIcon
                                                icon={faCaretDown}
                                                className={`ml-1 transition-transform duration-200 ${isStateDropdownOpen ? 'rotate-180' : ''}`}
                                            />
                                        </div>
                                    </Button>
                                </DropdownTrigger>
                                <DropdownMenu
                                    aria-label="Single selection example"
                                    variant="flat"
                                    disallowEmptySelection
                                    selectionMode="single"
                                    selectedKeys={selectedKeys2}
                                    onSelectionChange={setSelectedKeys2}
                                >
                                    <DropdownItem key="computadora">Computadora</DropdownItem>
                                    <DropdownItem key="herramienta">Herramienta</DropdownItem>
                                    <DropdownItem key="maquinaria_electrica">Maquinaria Electrica</DropdownItem>
                                    <DropdownItem key="maquinaria_corte">Maquinaria de Corte</DropdownItem>
                                    <DropdownItem key="vehiculo">Vehiculo</DropdownItem>
                                </DropdownMenu>
                            </Dropdown>
                        </div>

                    </div>
                    <div className="flex justify-center gap-4 mb-6 items-center">
                        <div className='flex flex-col w-1/2'>
                            <label className="text-white">Provider</label>
                            <Dropdown
                                className='dark w-full '
                                open={isStateDropdownOpen}
                                onOpenChange={handleStateOpenChange}
                            >
                                <DropdownTrigger>
                                    <Button
                                        variant="flat"
                                        className="dark capitalize"
                                    >
                                        {selectedProviderValue}
                                        <div>
                                            <FontAwesomeIcon
                                                icon={faCaretDown}
                                                className={`ml-1 transition-transform duration-200 ${isStateDropdownOpen ? 'rotate-180' : ''}`}
                                            />
                                        </div>
                                    </Button>
                                </DropdownTrigger>
                                <DropdownMenu
                                    aria-label="Single selection example"
                                    variant="flat"
                                    disallowEmptySelection
                                    selectionMode="single"
                                    selectedKeys={selectedProvider}
                                    onSelectionChange={setSelectedProvider}
                                >
                                    <DropdownItem key="proveedor_1">Proveedor1</DropdownItem>
                                    <DropdownItem key="proveedor_2">Proveedor2</DropdownItem>
                                    <DropdownItem key="proveedor_3">Proveedor3 </DropdownItem>
                                </DropdownMenu>
                            </Dropdown>
                        </div>
                        <div>
                            <Input
                                bordered
                                label="Cantidad"
                                labelPlacement="outside"
                                type="number"
                                className="dark w-full"
                                color="default "
                                size="md"
                                placeholder="0" 
                            />
                        </div>
                    </div>
                  
                    <div className='flex flex-col  items-end justify-end'>
                        <Button
                            className=" self-end bg-green-700 hover:bg-green-800 transition duration-300 ease-in-out text-white font-bold py-2 px-8 rounded-xl "
                            type="submit"
                        >
                            Guardar
                        </Button>
                    </div>

                </form>
            </div>
        </div>
    )
}