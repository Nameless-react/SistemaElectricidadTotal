import { faArrowRight, faPen } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Image from 'next/image';
import Link from 'next/link';

export default function Page() {
    // Ejemplo de datos de citas
    const citas = [
        { id: 1, date: '2024-08-10', description: 'Reunión con cliente A', time: '10:00 AM', direction: 'Dirección A' },
        { id: 2, date: '2024-08-12', description: 'Inspección en el sitio B', time: '12:30 PM', direction: 'Dirección B' },
        { id: 6, date: '2024-08-22', description: 'Llamada de seguimiento F', time: '12:30 PM', direction: 'Oficina Electricidad Total 300 mts Sur de la estacion de bomberos de Atenas ALajuela' },
    ];

    return (
        <div className="min-h-screen text-slate-200">
            <div className="flex flex-col justify-center items-center p-6 bg-gray-900">
                <Image width={300} height={300} src="/logo2.png" alt="Logo" />
                <h1 className="text-center text-4xl font-semibold mt-4">Citas</h1>
                <div className="flex gap-6 mt-8">
                    <div className="flex flex-col items-center">
                        <div className="flex items-center bg-green-600 hover:bg-green-700 transition duration-300 ease-in-out text-white font-semibold py-3 px-6 rounded-lg shadow-lg hover:shadow-xl cursor-pointer">
                            <Link href={'/portal-clientes/modulo-citas/agendar-cita-cliente'}>
                                <p className="text-2xl mr-2">Agendar Cita</p>
                            </Link>
                            <FontAwesomeIcon icon={faArrowRight} className="text-xl w-auto h-6" />
                        </div>
                    </div>
                </div>
            </div>
            <div className="flex flex-col justify-center items-center p-6 mb-10">
                <h2 className="text-2xl font-semibold mb-4">Mis Citas Agendadas ({citas.length})</h2>
                <div className="w-full max-w-3xl space-y-4">
                    {citas.length === 0 ? (
                        <div className="bg-red-600 hover:bg-red-700 transition duration-300 ease-in-out text-white font-semibold py-4 px-6 rounded-lg shadow-lg hover:shadow-xl cursor-pointer flex items-center justify-center text-center">
                            <p>No hay Citas agendadas</p>
                        </div>
                    ) : (
                        citas.map(cita => (
                            <div
                                key={cita.id}
                                className="flex flex-col bg-gray-700 transition duration-300 ease-in-out text-white font-semibold py-4 px-6 rounded-lg shadow-lg hover:shadow-xl"
                            >
                                <p className="text-xl font-bold mb-2">{cita.description}</p>
                                <div className="flex gap-6 mb-2">
                                    <p className="text-lg">{cita.date}</p>
                                    <p className="text-lg">{cita.time}</p>
                                </div>
                                <div className="w-full bg-gray-800 p-4 rounded-lg mb-2 overflow-auto">
                                    <p className="text-sm">{cita.direction}</p>
                                </div>
                                <div className="flex gap-4 justify-end">
                                    <Link href={"/portal-clientes/modulo-citas/editar-cita-cliente"}>
                                        <div className="flex items-center bg-blue-600 hover:bg-blue-700 transition duration-300 ease-in-out text-white font-semibold py-2 px-4 rounded-lg shadow-md hover:shadow-lg cursor-pointer">
                                            <p className="text-sm font-semibold">Cambiar</p>
                                            <FontAwesomeIcon icon={faPen} className="ml-2" />
                                        </div>
                                    </Link>
                                    <div className="flex items-center bg-red-600 hover:bg-red-700 transition duration-300 ease-in-out text-white font-semibold py-2 px-4 rounded-lg shadow-md hover:shadow-lg cursor-pointer">
                                        <p className="text-sm font-semibold">Cancelar</p>
                                    </div>
                                </div>
                            </div>
                        ))
                    )}
                </div>
            </div>
        </div>
    );
}
