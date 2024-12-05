"use client"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUpload } from '@fortawesome/free-solid-svg-icons'
import ProjectFile from './ProjectFile'
import { ScrollShadow } from '@nextui-org/scroll-shadow'


export default function FilePreview({ files, isDragReject }) {
    return (
        <>
            {files.length === 0 ?
                (
                    <>
                        {isDragReject ?
                            <p className='text-center text-[#dc2626]'>Solo se aceptan archivos con extensión ".jpg", ".jpeg", ".pdf", ".docx", ".xlsx" y ".png"</p> 
                            :
                            <>
                                <FontAwesomeIcon icon={faUpload} />
                                <p>Arrastra aquí o haz clic para seleccionar archivos</p>
                                <p>Tamaño máximo (2MB)</p>
                            </>
                        }
                    </>
                )
                :
                (
                    <ScrollShadow className='flex flex-col items-center justify-start self-start w-full h-full gap-3'>
                        {files.map((file, index) => <ProjectFile key={index} name={file.name} />)}
                    </ScrollShadow>
                )}
        </>
    )
}