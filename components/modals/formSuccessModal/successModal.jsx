import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Modal, ModalHeader, ModalBody, ModalContent, useDisclosure } from "@nextui-org/modal";
import { useEffect } from "react";
import  {faCheckCircle} from "@fortawesome/free-solid-svg-icons";
export const SuccessModal = ({ updateSearchParam = false, createSearchParam = false, router, title, message }) => {
    const { isOpen, onOpen, onOpenChange } = useDisclosure();

    useEffect(() => {
        // Verifica si uno de los parámetros es verdadero para abrir el modal
        if (updateSearchParam || createSearchParam) {
            onOpen();
        }
    }, [updateSearchParam, createSearchParam, onOpen]); // Asegúrate de pasar dependencias correctas

    return (
        <Modal
            className="dark"
            isOpen={isOpen}
            onOpenChange={onOpenChange}
            isDismissable={false}
            isKeyboardDismissDisabled={true}
        >
            <ModalContent>
                {(onClose) => (
                    <>
                        <ModalHeader className="flex flex-col gap-1">{title}</ModalHeader>
                        <ModalBody>
                            <div className="flex flex-col gap-2 items-center justify-center">
                                <p>{message}</p>
                                <FontAwesomeIcon
                                    icon={faCheckCircle}
                                    className={`mt-6 mb-6 text-3xl ${
                                        createSearchParam ? "text-green-600" : "text-blue-600"
                                    }`}
                                />
                            </div>
                        </ModalBody>
                    </>
                )}
            </ModalContent>
        </Modal>
    );
};