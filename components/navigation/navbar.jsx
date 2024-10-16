"use client"
import { Navbar, NavbarBrand, NavbarContent, NavbarItem, NavbarMenuToggle, NavbarMenu, NavbarMenuItem } from "@nextui-org/navbar";
import { Button, } from "@nextui-org/button";
import Link from "next/link";
import { useEffect, useState } from "react";
import navBarLinks from "/shared/links";
import { useSession, signOut } from "next-auth/react";
import { Logout } from "@/app/test/logut";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretDown, faBell } from "@fortawesome/free-solid-svg-icons";
import { Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, } from "@nextui-org/dropdown";
import { Avatar } from "@nextui-org/avatar";
import Image from "next/image";

export default function NavbarApp() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isMobileScreen, setIsMobileScreen] = useState(false);
    const [isInvDropdownOpen, setIsInvDropdownOpen] = useState(false);
    const [isAdmDropdownOpen, setIsAdmDropdownOpen] = useState(false);
    const { data: session, status } = useSession();
    const isAdmin = session?.user?.roles?.includes('Administrador');
    const isEmployee = session?.user?.roles?.includes('Empleado');

    const navBarLinksComponents = navBarLinks.map((item, index) => (
        <NavbarItem key={index} className={item.className}>
            <Link className={item.linkClassName} href={item.url}>
                {item.label}
            </Link>
        </NavbarItem>
    ))


    const navBarLinksComponentsMobile = navBarLinks.map((item, index) => (
        <NavbarMenuItem key={index}>
            <Link href={item.url} className="flex flex-col  items-center justify-center py-2 px-3 text-lg font-semibold hover:text-main-orange transition duration-300 ease-in-out">
                {item.label}
            </Link>
        </NavbarMenuItem>
    ))

    const handleAdminOpenChange = (isAdmDropdownOpen) => setIsAdmDropdownOpen(isAdmDropdownOpen);

    const handleInvOpenChange = (isInvDropdownOpen) => setIsInvDropdownOpen(isInvDropdownOpen);

    return (
        <Navbar maxWidth="full" className="bg-main-color border-1 border-b-1 shadow-md border-t-0 border-x-0  border-white border-opacity-10" isMenuOpen={isMenuOpen} onMenuOpenChange={setIsMenuOpen}>
            {/* Hamburger menu */}
            <NavbarContent className="lg:hidden" justify="start">
                <NavbarMenuToggle aria-label={isMenuOpen ? "Close menu" : "Open menu"} />
            </NavbarContent>

            {/* Logo */}
            <NavbarContent className="lg:flex pr-3  text-2xl" justify="start">
                <NavbarBrand className="text-xl font-semibold  py-2 px-2">
                    <Link color="foreground" href="/">
                        <Image width={64} height={64} className="inline bg-main-color" src="/logo2.png" alt="logo" />
                    </Link>
                </NavbarBrand>
            </NavbarContent>

            {/* Links */}
            <NavbarContent className="hidden lg:flex flex-grow justify-center">
                <div className="flex gap-1">
                    {navBarLinksComponents}
                    {isAdmin && (
                        <NavbarItem className="flex self-center ml-2">
                            <Dropdown isOpen={isAdmDropdownOpen} placement="" onOpenChange={handleAdminOpenChange}>
                                <DropdownTrigger>
                                    <Button variant="flat" className="bg-main-orange font-semibold rounded-xl">
                                        Admin
                                        <FontAwesomeIcon icon={faCaretDown} className={`ml-1 transition-transform duration-200 ${isAdmDropdownOpen && 'rotate-180'}`} />
                                    </Button>
                                </DropdownTrigger>
                                <DropdownMenu color="warning" style={{ backgroundColor: "#171717", borderRadius: "8px" }} aria-label="Static Actions">
                                    <DropdownItem className="transition duration-200 ease-in-out" key="proyectos">Gestion de Proyectos</DropdownItem>
                                    <DropdownItem className="transition duration-200 ease-in-out" key="finanzas">Gestion Financiera</DropdownItem>
                                    <DropdownItem className="transition duration-200 ease-in-out" key="reportes">Reportes y Analisis</DropdownItem>
                                </DropdownMenu>
                            </Dropdown>
                        </NavbarItem>
                    )}
                    {isEmployee && (
                        <NavbarItem className="flex self-center ml-2">
                            <Dropdown isOpen={isInvDropdownOpen} onOpenChange={handleInvOpenChange}>
                                <DropdownTrigger>
                                    <Button variant="flat" className="bg-blue-600 text-white font-semibold rounded-xl">
                                        Gestion de Inventarios
                                        <FontAwesomeIcon icon={faCaretDown} className={`ml-1 transition-transform duration-200 ${isAdmDropdownOpen && "rotate-180"}`} />
                                    </Button>
                                </DropdownTrigger>
                                <DropdownMenu color="warning" style={{ backgroundColor: "#171717", borderRadius: "8px" }} aria-label="Static Actions">
                                    <DropdownItem className="transition duration-200 ease-in-out" key="equipos" href="/gestion-inventario/equipos"> Equipos</DropdownItem>
                                    <DropdownItem className="transition duration-200 ease-in-out" key="materiales" href="/gestion-inventario/materiales"> Materiales</DropdownItem>
                                </DropdownMenu>
                            </Dropdown>
                        </NavbarItem>
                    )}
                </div>
            </NavbarContent>
            {/* Profile menu */}
            {!isMobileScreen && (
                <NavbarContent justify="end">
                    {session && (
                        <NavbarItem>
                            <Dropdown placement="bottom-end">
                                <DropdownTrigger>
                                    <Avatar
                                        isBordered
                                        color="warning"
                                        as="button"
                                        className="transition-transform"
                                        src="https://i.pravatar.cc/150?u=a042581f4e29026704d"
                                    />
                                </DropdownTrigger>
                                <DropdownMenu aria-label="Profile Actions" variant="flat" style={{ backgroundColor: "#171717", borderRadius: "8px" }}>
                                    <DropdownItem key="profile" className="h-14 gap-2">
                                        <p className="font-semibold">Bienvenido</p>
                                        <p className="font-semibold">zoenosesee.com</p>
                                    </DropdownItem>
                                    <DropdownItem key="settings">Mi Perfil</DropdownItem>
                                    <DropdownItem key="projects" href="/portal-clientes/mis-proyectos">Mis Proyectos</DropdownItem>
                                    <DropdownItem key="chats" href="/chat">Mis Chats</DropdownItem>
                                    <DropdownItem key="config" href="/ajustes">Ajustes</DropdownItem>
                                    <DropdownItem key="support" href="/portal-clientes/soporte">Soporte</DropdownItem>
                                    <DropdownItem key="logout" color="danger"><Logout /></DropdownItem>
                                </DropdownMenu>
                            </Dropdown>
                        </NavbarItem>
                    )}
                    {session && (
                        <NavbarItem className="mr-4">
                            <div className="relative">
                                <FontAwesomeIcon href="/portal-clientes/perfil/notificaciones" icon={faBell} height={20} width={20} className="text-lg ml-2" />
                                <div className="absolute top-0 right-0 transform translate-x-1/2 -translate-y-1/2 bg-red-600 hover:bg-red-700 transition duration-300 ease-in-out text-white px-1.5 mt-1  rounded-full shadow-md hover:shadow-lg flex items-center justify-center">
                                    <p className="text-xs font-semibold">3</p>
                                </div>
                            </div>
                        </NavbarItem>
                    )}
                    {!session && (
                        <NavbarItem className="hidden lg:flex">
                            <Link href="/login">Iniciar Sesión</Link>
                        </NavbarItem>
                    )}
                </NavbarContent>
            )}



            {/* Mobile menu */}
            <NavbarMenu className="bg-main-color">
                {/* Profile image menu (mobile) */}
                <NavbarItem className="flex flex-col items-center mt-6 mb-2">
                    <Dropdown placement="bottom">
                        <DropdownTrigger>
                            <Avatar size="lg" isBordered color="warning" as="button" className="transition-transform" src="https://i.pravatar.cc/150?u=a042581f4e29026704d" />
                        </DropdownTrigger>
                        <DropdownMenu aria-label="Profile Actions" variant="flat" style={{ backgroundColor: "#171717", borderRadius: "8px" }}>
                            <DropdownItem key="profile" className="h-14 gap-2 ">
                                <p className="font-semibold">Signed in as</p>
                                <p className="font-semibold">zoey@example.com</p>
                            </DropdownItem>
                            <DropdownItem key="settings">My Settings</DropdownItem>
                            <DropdownItem key="logout" color="danger">Log Out</DropdownItem>
                        </DropdownMenu>
                    </Dropdown>
                </NavbarItem>
                <NavbarItem className="flex flex-col items-center justify-center mb-6">Perfil</NavbarItem>

                {/* Mobile links */}
                {navBarLinksComponentsMobile}
                <NavbarMenuItem className="flex flex-col items-center justify-center">
                    <Dropdown isOpen={isAdmDropdownOpen} placement="" onOpenChange={handleAdminOpenChange}>
                        <DropdownTrigger>
                            <Button variant="flat" className="bg-main-orange text-black w-1/2 h-14  font-semibold rounded-xl">
                                Admin
                                <FontAwesomeIcon icon={faCaretDown} className={`ml-1 transition-transform duration-200 ${isAdmDropdownOpen && "rotate-180"}`} />
                            </Button>
                        </DropdownTrigger>
                        <DropdownMenu color="warning" style={{ backgroundColor: "#171717", borderRadius: "8px" }} aria-label="Static Actions">
                            <DropdownItem className="transition duration-200 ease-in-out" href="/proyectos" key="equipos"><Link href="/proyectos">Gestion de Proyectos</Link></DropdownItem>
                            <DropdownItem className="transition duration-200 ease-in-out" key="finanzas"><Link href="/finanzas">Gestion de Finanzas</Link></DropdownItem>
                            <DropdownItem className="transition duration-200 ease-in-out" href="/reportes" key="reportes"><Link href="/reportes">Gestion de Reportes</Link></DropdownItem>
                        </DropdownMenu>
                    </Dropdown>
                </NavbarMenuItem>
                <NavbarMenuItem className="flex flex-col items-center mt-3 justify-center">
                    <Dropdown isOpen={isInvDropdownOpen} onOpenChange={handleInvOpenChange}>
                        <DropdownTrigger>
                            <Button variant="flat" className="bg-blue-600  h-14 px-2  text-white font-semibold rounded-xl">
                                Gestion de Inventarios
                                <FontAwesomeIcon icon={faCaretDown} className={`ml-1 transition-transform duration-200 ${isAdmDropdownOpen && "rotate-180"}`} />
                            </Button>
                        </DropdownTrigger>
                        <DropdownMenu className="w-full" color="warning" style={{ backgroundColor: "#171717", borderRadius: "8px" }} aria-label="Static Actions">
                            <DropdownItem href="/gestion-inventario/equipos" className="transition duration-200 ease-in-out" key="equipos"> Equipos</DropdownItem>
                            <DropdownItem href="/gestion-inventario/materiales" className="transition duration-200 ease-in-out" key="materiales"> Materiales</DropdownItem>
                        </DropdownMenu>
                    </Dropdown>
                </NavbarMenuItem>
            </NavbarMenu>
        </Navbar>
    )
}