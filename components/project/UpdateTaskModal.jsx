"use client"
import { Modal, ModalContent, ModalHeader, ModalBody } from "@nextui-org/modal"

export default function UpdateTaskModal({ children, onOpenChange, isOpen }) {
    
    return (
        <>
            <Modal isOpen={isOpen} onOpenChange={onOpenChange} size="2xl" className="dark">
                <ModalContent>
                    {(onClose) => (
                        <>
                            <ModalHeader className="flex flex-col gap-1 font-bold px-12">Actualizar tarea</ModalHeader>
                            <ModalBody className="p-12 pt-6">
                               {children}
                            </ModalBody>
                        </>
                    )}
                </ModalContent>
            </Modal>
        </>
    )
}