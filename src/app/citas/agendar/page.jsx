import AppointmentForm from "/components/appointment/AppointmentForm";

//todo
// * Ver si se puede hacer un hook para manejar los estados y la traida de datos de la cita
// * Optimizar todo el módulo de citas
// * Manejar mejor los posibles errores
// * Ver que componentes se pueden pasar a server side rendering
export default async function Appointments({ params }) {
    

   
    // const [formData, setFormData] = useState({
    //     email: appointment?.email || "",
    //     address: appointment?.address || "",
    //     isInOffice: appointment?.isInOffice || false,
    //     appointmentDate: appointment?.appointmentDate || today(getLocalTimeZone()),
    //     appointmentTime: appointment?.appointmentTime || ""
    // });

    // const [errors, setErrors] = useState({
    //     address: {
    //         message: "",
    //         isInvalid: false
    //     }
    // })

    // useEffect(() => {
    //     const getAppointment = async () => {
    //         try {
                
    //             console.log(appointment);
    //             setFormData({
    //                 address: appointment.address,
    //                 isInOffice: appointment.isInOffice,
    //                 appointmentDate: parseDate(appointment.appointmentDate),
    //                 appointmentTime: parseTime(appointment.appointmentTime)
    //             })
    //         } catch (error) {
    //             //Add logic to call a notification to show the error
    //             console.error(error)
    //         }
    //     }

    //     if (id) getAppointment();
    // }, [id])


    // function handleChange(e) {
    //     setErrors({
    //         address: {
    //             message: "",
    //             isInvalid: false
    //         }
    //     })
    //     const { name, value, type, checked } = e.target;
    //     setFormData(prevFormData => ({
    //         ...prevFormData,
    //         [name]: type === "checkbox" ? checked : value
    //     }))
    // }


    // const handleClearEmail = () => setFormData(prevFormData => ({ ...prevFormData, email: "" }))


    // async function handleSubmit(e) {
    //     let response;
    //     e.preventDefault();

    //     if (id) {
    //         response = await fetch(`/api/appointments/${id}`, {
    //             method: "PATCH",
    //             headers: {
    //                 "Content-Type": "application/json"
    //             },
    //             body: JSON.stringify({
    //                 appointmentDate: formData.appointmentDate.toString(),
    //                 appointmentTime: formData.appointmentTime.toString(),
    //                 isInOffice: formData.isInOffice,
    //                 address: formData.address
    //             })
    //         })
    //     } else {
    //         response = await fetch("/api/appointments", {
    //             method: "POST",
    //             headers: {
    //                 "Content-Type": "application/json"
    //             },
    //             body: JSON.stringify({
    //                 ...formData,
    //                 appointmentDate: formData.appointmentDate.toString(),
    //                 appointmentTime: formData.appointmentTime.toString()
    //             })
    //         })
    //     }

        
    //     setFormData({
    //         email: "",
    //         address: "",
    //         isInOffice: false,
    //         appointmentDate: today(getLocalTimeZone()),
    //         appointmentTime: ""
    //     })
    //     // Use when we want to show the message (notification) from the api to the user
    //     const result = await response.json();
    //     setErrors({
    //         ...errors,
    //         address: {
    //             message: result.error[0].message,
    //             isInvalid: true
    //         }
    //     })
    // }
    // <AddressField appointment={appointment} />

    return (
        <AppointmentForm />
    )
}