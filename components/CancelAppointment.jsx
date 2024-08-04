import { Button } from "@nextui-org/button"

export default function CancelAppointment(){
    return (
        <div className="flex justify-content items-center gap-6 flex-col bg-neutral-950 py-12 px-8 w-5/6 mx-auto">
            <h1 className="font-bold text-4xl">Cancelación de Cita</h1>
            <h3>¿Desea cancelar su cita con número [insertar número] para el día [insertar fecha] a las [insertar la hora]?</h3>
            <Button color="danger" className="font-bold text-2xl px-11 py-8 mt-10">
                Cancelar
            </Button>  
        </div>
    )
}