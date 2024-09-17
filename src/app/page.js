"use client"
import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHelmetSafety, faLightbulb, faWrench, faPaperPlane } from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState, useRef, } from "react";
import { throttle } from 'lodash';
import debounce from 'lodash.debounce';
import { motion, useAnimation, useInView } from "framer-motion";

export default function Home() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const sectionsRef = useRef([]);
  const scrollingRef = useRef(false);

  const quienesSomosRef = useRef(null);
  const serviciosRef = useRef(null);
  const proyectosRef = useRef(null);

  const isProyectosInView = useInView(proyectosRef, { once: false, threshold: 0.1 });
  const isServiciosInView = useInView(serviciosRef, { once: false, threshold: 0.1 });
  const isQuienesSomosInView = useInView(quienesSomosRef, { once: false, threshold: 0.1 });

  const createSectionVariants = (direction) => {
    return {
      hidden: { opacity: 0, x: direction === 'left' ? -300 : 300 },
      visible: {
        opacity: 1,
        x: 0,
        transition: {
          duration: 0.6,
          type: "Inertia",
          stiffness: 400
        }
      },
      exit: { opacity: 0, x: direction === 'left' ? 300 : -300 }
    };
  };

  useEffect(() => {
    const handleScroll = throttle(() => {
      if (scrollingRef.current) return;

      const scrollPosition = window.scrollY;
      const windowHeight = window.innerHeight;

      let newIndex = sectionsRef.current.findIndex((section) => {
        if (!section) return false;
        const rect = section.getBoundingClientRect();
        return rect.top <= windowHeight / 2 && rect.bottom >= windowHeight / 2;
      });

      if (newIndex !== -1 && newIndex !== currentIndex) {
        setCurrentIndex(newIndex);

      }
    }, 100);

    const handleWheel = (e) => {
      e.preventDefault();
      if (scrollingRef.current) return;

      const delta = e.deltaY;
      let newIndex = currentIndex;

      if (delta > 0 && currentIndex < sectionsRef.current.length - 1) {
        newIndex = currentIndex + 1;
      } else if (delta < 0 && currentIndex > 0) {
        newIndex = currentIndex - 1;
      }

      if (newIndex !== currentIndex) {
        scrollingRef.current = true;
        scrollToSection(newIndex);
        setCurrentIndex(newIndex);
        setTimeout(() => {
          scrollingRef.current = false;
        }, 300);
      }
    };

    window.addEventListener("scroll", handleScroll);
    window.addEventListener("wheel", handleWheel, { passive: false });
    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("wheel", handleWheel);
    };
  }, [currentIndex]);

  const scrollToSection = (index) => {
    if (index >= 0 && index < sectionsRef.current.length) {
      const section = sectionsRef.current[index];
      if (section && typeof section.scrollIntoView === 'function') {
        section.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    }
  };

  return (
    <div className="flex flex-col items-center justify-start bg-gray-900 text-white">

      {/* Sección Inicio */}
      <section ref={(el) => (sectionsRef.current[0] = el)} className="min-h-screen flex flex-col items-center justify-center p-6">
        <div className="text-center mb-16 p-6">
          <Image
            className="mx-auto mb-6"
            src="/logo2.png"
            width={300}
            height={300}
            alt="Electricidad Total Logo"
          />
          <p className="text-2xl text-slate-300 mt-4 font-light max-w-xl mx-auto">
            Bienvenido a Electricidad Total, su socio confiable en soluciones eléctricas.
          </p>
        </div>
      </section>

      {/* Sección ¿Quiénes somos? */}
      <motion.section

        ref={(el) => {
          sectionsRef.current[1] = el;
          quienesSomosRef.current = el;
        }}
        variants={createSectionVariants('left')} 
        initial="hidden"

        animate={isQuienesSomosInView ? "visible" : "hidden"}
        className="min-h-screen w-full max-w-4xl px-4 flex items-center justify-center"
      >

        <div className=" flex flex-col items-center justify-center bg-slate-800 bg-opacity-20 p-12 rounded-3xl shadow-2xl">
          <Image src={"/info.png"} width={80} className="mb-6" height={80} alt={"Electricidad Total"} />
          <h2 className="text-4xl font-extrabold text-slate-100 mb-8 text-center">¿Quiénes somos?</h2>
          <p className="text-slate-200 text-center text-lg md:text-xl leading-relaxed">
            Electricidad Total, con más de x años en el sector, se especializa en redes eléctricas en media tensión.
            Ofrecemos soluciones integrales y personalizadas, garantizando calidad y seguridad.
          </p>
        </div>
      </motion.section>

      {/* Sección Servicios */}
      <motion.section
        ref={(el) => {
          sectionsRef.current[2] = el;
          serviciosRef.current = el;
        }}
        variants={createSectionVariants('right')} 
        initial="hidden"
        animate={isServiciosInView ? "visible" : "hidden"}
        className="min-h-screen w-full max-w-7xl flex items-center justify-center p-6">
        <div className="bg-slate-800 bg-opacity-40 p-10 rounded-xl shadow-xl">
          <h2 className="text-4xl font-bold text-slate-200 mb-10 text-center">Nuestros Servicios</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-4">
            {[
              {
                icon: faLightbulb,
                title: "Instalaciones Eléctricas",
                description: "Ofrecemos instalaciones eléctricas completas, incluyendo redes en media tensión. Desde el diseño, planificación hasta la ejecución y supervisión con tecnología avanzada."
              },
              {
                icon: faWrench,
                title: "Mantenimiento Eléctrico",
                description: "Realizamos mantenimiento preventivo y correctivo en sistemas eléctricos, incluyendo redes en media tensión. Inspecciones, reparaciones y ajustes de sistemas electrónicos."
              },
              {
                icon: faHelmetSafety,
                title: "Obra Civil",
                description: "Especialistas en obra civil para instalaciones eléctricas, incluyendo redes en media tensión. Trabajamos con tecnología avanzada para garantizar una solución integral para tus necesidades."
              },
            ].map((service, index) => (
              <div key={index} className="space-y-4 cursor-pointer">
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  className="flex flex-col h-[250px] w-full items-center justify-center bg-gray-900 p-6 rounded-lg shadow-lg transition-transform duration-300 hover:scale-105 overflow-hidden">
                  <FontAwesomeIcon icon={service.icon} className="text-green-400 text-5xl mb-4" />
                  <p className="text-slate-300 text-center text-lg font-semibold">{service.title}</p>
                </motion.div>
                <div className="bg-slate-600 p-6 rounded-lg shadow-lg">
                  <p className="text-white text-center text-lg font-light">{service.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Sección Proyectos */}
      <motion.section 
        ref={(el) => {
          sectionsRef.current[3] = el;
          proyectosRef.current = el;
        }}
      variants={createSectionVariants('left')}
      initial="hidden"
      animate={isProyectosInView ? "visible" : "hidden"}
      className="min-h-screen w-full max-w-7xl flex items-center justify-center p-6">
        <div className="p-8 rounded-xl">
          <h2 className="text-4xl font-bold text-slate-200 mb-10 text-center">Proyectos Realizados</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-[100px]">
            {[
              { src: "/1.jpeg", alt: "Proyecto 1", title: "Instalación de Red MT" },
              { src: "/2.jpeg", alt: "Proyecto 2", title: "Mantenimiento Eléctrico Industrial" },
              { src: "/5.jpeg", alt: "Proyecto 3", title: "Obra Civil Eléctrica" },
            ].map((project, index) => (
              <div key={index} className="group bg-slate-800 bg-opacity-40  w-[400px]  pb-6 rounded-lg shadow-xl overflow-hidden transition-transform transform hover:scale-105 cursor-pointer">
                <div className="relative ">
                  <Image
                    src={project.src}
                    width={600}
                    height={450}
                    alt={project.alt}
                    className="w-[600px] h-[350px] object-cover rounded-lg"
                  />
                  <div className="absolute bg-slate-800 bg-opacity-40"></div>
                </div>
                <p className="text-slate-300 text-center text-xl font-semibold mt-4">{project.title}</p>
              </div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Sección Contáctenos */}
      <section ref={(el) => (sectionsRef.current[4] = el)} className=" w-full max-w-7xl flex items-center justify-center p-6">
        <div className="p-8 rounded-xl">
          <h2 className="text-4xl font-bold text-slate-200 mb-8 text-center">Contáctenos</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="flex flex-col justify-center text-slate-300">
              <p className="text-lg text-left mb-4">
                Si tiene alguna pregunta o desea obtener más información sobre nuestros servicios, no dude en ponerse en contacto con nosotros. Estamos aquí para ayudarle y responder a todas sus inquietudes.
              </p>
              <p className="text-lg text-left">
                Complete el formulario a la derecha y nos pondremos en contacto con usted a la mayor brevedad posible.
              </p>
            </div>
            <div className="flex flex-col justify-center bg-slate-800 p-6 rounded-lg shadow-lg">
              <form className="flex flex-col gap-6">
                <div className="w-full">
                  <label className="block text-slate-200 mb-2 font-semibold">Nombre</label>
                  <input
                    type="text"
                    placeholder="Escriba su nombre"
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
                <button
                  type="submit"
                  className="bg-blue-600 hover:bg-blue-700 transition duration-300 text-white font-bold py-3 px-6 rounded-lg flex items-center justify-center"
                >
                  Enviar <FontAwesomeIcon icon={faPaperPlane} className="ml-2" />
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      <div className="fixed right-4 top-1/2 transform -translate-y-1/2">
        {[0, 1, 2, 3, 4].map((index) => (
          <button
            key={index}
            onClick={() => scrollToSection(index)}
            className={`block w-3 h-3 rounded-full my-2 ${currentIndex === index ? "bg-main-orange" : "bg-gray-500"
              }`}
          />
        ))}
      </div>
    </div>
  );
}