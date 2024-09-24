"use client"
import React from 'react'
import { ToolFormProvider } from "./compoundComponents/context/toolsFormContext";
import { ToolForm, ToolName, ToolModel, ToolDescription, ToolsCategoryDropdown, ToolsProviderDropdown, ToolStatusDropdown, ToolSerial, ToolCost, ToolDate, ToolsMaintenanceNotesCheckbox, ToolImage } from './compoundComponents/tools/toolForm';
import { SubmitButton } from '../../buttons/form/submitButton';
import { useSearchParams } from 'next/navigation';
export default function ManageTool({ categories, providers }) {
    const searchParams = useSearchParams();
    const id = searchParams.get('id');

    return (
        <div className="flex-grow sm:mx-auto sm:max-w-7xl pt-5 px-2 sm:px-6 mb-10">
            <h1 className="text-3xl text-center mb-8 font-semibold mt-10 text-white">
                Agregar Equipo
            </h1>

            <ToolFormProvider categories={categories} providers={providers}>
                <ToolForm className="flex flex-col justify-center items-center bg-gray-800 bg-opacity-20 w-full sm:w-1/2 rounded-xl sm:mx-auto py-10 px-8">
                    {/* Primera fila: Nombre y Modelo */}
                    <div className="flex flex-col sm:flex-row justify-center mb-5 sm:gap-4 space-y-5 sm:space-y-0 w-full">
                        <ToolName className="w-full sm:w-auto" />
                        <ToolModel className="w-full sm:w-auto" />
                    </div>
                    {/* Descripción */}
                    <div className="flex flex-col w-full mb-5">
                        <ToolDescription />
                    </div>

                    {/* Segunda fila: Costo y Fecha */}
                    <div className="flex flex-col sm:flex-row justify-center gap-4 mb-5 w-full">
                        <ToolCost className="flex flex-col w-full sm:w-1/2" />
                        <ToolDate className="flex flex-col w-full sm:w-1/2" />
                    </div>

                    {/* Tercera fila: Estado y Categoría */}
                    <div className="flex flex-col sm:flex-row justify-center gap-4 mb-5 w-full">
                        <ToolStatusDropdown className="flex flex-col w-full sm:w-1/2" />
                        <ToolsCategoryDropdown className="flex flex-col w-full sm:w-1/2" />
                    </div>

                    {/* Cuarta fila: Proveedor y Serial */}
                    <div className="flex flex-col sm:flex-row justify-center gap-4 mb-5 w-full">
                        <ToolsProviderDropdown className="flex flex-col w-full sm:w-1/2" />
                        <ToolSerial className="flex flex-col w-full sm:w-1/2" />
                    </div>

                    {/* Imagen */}
                    <div className="mb-5">
                        <ToolImage className="flex flex-col items-center" />
                    </div>

                    {/* Checkbox para notas de mantenimiento */}
                    <div className="mb-5">
                        <ToolsMaintenanceNotesCheckbox />
                    </div>

                    {/* Botón de envío */}
                    <div className="flex justify-center w-full">
                        <SubmitButton id={id} title={id ? 'Actualizar Equipo' : 'Agregar Equipo'} className="mt-10 w-full sm:w-1/2" />
                    </div>
                </ToolForm>
            </ToolFormProvider>
        </div>
    )
}

