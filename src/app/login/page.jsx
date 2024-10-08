
import Script from "next/script";
import { ManageSignInForm } from "../../../components/auth/signIn/signInForm";
import { ManageSignUpForm } from "../../../components/auth/SignUp/manageSignUpForm";
import "/css/globals.css";
import { getServerSession } from "next-auth/next"; // Import the server-side session fetching function
import { options } from "../api/auth/[...nextauth]/options";
import { redirect } from "next/navigation"; // Import redirect function from next/navigation

export default async function Login() {

    const session = await getServerSession(options); 

    if (session) {
        redirect("/");
    }


    return (
        <>
            <div className="outer-container">
                <div className="formsContainer">
                    <div className="signInSignUp">
                        <ManageSignInForm />
                        <ManageSignUpForm />
                    </div>
                </div>

                <div className="panelsContainer">
                    <div className="panel leftPanel">
                        <div className="content">
                            <h3>¿No tienes cuenta?</h3>

                            <button id="sign-up-btn" className="transparent">Crear Cuenta</button>
                        </div>
                    </div>
                    <div className="panel rightPanel">
                        <div className="content">
                            <h3>¿Ya tienes cuenta?</h3>
                            <button id="sign-in-btn" className="transparent">Iniciar Sesión</button>
                        </div>
                    </div>
                </div>
            </div>
            <Script src="scripts.js" strategy="lazyOnload" />
        </>
    )
}