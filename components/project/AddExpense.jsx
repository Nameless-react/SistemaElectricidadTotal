"use client"
import { useForm } from "react-hook-form"
import { Input, Textarea } from "@nextui-org/input"
import { Button } from "@nextui-org/button"
import { zodResolver } from "@hookform/resolvers/zod"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faCircleCheck } from "@fortawesome/free-solid-svg-icons"
import { useSession } from "next-auth/react"



export default function AddExpense() {
    const { data: session } = useSession();
    
    const { handleSubmit, control, formState: { errors, isSubmitting }, register, reset } = useForm({
        resolver: zodResolver(),
        defaultValues: {
            amount: 0,
            status: "Inactivo",
            idUser: session?.user.id,
            description: "" 
        },
        mode: "onBlur"
    })


    const onSubmit = async (teamProjectFormData) => {
        const { successMessage } = await addTeamWithEmployeesAction(teamProjectFormData);
        if (successMessage) {
            reset();
            onModalClose();
        }
    }


    return (
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col items-center justify-center gap-6">
            <Input label="Monto" {...register("amount")} isInvalid={errors?.name} errorMessage={errors?.name?.message} classNames={{ inputWrapper: "bg-[#182237] dark:hover:bg-sky-900 dark:active:bg-sky-900 dark:focus:bg-sky-900 dark:focus-within:bg-sky-900" }} />

            <Textarea label="Descripción" className="w-full" classNames={{ inputWrapper: "dark:hover:bg-sky-900 dark:active:bg-sky-900 dark:focus:bg-sky-900 dark:focus-within:bg-sky-900 bg-[#182237]" }} {...register("description")} isInvalid={errors?.description} errorMessage={errors?.description?.message} />

            <Button size="sm" className="bg-green-600 self-end text-sm text-white font-bold py-6 px-8 rounded-2xl mt-8" type="submit">
                {isSubmitting ? "Enviando..." : "Confirmar"}
                <FontAwesomeIcon className="text-xl" icon={faCircleCheck} />
            </Button>
        </form>
    )
}