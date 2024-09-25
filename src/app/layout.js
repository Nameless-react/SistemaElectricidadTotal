// The following import prevents a Font Awesome icon server-side rendering bug,
// where the icons flash from a very large icon down to a properly sized one:
import '@fortawesome/fontawesome-svg-core/styles.css';
// Prevent fontawesome from adding its CSS since we did it manually above:
import { config } from '@fortawesome/fontawesome-svg-core';
config.autoAddCss = false; /* eslint-disable import/first */

import { Montserrat } from "next/font/google";
import "/css/globals.css";


import Providers from "./providers";
import NavbarApp from "/components/navigation/Navbar";
import Footer from "/components/navigation/Footer";


const montserrat = Montserrat({
  weight: ['100', '200', '500', '600', '800', '900'],
  style: ["normal", "italic"],
  subsets: ["latin"],
  variable: "--font-montserrat"
})

export const metadata = {
  title: "Electricidad Total",
  description: "Sistema Electricidad Total",
  icons: {
    icon: "/logo2.png"
  }
};

export default function RootLayout({ children }) {
  
  return (
    <html lang="en" className="bg-gray-900 text-white">
      <body className={montserrat.className}>
        <Providers>
            <NavbarApp/> 
            {children}
            <Footer/>
        </Providers>
      </body>
    </html>
  )
}
