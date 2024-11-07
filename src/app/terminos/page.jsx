"use client"
import { format } from "@formkit/tempo";
import { Accordion, AccordionItem } from "@nextui-org/accordion";
import termsandconditions from "../../../shared/termsandconditions";


export default function Terminos() {

    return (
        <div className="w-9/12 items-center justify-center mx-auto gap-8 flex flex-col mt-6">
            <h1 className="text-center text-2xl font-bold">Terminos y Condiciones</h1>
            <p className="self-start text-sm p-3">Ultima actualizacion: {format(new Date(), "full")}<br />Bienvenido a Sistema Electricidad Total. Al utilizar nuestros servicios, aceptas los siguientes Términos y Condiciones. Por favor, léelos cuidadosamente.</p>
            <Accordion variant="splitted">
                {termsandconditions.map((section, index) => (
                    <AccordionItem key={index} aria-label="Accordion 1" title={section.tittle} classNames={{ base: "bg-[#182237]", titleWrapper: " px-10", content:"text-sm px-10 py-5"}}>
                        {section.content}
                    </AccordionItem>
                ))}
            </Accordion>
        </div>
    );
}