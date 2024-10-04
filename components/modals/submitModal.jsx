import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, useDisclosure } from "@nextui-org/modal";
import { Button } from "@nextui-org/button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faQuestion } from "@fortawesome/free-solid-svg-icons";
export default function SubmitModal({
    onSubmit,
    actionValue,
    title,
    message,
    classNameModalButton = "",
    classNameSubmitButton = "",
    isWithIcon = false,
    icon = faQuestion
}) {
    const { isOpen, onOpen, onOpenChange } = useDisclosure();

    return (
        <>
            <Button size="sm" className={classNameModalButton} onPress={onOpen}>{isWithIcon ? <FontAwesomeIcon icon={icon} /> : actionValue}</Button>
            <Modal className="dark" isOpen={isOpen} onOpenChange={onOpenChange}>
                <ModalContent>
                    {(onClose) => (
                        <>
                            <ModalHeader className="flex flex-col gap-1">{title}</ModalHeader>
                            <ModalBody>
                                <p>{message}</p>
                            </ModalBody>
                            <ModalFooter>
                                <Button color="primary" size="md" onPress={onClose}>
                                    Close
                                </Button>
                                <Button color="danger" className={classNameSubmitButton} size="md" onClick={onSubmit} onPress={onClose}>
                                    {actionValue}
                                </Button>
                            </ModalFooter>
                        </>
                    )}
                </ModalContent>
            </Modal>
        </>
    );
}