
import { Avatar } from "@nextui-org/avatar";
import { useProfile } from "./context/profileConterxt"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope, faPhone, faMapMarkerAlt, faEdit, faPencil } from "@fortawesome/free-solid-svg-icons";
import EditImageModal from "../../modals/editImageModal";
import UpdateProfileForm from "../../modals/profile/profileForm";
import { useEffect } from "react";
export const ProfileContainer = ({ children, className = "" }) => {
    return (
        <div className={className}>
            {children}
        </div>
    )
}

/**
 * Component that renders the user's profile image.
 *
 * It takes a size and a className as props.
 * The size can be "xs", "sm", "md", "lg", or "xl".
 * The className is the CSS class for the container of the image.
 *
 * The component renders an Avatar component from nextui-org.
 * The Avatar component is bordered, has a color of warning, and is sized according to the provided size.
 * The src of the Avatar is the user's profile image, or a default image if the user doesn't have one.
 * The alt of the Avatar is the user's name, or "user" if the user doesn't have one.
 *
 * The component also renders a button with an edit icon, which is a pencil icon to edit the profile picture of the user.
 * The button is positioned absolutely on top of the image and has a background color of blue-700.
 * The button has a hover effect that changes the background color to blue-800.
 * The button is rounded and has a padding of 2px.
 * The button is a button element with an aria-label of "Edit profile picture" and a role of button.
 */

/**
 * Component that renders the user's profile image with an editable option.
 *
 * Props:
 * @param {string} className - CSS classes to style the image container.
 * @param {string} size - Size of the Avatar, options include "xs", "sm", "md", "lg", "xl". Default is "xl".
 *
 * The component uses the user's data to display their profile image. 
 * If the user does not have an image, a default image is shown.
 * The Avatar is bordered and has a warning color.
 * An EditImageModal is provided to allow the user to change their profile picture.
 */
export const ProfileImage = ({ className = "", size = "xl" }) => {
    const { userData, serverError, setServerError } = useProfile();

    return (
        <>
            <div className="relative inline-block">
                <Avatar
                    isBordered
                    color="warning"
                    size={size}
                    className={className}
                    src={userData.image ? userData.image : "/noProfile.png"}
                    alt={`Profile image of ${userData.name || "user"}`}
                />
                <EditImageModal
                    title={"Editar foto de perfil"}
                    setServerError={setServerError}
                    serverError={serverError}
                    classNames={{
                        base: "flex flex-col items-center justify-center absolute md:top-16  md:right-2 top-16 right-5 bg-blue-700 hover:bg-blue-800 p-2 transition duration-300 ease-in-out rounded-full",
                        button: "relative group",
                        span: "absolute bottom-full mb-2 hidden group-hover:flex w-max bg-gray-700 transition duration-300 ease-in-out text-white text-sm rounded-md shadow-md px-2 py-1",
                        modal: "dark",
                        modal_header: "",
                        modal_body: "mb-5",
                    }}
                />

            </div>
        </>
    );
}

export const ProfileName = ({ className = "" }) => {
    const { userData } = useProfile();
    return (
        <h2 className={className}>{userData.name + " " + userData.firstsurname}</h2>
    )
}

export const ProfileEmail = ({ classNames = {} }) => {
    const { userData } = useProfile();
    return (
        <section className={classNames?.base}>
            <h2 className={classNames?.label}>
                Correo electrónico
            </h2>
            <p className={classNames?.value}>{userData.email ? userData.email : "Dirección no disponible"}</p>
        </section>
    )
}

export const ProfilePhone = ({ classNames = {
    base: "",
    label: "",
    icon: "",
    value: ""
} }) => {
    const { userData } = useProfile();
    return (
        <section className={classNames?.base}>
            <h2 className={classNames?.label}>
                <FontAwesomeIcon icon={faPhone} className={classNames?.icon} />
                Teléfono
            </h2>
            <p className={classNames?.value}>{userData.phone}</p>
        </section>
    )
}

export const ProfileAddress = ({ classNames = {
    base: "",
    label: "",
    icon: "",
    value: ""
} }) => {
    const { userData } = useProfile();
    return (
        <section className={classNames?.base}>
            <h2 className={classNames?.label}>
                Dirección
            </h2>
            <p className={classNames?.value}>{userData.address ? userData.address : "Dirección no disponible"}</p>
        </section>
    )
}

export const ProfileOptions = ({ classNames = {
    base: "",
    label: "",
    icon: "",
    value: "",
    button: ""
} }) => {
    const { userData } = useProfile();
    return (

        <>
            <section className={classNames?.base}>
                <h2 className={classNames?.label}>
                    <FontAwesomeIcon icon={faEdit} className={classNames?.icon} />
                    Editar Perfil
                </h2>
                <p className={classNames?.value}>Puedes actualizar tu información personal desde aquí.</p>
                <UpdateProfileForm
                 
                    user={userData}
                    classNames={{ modal: "dark", modal_header: "mt-2", button: classNames.button }}
                />
            </section>
        </>
    )

}








