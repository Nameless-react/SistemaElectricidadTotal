
import { Modal, ModalHeader, ModalBody, ModalContent, useDisclosure } from "@nextui-org/modal";
import { UploadImage } from "../images/formImages";
import { handleImageChange, handleImageRemove } from "../../functions/handles/formHandles";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPencil } from "@fortawesome/free-solid-svg-icons";
import { useSession } from "next-auth/react";
export default function EditImageModal({ title, classNames = {
    base: "",
    button: "",
    span: "",
    modal: "",
    modal_header: "",
    modal_body: "",
} }) {
    const { isOpen, onOpen, onOpenChange } = useDisclosure();
    const [formData, setFormData] = useState({});
    const [imagePreview, setImagePreview] = useState(null);
    const [errors, setErrors] = useState([]);
    const [serverErrors, setServerErrors] = useState([]);

    const handleImageSubmit = (e) => {
        e.preventDefault();
        const formToSend = new FormData();
        formToSend.append("image", formData.image);
        const response = fetch(`/api/auth/profile/updateImage`, {
            method: "POST",
            body: formToSend
        });
        if (!response.ok) {
            setServerErrors("Error al subir imagen");
        }
        window.location.reload();
    }

    return (
        <div>
            <div className={classNames.base}>
                <button
                    aria-label="Edit profile picture"
                    role="button"
                    className={classNames.button}
                    onClick={onOpen}
                >
                    <FontAwesomeIcon size="lg" icon={faPencil} />
                    <span className={classNames.span}>
                        {title}
                    </span>
                </button>

                <Modal
                    className={classNames.modal}
                    isOpen={isOpen}
                    onOpenChange={onOpenChange}
                    isDismissable={false}
                    isKeyboardDismissDisabled={true}
                >
                    <ModalContent>
                        <ModalHeader className={classNames.modal_header}>{title}</ModalHeader>
                        <ModalBody
                            className={classNames.modal_body}
                        >
                            <UploadImage
                                className='flex flex-col items-center'
                                formData={formData}
                                setFormData={setFormData}
                                imagePreview={imagePreview}
                                setImagePreview={setImagePreview}
                                setErrors={setErrors}
                                errors={errors}
                                handleImageChange={handleImageChange}
                                handleImageRemove={handleImageRemove}
                            />
                            {
                                formData.image &&
                                <form
                                    onSubmit={handleImageSubmit}
                                >

                                    <button
                                        type="submit"
                                        className="bg-blue-700 hover:bg-blue-800 w-1/4 mx-auto text-white font-bold py-2 px-4 rounded">
                                        Guardar
                                    </button>
                                </form>
                            }

                        </ModalBody>
                    </ModalContent>
                </Modal>
            </div>
        </div>
    );
};