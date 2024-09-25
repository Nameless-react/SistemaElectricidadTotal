"use client"
import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState, useRef, } from "react";
import { throttle } from 'lodash';
import { motion, useInView } from "framer-motion";
import services from "/shared/services";
import projects from "/shared/projects";
import ContactForm from "/components/others/ContactForm";

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

    const servicesTemplate = services.map((service, index) => (
        <div key={index} className="cursor-pointer w-full min-h-full">
            <motion.div
                whileHover={{ scale: 1.05 }}
                className="transition-transform duration-300 hover:scale-105 overflow-hidden">
                    <div className="rounded-t-lg flex flex-col min-h-70 w-full items-center justify-centershadow-sm bg-blue-600 p-4 shadow-lg">
                        <FontAwesomeIcon icon={service.icon} className="text-green-400 text-5xl mb-4" />
                        <p className="text-slate-300 text-center text-lg font-semibold">{service.title}</p>
                    </div>
                <div className="bg-slate-800 p-6 rounded-b-lg shadow-lg min-h-72">
                    <p className="text-white text-center text-lg font-light min-h-full">{service.description}</p>
                </div>
            </motion.div>
        </div>
    ))

    const projectsTemplate = projects.map((project, index) => (
        <div key={index} className="group bg-slate-800 bg-opacity-40 pb-6 rounded-lg shadow-xl transition-transform transform hover:scale-105 cursor-pointer">
            <div className="relative w-full">
                <Image
                    src={project.src}
                    width={600}
                    height={450}
                    alt={project.alt}
                    className="w-full h-[350px] object-cover rounded-t-lg"
                />
            </div>
            <p className="text-slate-300 text-center text-xl font-semibold mt-4">{project.title}</p>
        </div>
    ))


    useEffect(() => {
        const handleScroll = throttle(() => {
            if (scrollingRef.current) return;

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
        <div className="flex flex-col items-center justify-start bg-gray-900 text-white overflow-hidden">

            {/* Home Section */}
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

            {/* About us Section */}
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

                <div className="flex flex-col items-center justify-center bg-slate-800 bg-opacity-20 p-12 rounded-3xl shadow-2xl">
                    <Image src="/info.png" width={80} className="mb-6" height={80} alt={"Electricidad Total"} />
                    <h2 className="text-4xl font-extrabold text-slate-100 mb-8 text-center">¿Quiénes somos?</h2>
                    <p className="text-slate-200 text-center text-lg md:text-xl leading-relaxed">
                        Electricidad Total, con más de x años en el sector, se especializa en redes eléctricas en media tensión.
                        Ofrecemos soluciones integrales y personalizadas, garantizando calidad y seguridad.
                    </p>
                </div>
            </motion.section>

            {/* Services Section */}
            <motion.section
                ref={(el) => {
                    sectionsRef.current[2] = el;
                    serviciosRef.current = el;
                }}
                variants={createSectionVariants('right')}
                initial="hidden"
                animate={isServiciosInView ? "visible" : "hidden"}
                className="min-h-screen w-full flex items-center justify-center p-6">
                <div className="bg-opacity-40 p-10 rounded-xl">
                    <h2 className="text-4xl font-bold text-slate-200 mb-10 text-center">Nuestros Servicios</h2>
                    <div className="max-lg:grid-cols-1 grid grid-cols-3 max-lg:w-3/5 gap-20 mt-4 mx-auto">
                        {servicesTemplate}
                    </div>
                </div>
            </motion.section>

            {/* Projects Section */}
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
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-20 w-full">
                        {projectsTemplate}
                    </div>
                </div>
            </motion.section>

            {/* Contact Section */}
            <section ref={(el) => (sectionsRef.current[4] = el)} className="w-full max-w-7xl flex items-center justify-center p-6 mb-60">
                <ContactForm />
            </section>

            <div className="fixed right-4 top-1/2 transform -translate-y-1/2">
                {[0, 1, 2, 3, 4].map(index => (
                    <button key={index} onClick={() => scrollToSection(index)} className={`block w-3 h-3 rounded-full my-2 ${currentIndex === index ? "bg-main-orange" : "bg-gray-500"}`}/>
                ))}
            </div>
        </div>
    );
}