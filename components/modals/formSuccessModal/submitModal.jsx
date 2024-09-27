import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Modal, ModalHeader, ModalBody, ModalContent } from "@nextui-org/modal";
import { Button } from "@nextui-org/button";


export const SubmitModal = ({ isOpen, onOpenChange, action, title, message, onSubmit, classNameButton = "" }) => {
    return (
        <Modal
            isOpen={isOpen}
            onOpenChange={onOpenChange}
            isDismissable={false}
            isKeyboardDismissDisabled={true}
            className="dark"
        >
            <ModalContent>
                {(onClose) => (
                    <>
                        <ModalHeader className="flex flex-col gap-1">{title}</ModalHeader>
                        <ModalBody>
                            <div className="flex flex-col gap-2 items-center justify-center">
                                <p className="mb-6 text-center">{message}</p>
                                <div className="flex justify-end items-center gap-2 w-full">
                                    <Button
                                        className="bg-blue-700 hover:bg-blue-800 transition duration-300 ease-in-out text-white font-bold rounded-lg flex items-center justify-center w-8 h-8"
                                        onPress={onClose}
                                    >
                                        Cancelar
                                    </Button>
                                    <Button
                                        className={classNameButton}
                                        onClick={() => {
                                            onSubmit();
                                            onClose();
                                        }}
                                    >
                                        {action}
                                    </Button>
                                </div>
                            </div>
                        </ModalBody>
                    </>
                )}
            </ModalContent>
        </Modal>
    );
};