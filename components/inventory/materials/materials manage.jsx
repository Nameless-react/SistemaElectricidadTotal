"use client"
import { MaterialFormProvider } from "./compoundComponents/context/materialFormContext"
import { MaterialCategoryDropdown, MaterialCost, MaterialDate, MaterialDescription, MaterialExpiration, MaterialForm, MaterialName, MaterialProviderDropdown, MaterialStatusDropdown, MaterialStock } from "./compoundComponents/materialForm"
import { SubmitButton } from "../../buttons/form/submitButton"
/**
 * Renders a form for managing materials, including adding and updating material details.
 *
 * @param {Object} props - The properties for the component.
 * @param {Array} props.providers - An array of provider objects for the material.
 * @param {Array} props.categories - An array of category objects for the material.
 * @param {string} props.id - The ID of the material, used to determine if the form is for updating an existing material.
 * @param {Object} props.material - The material object containing existing material details.
 * @param {string} props.title - The title to be displayed at the top of the form.
 *
 * @returns {JSX.Element} - A React component rendering the material management form.
 */
export default function ManageMaterial({ providers, categories, id, material, title }) {
    return (
        <div className="flex-grow sm:mx-auto sm:max-w-7xl pt-5 px-2 sm:px-6 mb-10">
            <h1 className="text-3xl text-center mb-8 font-semibold mt-10 text-white">
                {title}
            </h1>
            <MaterialFormProvider categories={categories} providers={providers} material={material}>
                <MaterialForm className="flex flex-col justify-center items-center bg-gray-800 bg-opacity-20 w-full sm:w-1/2 rounded-xl sm:mx-auto py-10 px-8">
                    <div className="flex flex-col sm:flex-row justify-center mb-5 sm:gap-4 space-y-5 sm:space-y-0 w-full">
                        <MaterialName className="w-full sm:w-auto" />
                        <MaterialStock className="w-full sm:w-auto" />
                    </div>
                    <div className="flex flex-col w-full mb-5">
                        <MaterialDescription />
                    </div>
                    <div className="flex flex-col sm:flex-row justify-center gap-4 mb-5 w-full">
                        <MaterialCost className="flex flex-col w-full sm:w-1/2" />
                        <MaterialExpiration className="flex flex-col w-full sm:w-1/2" />
                    </div>
                    <div className="flex flex-col sm:flex-row justify-center gap-4 mb-5 w-full">
                        <MaterialDate className="flex flex-col w-full sm:w-1/2" />
                        <MaterialProviderDropdown className="flex flex-col w-full sm:w-1/2" />
                    </div>
                    <div className="flex flex-col sm:flex-row justify-center gap-4 mb-5 w-full">
                        <MaterialCategoryDropdown className="flex flex-col w-full sm:w-1/2" />
                        <MaterialStatusDropdown className="flex flex-col w-full sm:w-1/2" />
                    </div>
                    <div className="flex justify-center w-full">
                        <SubmitButton id={id} title={id ? 'Actualizar Material' : 'Agregar Material'} className="mt-10 w-full sm:w-1/2" />
                    </div>
                </MaterialForm>
            </MaterialFormProvider>
        </div>
    )
}