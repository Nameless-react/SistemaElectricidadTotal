"use client"
import { DatePicker } from "@nextui-org/date-picker";
import { TimeInput } from "@nextui-org/date-input"
import { I18nProvider } from "@react-aria/i18n";
import { getLocalTimeZone, today, Time, parseDate, parseTime } from "@internationalized/date";
import { Controller } from "react-hook-form";

export default function DateAppointment({ errors, control }) {

    return (
        <div className="w-2/3 flex justify-center gap-4 items-center">
            <div className="dark w-1/2 justify-center">
                <I18nProvider locale="cr">
                <Controller
                        control={control}
                        name="appointmentDate"
                        render={({ field: { onChange, onBlur, value } }) => (
                            <DatePicker
                                label="Fecha"
                                shouldForceLeadingZeros
                                isRequired
                                dateInputClassNames={{
                                    input: "items-center",
                                }}
                                minValue={today(getLocalTimeZone())}
                                className="items-center"
                                classNames={{
                                    calendar: "dark",
                                    popoverContent: "dark",
                                }}
                                onChange={e => onChange(parseDate(e))}
                                onBlur={onBlur}
                                defaultValue={value} 
                                isInvalid={!!errors?.appointmentDate} 
                                errorMessage={errors?.appointmentDate?.message}
                            />
                        )}
                    />
                </I18nProvider>
            </div>
    
            <div className="dark w-1/2 items-center">
                <Controller
                    control={control}
                    name="appointmentTime"
                    render={({ field: { onChange, onBlur, value } }) => (
                        <TimeInput 
                            minValue={new Time(7)}
                            hourCycle={24}
                            maxValue={new Time(17)}
                            isRequired
                            label="Hora"
                            classNames={{
                                segment: "hover:bg-slate-600 active:bg-slate-600 focus:bg-slate-600"
                            }}
                            onChange={e => onChange(parseTime(e))}
                            onBlur={onBlur}
                            defaultValue={value} 
                            isInvalid={!!errors?.appointmentTime} 
                            errorMessage={errors?.appointmentTime?.message} 
                        />
                    )}
                />
            </div>
        </div>
    )
}