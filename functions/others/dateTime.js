import { getLocalTimeZone, today, Time, parseDate, parseTime } from "@internationalized/date";


export function getDateTimeForms(appointmentDate, appointmentTime) {
    const date = new Date();
    const hourLimit = 17;
    const nextDayHour = 7;
        
    let currentTime = new Time(date.getHours(), date.getMinutes());
    let currentDate = today(getLocalTimeZone())
    if (date.getHours() >= hourLimit) {
        currentTime = new Time(nextDayHour); 
        currentDate = today(getLocalTimeZone()).add({ days: 1 }) 
    }
    
    const dateValidated = appointmentDate ? parseDate(appointmentDate) : currentDate;
    const timeValidated = appointmentTime ? parseTime(appointmentTime) : currentTime;

    return {
        date: dateValidated,
        time: timeValidated
    }
} 

export const getDateTask = (deadline) => deadline ? parseDate(deadline) : today(getLocalTimeZone()).add({ days: 1 }) 
