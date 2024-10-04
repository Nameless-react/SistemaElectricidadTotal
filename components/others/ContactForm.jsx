import { faPaperPlane } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function ContactForm() {
    return (
        <div className="p-8 rounded-xl">
            <h2 className="text-4xl font-bold text-slate-200 mb-8 text-center">Contáctenos</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="flex flex-col justify-start text-slate-300">
                    <p className="text-lg text-left1 mb-4">
                        Si tiene alguna pregunta o desea obtener más información sobre nuestros servicios, no dude en ponerse en contacto con nosotros. Estamos aquí para ayudarle y responder a todas sus inquietudes.
                    </p>
                    <p className="text-left text-lg">
                        Complete el formulario a la derecha y nos pondremos en contacto con usted a la mayor brevedad posible.
                    </p>
                </div>
                <div className="flex flex-col justify-center bg-slate-800 p-6 rounded-lg shadow-lg">
                    <form className="flex flex-col gap-6">
                        <div className="w-full">
                            <label className="block text-slate-200 mb-2 font-semibold">Correo</label>
                            <input
                                type="email"
                                placeholder="Escriba su correo"
                                className="w-full bg-gray-800 text-white border border-gray-700 rounded-lg py-2 px-4 focus:outline-none focus:ring-2 focus:ring-blue-600"
                            />
                        </div>
                        <div className="w-full">
                            <label className="block text-slate-200 mb-2 font-semibold">Asunto</label>
                            <input
                                type="text"
                                placeholder="Asunto"
                                className="w-full bg-gray-800 text-white border border-gray-700 rounded-lg py-2 px-4 focus:outline-none focus:ring-2 focus:ring-blue-600"
                            />
                        </div>
                        <div className="w-full">
                            <label className="block text-slate-200 mb-2 font-semibold">Mensaje</label>
                            <textarea
                                placeholder="Escriba su mensaje aquí..."
                                className="w-full bg-gray-800 text-white border border-gray-700 rounded-lg py-2 px-4 focus:outline-none focus:ring-2 focus:ring-blue-600"
                                rows="6"
                            />
                        </div>
                        <button type="submit" className="bg-blue-600 hover:bg-blue-700 transition duration-300 text-white font-bold py-3 px-6 rounded-lg flex items-center justify-center">
                            Enviar
                            <FontAwesomeIcon icon={faPaperPlane} className="ml-2" />
                        </button>
                    </form>
                </div>
            </div>
        </div>
    )
}