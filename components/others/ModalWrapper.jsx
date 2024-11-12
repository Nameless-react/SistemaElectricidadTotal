import { Modal, ModalContent, ModalHeader, ModalBody, useDisclosure } from "@nextui-org/modal";
import { Button } from "@nextui-org/button";

export default function ModalWrapper({ children, modalTitle, buttonComponent, modalSize, backdrop, classNameButton, colorButton, variantButton }) {
    const { isOpen, onOpen, onOpenChange } = useDisclosure();

    return (
        <>
            <Button color={colorButton} variant={variantButton} className={classNameButton || "max-w-10 outline-none bg-green-700 text-xl"} onPress={onOpen}>
                {buttonComponent || "+"}
            </Button>

            <Modal size={modalSize || "2xl"} backdrop={backdrop || "blur"} className="dark z-auto" isOpen={isOpen} onOpenChange={onOpenChange}>
                <ModalContent>
                    {(onClose) => (
                        <>
                            <ModalHeader className="flex flex-col gap-1 font-bold px-12">{modalTitle}</ModalHeader>
                            <ModalBody className="p-12 pt-6">
                                {children({ onClose, isOpen })}
                            </ModalBody>
                        </>
                    )}
                </ModalContent>
            </Modal>
        </>
    );
}