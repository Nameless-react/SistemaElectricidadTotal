"use client"
import ModalWrapper from "../others/ModalWrapper";
import FormTask from "./FormTask";


export default function FormTaskModal({ title, description, deadline, employees, idStatus, modalTitle, buttonComponent, classNameButton }) {
  
    return (
        <div>
            <ModalWrapper modalTitle={modalTitle} buttonComponent={buttonComponent} classNameButton={classNameButton}>
                {(onClose) => (
                   <FormTask 
                    onClose={onClose}
                    title={title}
                    description={description} 
                    deadline={deadline}
                    employees={employees}
                    idStatus={idStatus}
                    />
                )}
            </ModalWrapper>
        </div>
    )
}