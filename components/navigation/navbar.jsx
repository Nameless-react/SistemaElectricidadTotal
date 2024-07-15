"use client"
import { Navbar, NavbarBrand, NavbarContent, NavbarItem, NavbarMenuToggle, NavbarMenu, NavbarMenuItem } from "@nextui-org/navbar";
import { Button, } from "@nextui-org/button";
import Link from "next/link";
import React, { useEffect } from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBolt } from "@fortawesome/free-solid-svg-icons";
import { Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, } from "@nextui-org/dropdown";
import { Avatar } from "@nextui-org/avatar";

export default function NavbarApp() {
    const [isMenuOpen, setIsMenuOpen] = React.useState(false);
    const [isMobileScreen, setIsMobileScreen] = React.useState(false);

    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth < 768) {
                setIsMobileScreen(true);
            } else {
                setIsMobileScreen(false);
            }
        }
        window.addEventListener("resize", handleResize);
        handleResize();
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    const menuItems = [
        "Home",
        "Portal para Clientes",
        "Nosotros",
        "Contacto",

    ];

    return (
        <Navbar


            maxWidth="full"

            className="bg-main-color border-1 border-b-1 shadow-md border-black border-t-0 border-x-0  border-white border-opacity-10"
            isMenuOpen={isMenuOpen}
            onMenuOpenChange={setIsMenuOpen}
        >
            <NavbarContent className="sm:hidden" justify="start">
                <NavbarMenuToggle aria-label={isMenuOpen ? "Close menu" : "Open menu"} />
            </NavbarContent>

            <NavbarContent className="sm:flex pr-3 text-2xl" justify="start">
                <NavbarBrand className="text-xl font-semibold  py-2 px-2 ">
                    <p className="font-bold text-inherit text-2xl">Electricidad Total</p>
                    <FontAwesomeIcon icon={faBolt} className="text-main-orange text-2xl ml-1" />
                </NavbarBrand>
            </NavbarContent>

            <NavbarContent className="hidden sm:flex flex-grow justify-center ">
                <div className="flex  gap-1">
                    <NavbarItem className="text-xl font-semibold w-full cursor full py-2 px-2 rounded-md hover:text-main-orange   transition duration-300 ease-in-out">
                        <Link color="foreground  cursor-pointer" href="#">
                            Home
                        </Link>
                    </NavbarItem>
                    <NavbarItem className="text-xl font-semibold w-full cursor full py-2 px-2 rounded-md hover:text-main-orange   transition duration-300 ease-in-out">
                        <Link color="foreground  cursor-pointer" href="#">
                            Portal de Clientes
                        </Link>
                    </NavbarItem>
                    <NavbarItem className="text-xl font-semibold w-full cursor full py-2 px-2 rounded-md hover:text-main-orange   transition duration-300 ease-in-out">
                        <Link href="#" aria-current="page">
                            Nosotros
                        </Link>
                    </NavbarItem>
                    <NavbarItem className="text-xl font-semibold w-full cursor full py-2 px-2 rounded-md hover:text-main-orange   transition duration-300 ease-in-out">
                        <Link color="foreground" href="#">
                            Contacto
                        </Link>
                    </NavbarItem>
                    <NavbarItem className="flex self-center ml-2">
                        <Dropdown
                        >
                            <DropdownTrigger>
                                <Button

                                    variant="flat"
                                    className="bg-main-orange font-semibold rounded-lg "
                                >
                                    Admin
                                </Button>
                            </DropdownTrigger>
                            <DropdownMenu
                                className=""
                                color="warning"
                                style={{
                                    backgroundColor: "#171717",
                                    borderRadius: "8px",

                                }}
                                aria-label="Static Actions">
                                <DropdownItem className="transition duration-200 ease-in-out" key="new">Gestion de Proyectos</DropdownItem>
                                <DropdownItem className="transition duration-200 ease-in-out" key="copy">Gestion de Inventario</DropdownItem>
                                <DropdownItem className="transition duration-200 ease-in-out" key="edit">Gestion Financiera</DropdownItem>
                                <DropdownItem className="transition duration-200 ease-in-out" key="edit">Reportes y Analisis</DropdownItem>
                                <DropdownItem className="transition duration-200 ease-in-out" key="delete" color="danger">
                                    Delete file
                                </DropdownItem>
                            </DropdownMenu>
                        </Dropdown>
                    </NavbarItem>
                </div>
            </NavbarContent>

            <NavbarContent className="" justify="end">
                {!isMobileScreen ? (
                    <>
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
                                <DropdownMenu
                                    aria-label="Profile Actions"
                                    variant="flat"
                                    style={{
                                        backgroundColor: "#171717",
                                        borderRadius: "8px",

                                    }}
                                >
                                    <DropdownItem key="profile" className="h-14 gap-2">
                                        <p className="font-semibold">Signed in as</p>
                                        <p className="font-semibold">zoey@example.com</p>
                                    </DropdownItem>
                                    <DropdownItem key="settings">
                                        My Settings
                                    </DropdownItem>
                                    <DropdownItem key="team_settings">Team Settings</DropdownItem>
                                    <DropdownItem key="analytics">
                                        Analytics
                                    </DropdownItem>
                                    <DropdownItem key="system">System</DropdownItem>
                                    <DropdownItem key="configurations">Configurations</DropdownItem>
                                    <DropdownItem key="help_and_feedback">
                                        Help & Feedback
                                    </DropdownItem>
                                    <DropdownItem key="logout" color="danger">
                                        Log Out
                                    </DropdownItem>
                                </DropdownMenu>
                            </Dropdown>
                        </NavbarItem>
                        <NavbarItem className="hidden lg:flex">
                            <Link href="#">Login</Link>
                        </NavbarItem>
                        <NavbarItem>
                            <Button as={Link} color="warning" href="#" variant="flat">
                                Sign Up
                            </Button>
                        </NavbarItem>
                    </>
                ) : (
                    null
                )}

            </NavbarContent>

            <NavbarMenu className="bg-main-color">
                <NavbarItem className="flex flex-col items-center mt-6 mb-2">
                    <Dropdown placement="bottom">
                        <DropdownTrigger>
                            
                            <Avatar
                                size="lg"
                                isBordered
                                color="warning"
                                as="button"
                                className="transition-transform"

                                src="https://i.pravatar.cc/150?u=a042581f4e29026704d"
                            />
                        
                        </DropdownTrigger>
                        <DropdownMenu
                            aria-label="Profile Actions"
                            className=""

                            variant="flat"
                            style={{
                                backgroundColor: "#171717",
                                borderRadius: "8px",

                            }}
                        >
                            <DropdownItem key="profile" className="h-14 gap-2 ">
                                <p className="font-semibold">Signed in as</p>
                                <p className="font-semibold">zoey@example.com</p>
                            </DropdownItem>
                            <DropdownItem key="settings">
                                My Settings
                            </DropdownItem>
                            <DropdownItem key="team_settings">Team Settings</DropdownItem>
                            <DropdownItem key="analytics">
                                Analytics
                            </DropdownItem>
                            <DropdownItem key="system">System</DropdownItem>
                            <DropdownItem key="configurations">Configurations</DropdownItem>
                            <DropdownItem key="help_and_feedback">
                                Help & Feedback
                            </DropdownItem>
                            <DropdownItem key="logout" color="danger">
                                Log Out
                            </DropdownItem>
                        </DropdownMenu>
                    </Dropdown>
                </NavbarItem>
                <NavbarItem className="flex flex-col items-center justify-center mb-6">Perfil</NavbarItem>
                {menuItems.map((item, index) => (
                    <NavbarMenuItem  key={`${item}-${index}`}>
                        <Link
                            className="flex flex-col  items-center justify-center py-2 px-3 text-lg font-semibold hover:text-main-orange transition duration-300 ease-in-out"
                            color={
                                index === 2 ? "warning" : index === menuItems.length - 1 ? "danger" : "foreground"
                            }
                            href="#"
                            size="lg"
                        >
                            {item}
                        </Link>
                    </NavbarMenuItem>
                ))}

                <NavbarMenuItem className="flex flex-col items-center justify-center">
                    <Dropdown
                    >
                        <DropdownTrigger>
                            <Button

                                variant="flat"
                                className="bg-main-orange font-semibold rounded-lg "
                            >
                                Admin
                            </Button>
                        </DropdownTrigger>
                        <DropdownMenu
                            className=""
                            color="warning"
                            style={{
                                backgroundColor: "#171717",
                                borderRadius: "8px",

                            }}
                            aria-label="Static Actions">
                            <DropdownItem className="transition duration-200 ease-in-out" key="new">Gestion de Proyectos</DropdownItem>
                            <DropdownItem className="transition duration-200 ease-in-out" key="copy">Gestion de Inventario</DropdownItem>
                            <DropdownItem className="transition duration-200 ease-in-out" key="edit">Gestion Financiera</DropdownItem>
                            <DropdownItem className="transition duration-200 ease-in-out" key="edit">Reportes y Analisis</DropdownItem>
                            <DropdownItem className="transition duration-200 ease-in-out" key="delete" color="danger">
                                Delete file
                            </DropdownItem>
                        </DropdownMenu>
                    </Dropdown>
                </NavbarMenuItem>
            </NavbarMenu>
        </Navbar>
    )
}