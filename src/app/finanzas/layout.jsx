"use client";
import { faCoins, faDashboard, faDollar, faDollarSign, faGear, faMoneyCheckDollar, faTag, faTimes, faWallet } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Link from 'next/link';
import { useState } from 'react';
export default function RootLayout({ children }) {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };
    const menuItems = [
        { icon: faDashboard, text: 'Dashboard', link: "/finanzas" },
        { icon: faMoneyCheckDollar, text: 'Presupuestos', link: "/finanzas/presupuestos" },
        { icon: faDollar, text: 'Ingresos', link: "/finanzas/ingresos" },
        { icon: faCoins, text: 'Categoria de Ingresos', link: "/finanzas/ingresos/categoria-ingresos" },
        { icon: faWallet, text: 'Gastos', link: "/finanzas/gastos" },
        { icon: faTag, text: 'Categoria de Gastos', link: "/finanzas/gastos/categoria-gastos" },
       
    ];
    return (
        <div className="flex-row sm:flex min-h-screen">
            {/* Sidebar */}
            <aside
                className={`fixed top-0 sm:mt-[15px] z-50 left-0 h-screen sm:h-auto transition-transform duration-300 ease-in-out
                           ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}
                           md:relative md:translate-x-0 md:w-60 md:shrink-0`}
                aria-label="Sidebar"
            >
                <div className="h-[100%] px-3 py-4 overflow-y-auto bg-gray-800 rounded-r-lg">

                    <ul className="space-y-2 font-medium">
                        <li className=' sm:hidden flex justify-end items-center'>
                            <FontAwesomeIcon
                                icon={faTimes}
                                onClick={toggleSidebar} className=" p-3 text-white rounded-lg hover:bg-gray-700 mt-2 cursor-pointer transtion duration-300 ease-in-out"
                            />
                        </li>
                        {menuItems.map(({ icon, text, link }, idx) => (
                            <li key={idx}>
                                <Link href={link} className="flex items-center p-2 text-white rounded-lg hover:bg-gray-700 transition-colors">
                                    <FontAwesomeIcon icon={icon} />
                                    <span className="ml-3">{text}</span>
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>
            </aside>
            {/* Mobile Menu Button */}
            <button
                onClick={toggleSidebar}
                className="md:hidden mb-4 p-2 rounded-lg hover:bg-gray-200 transition-colors"
            >
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z" />
                </svg>
            </button>

            {children}
        </div>
    );
}