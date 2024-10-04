import { DatePicker } from "@nextui-org/date-picker";
import { TimeInput } from "@nextui-org/date-input"
import { getLocalTimeZone, today, Time } from "@internationalized/date";
import { I18nProvider } from "@react-aria/i18n";


export default function DateAppointment() {
    // Lógica para quitar fechas y horas ocupadas y validaciones
    

    return (
        <div className="w-2/3 flex justify-center gap-4 items-center">
            <div className="dark w-1/2 justify-center">
                <I18nProvider locale="cr">
                    <DatePicker
                        label="Fecha"
                        shouldForceLeadingZeros
                        isRequired
                        dateInputClassNames={{
                            input: "items-center",
                        }}
                        minValue={today(getLocalTimeZone())}
                        defaultValue={today(getLocalTimeZone())}
                        className="items-center"
                        classNames={{
                            calendar: "dark",
                            popoverContent: "dark",
                        }}
                    />
                </I18nProvider>
            </div>
    
            <div className="dark w-1/2 items-center">
                <TimeInput 
                    minValue={new Time(7)}
                    hourCycle={24}
                    maxValue={new Time(17)}
                    isRequired
                    label="Hora"
                    classNames={{
                        segment: "hover:bg-slate-600 active:bg-slate-600 focus:bg-slate-600"
                    }}
                />
            </div>
        </div>
    )
}