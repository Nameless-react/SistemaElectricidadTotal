import { Inter, Montserrat } from "next/font/google";
import "/css/globals.css";
import Providers from "./providers";
import NavbarApp from "../../components/navigation/navbar";
const inter = Inter({ subsets: ["latin"] });
import Footer from "../../components/navigation/footer";
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
    icon: "/logo2.png", 
  },
};

export default function RootLayout({ children }) {
  
  return (
    <html lang="en" className="bg-gray-900 text-white">
      <body className={montserrat.className + "" }>
        <Providers>

             <NavbarApp/>
     
          <div className="">
             {children}
          </div>
          <Footer/>
        </Providers>
      </body>
    </html>
  );
}
