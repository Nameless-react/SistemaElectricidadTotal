"use client"
import { useSearchParams, useRouter } from "next/navigation";
import { SuccessModal } from "./formSuccessModal/successModal";
import { useEffect } from "react";

export default function PassSucessModal(
    {
        titles = {
            update: "Material actualizado",
            create: "Material creado",
            delete: "Material eliminado",
            createEquipment: "Equipo creado"
        },
        messages= {
            update: "Material actualizado exitosamente",
            create: "Material creado exitosamente",
            delete: "Material eliminado exitosamente",
            createEquipment: "Material guardado exitosamente"
        }
    }
) {
    const router = useRouter();
    const searchParams = useSearchParams();
    const updateSuccess = searchParams.get("updateSuccess");
    const createSuccess = searchParams.get("createSuccess");
    const deleteSuccess = searchParams.get("deleteSuccess");


    const handleOnModalClose = () => {
        const newSearchParams = new URLSearchParams(window.location.search);
        if (updateSuccess) newSearchParams.delete("updateSuccess");
        if (createSuccess) newSearchParams.delete("createSuccess");
        if (deleteSuccess) newSearchParams.delete("deleteSuccess");

        if (newSearchParams.toString() !== "") {
            router.replace(`${window.location.pathname}?${newSearchParams.toString()}`);
        } else {
            router.replace(window.location.pathname);
        }
    }

    return (
        <SuccessModal
            title={updateSuccess ? titles.update : createSuccess ? titles.create : deleteSuccess ? titles.delete : titles.createEquipment}
            message={
                updateSuccess ? messages.update :
                    createSuccess ? messages.create :
                        deleteSuccess ? messages.delete :
                            messages.createEquipment
            }
            onModalClose={handleOnModalClose}
            router={router}
            updateSearchParam={updateSuccess}
            createSearchParam={createSuccess}
            deleteSearchParam={deleteSuccess}
        />
    )
}