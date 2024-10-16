import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Modal, ModalHeader, ModalBody, ModalContent, useDisclosure } from "@nextui-org/modal";
import { useEffect } from "react";
import { faCheckCircle } from "@fortawesome/free-solid-svg-icons";
export const SuccessModal = ({ updateSearchParam = false, createSearchParam = false, deleteSearchParam = false, router, title, message, onModalClose }) => {
    const { isOpen, onOpen, onOpenChange } = useDisclosure();

    useEffect(() => {
        console.log(updateSearchParam, createSearchParam, deleteSearchParam);

        if (updateSearchParam || createSearchParam || deleteSearchParam) {
            onOpen();
        }
    }, [updateSearchParam, createSearchParam, deleteSearchParam, onOpen]);
    const handleClose = (value) => {
        onOpenChange(value);
        if (!value) {
            onModalClose();
        }
    };


    return (
        <Modal
            className="dark"
            isOpen={isOpen}
            onOpenChange={handleClose}
            isDismissable={false}
            isKeyboardDismissDisabled={true}
        >
            <ModalContent>
                <ModalHeader className="flex flex-col gap-1">{title}</ModalHeader>
                <ModalBody>
                    <div className="flex flex-col gap-2 items-center justify-center">
                        <p>{message}</p>
                        <FontAwesomeIcon
                            icon={faCheckCircle}
                            className={`mt-6 mb-6 text-3xl ${createSearchParam || deleteSearchParam ? "text-green-600" : "text-blue-600"}`}
                        />
                    </div>
                </ModalBody>
            </ModalContent>
        </Modal>
    );
};