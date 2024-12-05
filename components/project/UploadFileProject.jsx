"use client"
import { useCallback, useState } from 'react'
import { useDropzone } from 'react-dropzone'
import style from "/css/projectDashboard.module.css"
import FilePreview from './FilePreview'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faComputer } from '@fortawesome/free-solid-svg-icons'

export default function UploadFileProject() {
    const [files, setFiles] = useState([]);
    const onDrop = useCallback(acceptedFiles => {
        console.log(acceptedFiles)
        setFiles(prevFiles => [...prevFiles, ...acceptedFiles])
    }, [])

    const { getRootProps, getInputProps, open, isDragActive, isDragAccept, isDragReject } = useDropzone({ 
        onDrop,
        multiple: true,
        noKeyboard: true, 
        noClick: true, 
        maxSize: 2_097_152,
        accept: {
            "image/jpeg": [".jpeg", ".jpg"],
            "image/png": [".png"],
            "application/pdf": [".pdf"],
            "application/vnd.openxmlformats-officedocument.presentationml.presentation": [".pptx"],
            "application/vnd.openxmlformats-officedocument.wordprocessingml.document": [".docx"],
            "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet": [".xlsx"]
        }})


    return (
        <form className="flex items-center justify-center flex-col gap-8 w-[90%]">
            <h3 className='text-2xl font-bold self-start'>Subir Archivos</h3>
            <button onClick={open} type='button' className='font-bold text-l w-full rounded-3xl py-2 text-white bg-blue-700'> <FontAwesomeIcon icon={faComputer}/> Examinar</button>
            <div className={`${style.uploadImageContainer} ${isDragActive && style.focusImage} ${isDragAccept && style.imageAccepted} ${isDragReject && style.imageRejected}`} {...getRootProps()}>
                <input {...getInputProps()} />
                {
                  <FilePreview files={files} isDragReject={isDragReject} />
                }
            </div>
            {files.length > 0 && <button className='font-bold text-l w-full rounded-3xl py-2 text-white bg-green-700'>Guardar</button>}
        </form>
    )
}