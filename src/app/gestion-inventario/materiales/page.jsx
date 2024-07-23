'use client';

import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell } from "@nextui-org/table";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faEdit, faTrash, faSearch } from "@fortawesome/free-solid-svg-icons";
import { Input } from "@nextui-org/input";

export default function Materiales() {
    return (
        <div className='flex-grow mx-auto max-w-7xl pt-16 px-6'>
           <h1 className="text-3xl text-center mb-8 font-semibold mt-10 text-white">Gestión de Materiales</h1>
           <div className="flex mb-2 justify-end items-center ">
            <Input placeholder="Buscar" className="flex flex-col justify-center rounded-xl dark mr-2"
                startContent ={
                    <FontAwesomeIcon icon={faSearch}/>
                }
            />
            <Link className="bg-green-700 hover:bg-green-800 transition duration-300 ease-in-out text-white font-bold py-2 px-8 rounded-xl " href={"#"}><FontAwesomeIcon icon={faPlus}/></Link>
          </div>
           <Table 
              className="dark"
              aria-label="Tabla de materiales">
             <TableHeader>
               <TableColumn>Nombre</TableColumn>
               <TableColumn>Tipo</TableColumn>
               <TableColumn>Unidades de medida</TableColumn>
               <TableColumn>Cantidad</TableColumn>
               <TableColumn>Precio Unitario</TableColumn>
               <TableColumn>Proveedor</TableColumn>
               <TableColumn>Ultima Fecha de compra</TableColumn>
               <TableColumn>Estado</TableColumn>
               <TableColumn>Detalles</TableColumn>
               <TableColumn>ACCIONES</TableColumn>
             </TableHeader>
             <TableBody>
               <TableRow key="1">
                 <TableCell>Material 1</TableCell>
                 <TableCell>Construccion</TableCell>
                 <TableCell>Metros</TableCell>
                 <TableCell>100</TableCell>
                 <TableCell>$10.00</TableCell>
                 <TableCell>Proveedor1</TableCell>
                 <TableCell>01/07/2023</TableCell>
                 <TableCell>Disponible</TableCell>
                 <TableCell><Link href="#"><div className="flex cursor-pointer hover:text-blue-700 transition duration-300 ease-in-out justify-start items-center underline">Ver detalles</div></Link></TableCell>
                 <TableCell>
                    <div className="flex w-full gap-2 ">
                        <div className="bg-blue-700 hover:bg-blue-800 transition duration-300 ease-in-out text-white font-bold py-1 px-2 rounded-lg">
                            <Link className="text-xl " href={"#"}><FontAwesomeIcon icon={faEdit}/></Link>
                        </div>
                        <div className="bg-red-700 hover:bg-red-800 transition duration-300 ease-in-out text-white font-bold py-1 px-2 rounded-lg">
                            <Link className="text-xl" href={"#"}><FontAwesomeIcon icon={faTrash}/></Link>
                        </div>
                    </div>
                 </TableCell>
               </TableRow>
               <TableRow key="2">
                 <TableCell>Material 2</TableCell>
                 <TableCell>Construccion</TableCell>
                 <TableCell>Unidades</TableCell>
                 <TableCell>500</TableCell>
                 <TableCell>$5.00</TableCell>
                 <TableCell>Proveedor2</TableCell>
                 <TableCell>15/06/2023</TableCell>
                 <TableCell>Bajo stock</TableCell>
                 <TableCell><Link href="#"><div className="flex cursor-pointer hover:text-blue-700 transition duration-300 ease-in-out justify-start items-center underline">Ver detalles</div></Link></TableCell>
                 <TableCell>
                    <div className="flex gap-2 ">
                        <div className="bg-blue-700 hover:bg-blue-800 transition duration-300 ease-in-out text-white font-bold py-1 px-2 rounded-lg">
                            <Link className="text-xl " href={"#"}><FontAwesomeIcon icon={faEdit}/></Link>
                        </div>
                        <div className="bg-red-700 hover:bg-red-800 transition duration-300 ease-in-out text-white font-bold py-1 px-2 rounded-lg">
                            <Link className="text-xl" href={"#"}><FontAwesomeIcon icon={faTrash}/></Link>
                        </div>
                    </div>
                 </TableCell>
               </TableRow>
               <TableRow key="3">
                 <TableCell>Material 3</TableCell>
                 <TableCell>Electrico</TableCell>
                 <TableCell>Kilogramos</TableCell>
                 <TableCell>250</TableCell>
                 <TableCell>$20.00</TableCell>
                 <TableCell>Proveedor3</TableCell>
                 <TableCell>30/05/2023</TableCell>
                 <TableCell>No Disponible</TableCell>
                 <TableCell><Link href="#"><div className="flex cursor-pointer hover:text-blue-700 transition duration-300 ease-in-out justify-start items-center underline">Ver detalles</div></Link></TableCell>
                 <TableCell>
                    <div className="flex w-full gap-2 ">
                        <div className="bg-blue-700 hover:bg-blue-800 transition duration-300 ease-in-out text-white font-bold py-1 px-2 rounded-lg">
                            <Link className="text-xl " href={"#"}><FontAwesomeIcon icon={faEdit}/></Link>
                        </div>
                        <div className="bg-red-700 hover:bg-red-800 transition duration-300 ease-in-out text-white font-bold py-1 px-2 rounded-lg">
                            <Link className="text-xl" href={"#"}><FontAwesomeIcon icon={faTrash}/></Link>
                        </div>
                    </div>
                 </TableCell>
               </TableRow>
             </TableBody>
           </Table>
        </div>
    )
}