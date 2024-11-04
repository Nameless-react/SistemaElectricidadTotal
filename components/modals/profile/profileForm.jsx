
import { Modal, ModalHeader, ModalBody, ModalContent, useDisclosure } from "@nextui-org/modal";
import { ProfileFormProvider } from "../../profile/compound_components/context/profileFormContext";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPencil } from "@fortawesome/free-solid-svg-icons";
import { useSession } from "next-auth/react";
import { ProfileFormAddress, ProfileFormContainer, ProfileFormFirstSurName, ProfileFormName, ProfileFormPhone, ProfileFormSecondSurName } from "../../profile/compound_components/profileForm";
import { Button } from "@nextui-org/button";
export default function UpdateProfileForm({ title, user,  classNames = {
    base: "",
    modal: "",
    modal_header: "",
    modal_body: "",
    button: "",
} }) {

    const { isOpen, onOpen, onOpenChange } = useDisclosure();
    return (
        <div>
            <div className={classNames.base}>
                <button
                    aria-label="Edit profile picture"
                    role="button"
                    className={classNames.button}
                    onClick={onOpen}
                >
                    Editar
                </button>
                <Modal
                    className={classNames.modal}
                    isOpen={isOpen}
                    onOpenChange={onOpenChange}
                    isDismissable={false}
                    isKeyboardDismissDisabled={true}
                >
                    <ModalContent>
                        <ModalHeader className={classNames.modal_header}>Actualizar tu Perfil</ModalHeader>
                        <ModalBody
                            className={classNames.modal_body}
                        >
                            <ProfileFormProvider user={user}  >
                                <ProfileFormContainer classNames={
                                    {
                                        base: "m-4",
                                        form: "flex flex-col w-full justify-center gap-5",
                                    }
                                }>
                                    <ProfileFormName />
                                    <ProfileFormFirstSurName />
                                    <ProfileFormSecondSurName />
                                    <ProfileFormPhone />
                                    <ProfileFormAddress />
                                    <Button type="submit" className="mt-4 bg-blue-600 hover:bg-blue-800 transition  ">
                                        Actualizar
                                    </Button>
                                </ProfileFormContainer>
                            </ProfileFormProvider>
                        </ModalBody>
                    </ModalContent>
                </Modal>
            </div>
        </div>
    );
};