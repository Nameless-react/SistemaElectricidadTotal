import { Modal, ModalHeader, ModalBody, ModalContent, ModalFooter } from "@nextui-org/modal";
import { Button } from "@nextui-org/button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
export default SubmitModal = ({
    isOpen,
    onOpen,
    onOpenChange,
    onSubmit,
    action,
    title,
    message,
    id,
    icon
}) => {
    return (
        <>
            <Button size="sm" className="bg-red-700 hover:bg-red-800" color="danger" onPress={onOpen}><FontAwesomeIcon icon={icon} /></Button>
            <Modal
                className="dark" isOpen={isOpen} onOpenChange={onOpenChange}>
                <ModalContent>
                    {(onClose) => (
                        <>
                            <ModalHeader className="flex flex-col gap-1">{title}</ModalHeader>
                            <ModalBody>
                                <p>{message} {id}</p>
                            </ModalBody>
                            <ModalFooter>
                                <Button color="primary" onPress={onClose}>
                                    Close
                                </Button>
                                <Button className="bg-red-700 hover:bg-red-800" onClick={onSubmit} onPress={onClose}>
                                    {action}
                                </Button>
                            </ModalFooter>
                        </>
                    )}
                </ModalContent>
            </Modal>
        </>
    );
};