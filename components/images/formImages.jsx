import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCamera, faTimes } from "@fortawesome/free-solid-svg-icons";
import Image from 'next/image';
import { Suspense } from 'react';



/*
    Este componente permite subir las imagenes a un formulario de envio de datos.
    Se utiliza la librería next/image para mostrar las imagenes de forma dinamica.
    Para este componente se deben de cargar dos funciones, handleImageChange y handleImageRemove, las cuales estan en la carpeta functions/handles/tools (proximamente images)
    Se deben de pasar dos useState, uno que seria el formulario(formData) y otro que seria el preview de la imagen(imagePreview).
    Asimismo se deben de pasar las dos funciones de los useState, setFormData y setImagePreview.
    Ejemplo:
    
    import {handleImageChange, handleImageRemove} from '../../functions/handles/tools'

    const [formData, setFormData] = useState({});
    const [imagePreview, setImagePreview] = useState(null);

    <UploadImage
        handleImageChange={handleImageChange}
        handleImageRemove={handleImageRemove}
        formData={formData}
        setFormData={setFormData}
        imagePreview={imagePreview}
        setImagePreview={setImagePreview}
    />
*/
export const UploadImage = ({ className = "" ,handleImageChange, handleImageRemove, formData, setFormData, imagePreview, setImagePreview, setErrors = "", errors = ""}) => {
    return (
        <div className={className}>
            <label className="text-white mt-5">Agrega una imagen(opcional)</label>
            <label
                htmlFor='image'
                className=" w-16 h-16 flex flex-col items-center justify-center mb-4 bg-main-purple  text-white outline-none  rounded-full focus:shadow-md cursor-pointer hover:bg-hover-purple transition-all duration-300  ease-in-out hover:scale-105"
            >
                <FontAwesomeIcon icon={faCamera} className="text-3xl shadow-xl font-bold  bg-neutral-700 p-4 rounded-full mt-2" />
                <input
                    type="file"
                    name="image"
                    id="image"
                    hidden
                    className="hidden"
                    onChange={(e) => handleImageChange(e, formData, setFormData, setImagePreview, setErrors, errors)}
                />
            </label>
            {
                imagePreview && (
                    <div className='relative w-52 h-52'>
                        <button
                            onClick={() => handleImageRemove(formData, setFormData, setImagePreview)}
                            className="absolute top-0 right-2 bg-red-600 text-white rounded-xl px-3 py-1  hover:bg-red-800 transition-colors"
                        >
                            <FontAwesomeIcon
                                icon={faTimes}
                            />
                        </button>
                        <Suspense fallback={<div>Loading...</div>}>
                            <Image
                                src={imagePreview}
                                width={200}
                                height={200}
                                className='rounded-2xl'
                                loading='lazy'
                                alt="Preview"
                            />
                        </Suspense>
                    </div>
                )
            }
        </div>
    );
}