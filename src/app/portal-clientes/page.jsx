import { faBell, faCalendarDay, faChalkboardUser, faCircleInfo, faEdit, faGear, faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image";
import Link from "next/link";

export default function Page() {
    return (
        <div className="flex flex-col justify-center items-center min-h-screen p-4 bg-gray-900">
            <Image width={300} height={300} src="/logo2.png" />
            <h1 className="text-center text-4xl font-semibold text-slate-200">Portal  Clientes</h1>
            <h2 className="mt-16 text-xl text-slate-300">Bienvenido John Doe</h2>
            <div className="flex gap-6 mt-12">
                <Link href="/portal-clientes/modulo-citas">
                    <div className=" flex flex-col text-2xl bg-green-600 hover:bg-green-700 transition duration-300 ease-in-out text-white font-semibold py-8 px-8 rounded-lg shadow-md hover:shadow-lg cursor-pointer flex items-center">
                        Modulo de Citas
                        <FontAwesomeIcon icon={faCalendarDay} className="text-2xl mt-1 w-auto h-6 " />
                    </div>
                </Link>
                <Link href="/portal-clientes/mis-proyectos">
                <div className="flex flex-col text-2xl bg-blue-600 hover:bg-blue-700 transition duration-300 ease-in-out text-white font-semibold py-8 px-8 rounded-lg shadow-md hover:shadow-lg cursor-pointer flex items-center">
                    Ver mis Proyectos
                    <FontAwesomeIcon icon={faChalkboardUser} className="text-2xl mt-1 w-auto h-6" />
                </div>
                </Link>
                <Link href={'/portal-clientes/perfil'}>
                <div className="flex flex-col w-[250px] text-2xl bg-blue-600 hover:bg-blue-700 transition duration-300 ease-in-out text-white font-semibold py-8 px-8 rounded-lg shadow-md hover:shadow-lg cursor-pointer flex items-center">
                   Mi  Perfil
                    <FontAwesomeIcon icon={faUser} className="text-2xl mt-1 w-auto h-6" />
                </div>
                </Link>
            </div>
            <div className="flex gap-4 mt-12">
                <Link href={"/portal-clientes/soporte"}>
                    <div className="bg-gray-600 hover:bg-gray-700 transition duration-300 ease-in-out text-white font-semibold py-2 px-4 rounded-lg shadow-md hover:shadow-lg cursor-pointer">
                        Soporte
                        <FontAwesomeIcon icon={faCircleInfo} className="ml-2 w-auto h-4 " />
                    </div>
                </Link>
                <Link href="/portal-clientes/perfil/notificaciones">

                    <div className="relative flex items-center bg-yellow-600 hover:bg-yellow-700 transition duration-300 ease-in-out text-white font-semibold py-2 px-4 rounded-lg shadow-md hover:shadow-lg cursor-pointer">
                        <span className="ml-2">Notificaciones</span>
                        <div className="relative">
                            <FontAwesomeIcon icon={faBell} className="ml-2 w-auto h-4" />
                            <div className="absolute top-0 right-0 transform translate-x-1/2 -translate-y-1/2 bg-red-600 hover:bg-red-700 transition duration-300 ease-in-out text-white px-1.5 mt-1  rounded-full shadow-md hover:shadow-lg flex items-center justify-center">
                                <p className="text-xs font-semibold">3</p>
                            </div>
                        </div>
                    </div>
                </Link>
                <div className="bg-red-600 hover:bg-red-700 transition duration-300 ease-in-out text-white font-semibold py-2 px-4 rounded-lg shadow-md hover:shadow-lg cursor-pointer">
                    Ajustes
                    <FontAwesomeIcon icon={faGear} className="ml-2 w-auto h-4" />
                </div>
            </div>
        </div>
    )
}