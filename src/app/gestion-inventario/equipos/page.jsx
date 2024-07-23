'use client';

import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell } from "@nextui-org/table";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faEdit, faTrash, faSearch, faSortUp, faSortDown } from "@fortawesome/free-solid-svg-icons";
import { Input } from "@nextui-org/input";


export default function Equipos() {
  return (
    <div className='className="flex-grow mx-auto max-w-7xl pt-16 px-6"'>
      <h1 className="text-3xl text-center mb-8   font-semibold mt-10 text-white">Gestión de equipos</h1>
      <div className="flex mb-2 justify-end items-center ">
        <Input placeholder="Buscar" className="flex flex-col text-xl justify-center rounded-xl dark mr-2"
          startContent={
            <div>
              <FontAwesomeIcon size="sm" icon={faSearch} />
            </div>
          }
        />
        <Link className="bg-green-700 hover:bg-green-800 transition duration-300 ease-in-out text-white font-bold py-2 px-8 rounded-xl " href={"#"}><FontAwesomeIcon icon={faPlus} /></Link>
      </div>
      <Table

        className="dark"
        aria-label="Tabla de equipos">
        <TableHeader>
          <TableColumn>
            <div className="flex items-center justify-between">
              EQUIPO
              <div className="flex flex-col ml-1">
                <FontAwesomeIcon icon={faSortUp} className="cursor-pointer text-xs" />
                <FontAwesomeIcon icon={faSortDown} className="cursor-pointer text-xs" />
              </div>
            </div>
          </TableColumn>
          <TableColumn>
            <div className="flex items-center justify-between">
              Modelo
              <div className="flex flex-col ml-1">
                <FontAwesomeIcon icon={faSortUp} className="cursor-pointer text-xs" />
                <FontAwesomeIcon icon={faSortDown} className="cursor-pointer text-xs" />
              </div>
            </div>
          </TableColumn>
          <TableColumn>
            <div className="flex items-center justify-between">
              Tipo
              <div className="flex flex-col ml-1">
                <FontAwesomeIcon icon={faSortUp} className="cursor-pointer text-xs" />
                <FontAwesomeIcon icon={faSortDown} className="cursor-pointer text-xs" />
              </div>
            </div>
          </TableColumn>
          <TableColumn>
            <div className="flex items-center justify-between">
              Proveedor
              <div className="flex flex-col ml-1">
                <FontAwesomeIcon icon={faSortUp} className="cursor-pointer text-xs" />
                <FontAwesomeIcon icon={faSortDown} className="cursor-pointer text-xs" />
              </div>
            </div>
          </TableColumn>
          <TableColumn>
            <div className="flex items-center justify-between">
              Costo
              <div className="flex flex-col ml-1">
                <FontAwesomeIcon icon={faSortUp} className="cursor-pointer text-xs" />
                <FontAwesomeIcon icon={faSortDown} className="cursor-pointer text-xs" />
              </div>
            </div>
          </TableColumn>
          <TableColumn>
            <div className="flex items-center justify-between">
              Estado
              <div className="flex flex-col ml-1">
                <FontAwesomeIcon icon={faSortUp} className="cursor-pointer text-xs" />
                <FontAwesomeIcon icon={faSortDown} className="cursor-pointer text-xs" />
              </div>
            </div>
          </TableColumn>
          <TableColumn>Detalles</TableColumn>
          <TableColumn>ACCIONES</TableColumn>
        </TableHeader>
        <TableBody
          emptyContent="No hay resultados"
        >
          <TableRow key="1">
            <TableCell>Equipo 1</TableCell>
            <TableCell>Modelo A123</TableCell>
            <TableCell>Herramienta</TableCell>
            <TableCell>Proveedor1</TableCell>
            <TableCell>$200.00</TableCell>
            <TableCell>Disponible</TableCell>
            <TableCell> <Link href="#"><div className="flex cursor-pointer hover:text-blue-700 transition duration-300 ease-in-out justify-start items-center underline">Ver detalles</div></Link></TableCell>
            <TableCell>
              <div className="flex w-full gap-2 ">
                <div className="bg-blue-700 hover:bg-blue-800 transition duration-300 ease-in-out text-white font-bold py-1 px-2 rounded-lg">
                  <Link className="text-xl " href={"#"}><FontAwesomeIcon icon={faEdit} /></Link>
                </div>
                <div className="bg-red-700 hover:bg-red-800 transition duration-300 ease-in-out text-white font-bold py-1 px-2 rounded-lg">
                  <Link className="text-xl" href={"#"}><FontAwesomeIcon icon={faTrash} /></Link>
                </div>
              </div>
            </TableCell>
          </TableRow>
          <TableRow key="2">
            <TableCell>Equipo 2</TableCell>
            <TableCell>Modelo B123</TableCell>
            <TableCell>Herramienta</TableCell>
            <TableCell>Proveedor2</TableCell>
            <TableCell>$200.00</TableCell>
            <TableCell>Disponible</TableCell>
            <TableCell> <Link href="#"><div className="flex cursor-pointer hover:text-blue-700 transition duration-300 ease-in-out justify-start items-center underline">Ver detalles</div></Link></TableCell>
            <TableCell>
              <div className="flex  gap-2 ">
                <div className="bg-blue-700 hover:bg-blue-800 transition duration-300 ease-in-out text-white font-bold py-1 px-2 rounded-lg">
                  <Link className="text-xl " href={"#"}><FontAwesomeIcon icon={faEdit} /></Link>
                </div>
                <div className="bg-red-700 hover:bg-red-800 transition duration-300 ease-in-out text-white font-bold py-1 px-2 rounded-lg">
                  <Link className="text-xl" href={"#"}><FontAwesomeIcon icon={faTrash} /></Link>
                </div>
              </div>
            </TableCell>
          </TableRow>
          <TableRow key="3">
            <TableCell>Equipo 3</TableCell>
            <TableCell>Modelo C123</TableCell>
            <TableCell>Herramienta</TableCell>
            <TableCell>Proveedor3</TableCell>
            <TableCell>$200.00</TableCell>
            <TableCell>No Disponible</TableCell>
            <TableCell> <Link href=""><div className="flex cursor-pointer hover:text-blue-700 transition duration-300 ease-in-out justify-start items-center underline">Ver detalles</div></Link></TableCell>
            <TableCell>
              <div className="flex w-full gap-2 ">
                <div className="bg-blue-700 hover:bg-blue-800 transition duration-300 ease-in-out text-white font-bold py-1 px-2 rounded-lg">
                  <Link className="text-xl " href={"#"}><FontAwesomeIcon icon={faEdit} /></Link>
                </div>
                <div className="bg-red-700 hover:bg-red-800 transition duration-300 ease-in-out text-white font-bold py-1 px-2 rounded-lg">
                  <Link className="text-xl" href={"#"}><FontAwesomeIcon icon={faTrash} /></Link>
                </div>
              </div>
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </div>
  )
}