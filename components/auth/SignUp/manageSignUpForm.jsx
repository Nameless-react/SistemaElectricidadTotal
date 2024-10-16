"use client"
import { SignUpFormProvider } from "./compund_components/context/signUpContext";

import { Button } from "@nextui-org/button";
import { SignUpConfirmPassword, SignUpEmail, SignUpFirstSurName, SignUpFormContainer, SignUpIdentification, SignUpName, SignUpNumber, SignUpPassword, SignUpSecondSurName } from "./compund_components/signUpForm"
/**
 * Component that renders the sign up form.
 *
 * Renders a form with the following fields:
 * - name,
 * - first surname,
 * - second surname (optional),
 * - identification,
 * - email,
 * - phone number,
 * - password,
 * - password confirmation.
 *
 * The form is rendered in one column on small screens and two columns on
 * large screens.
 *
 * @returns {JSX.Element} - Component that renders the sign up form.
 */
export const ManageSignUpForm = () => {
    return (
        <SignUpFormProvider >
            <SignUpFormContainer >
                <div className="flex flex-col sm:flex-row w-full sm:w-3/4  sm:gap-2">
                    <SignUpName className="w-full sm:mb-0 mb-4" />
                    <SignUpFirstSurName className="w-full sm:mb-0 mb-4" />
                </div>
                <div className="flex flex-col sm:flex-row w-full sm:w-3/4  sm:gap-2 ">
                    <SignUpSecondSurName className="w-full sm:mb-0 mb-4" />
                    <SignUpIdentification className="w-full sm:mb-0 mb-4" />
                </div>
                <div className="flex flex-col sm:flex-row w-full sm:w-3/4  sm:gap-2 ">
                    <SignUpEmail className="w-full sm:mb-0 mb-4" />
                    <SignUpNumber className="w-full sm:mb-0 mb-4" />
                </div>

                <div className="flex flex-col sm:flex-row w-full sm:w-3/4 sm:gap-2 ">
                    <SignUpPassword className="w-full sm:mb-0 mb-4" />
                    <SignUpConfirmPassword className="w-full sm:mb-0 mb-4" />
                </div>
                <Button type="submit" size="lg" className="bg-blue-600 hover:bg-blue-700 transition duration-300 text-xl ease-in-out text-white font-bold py-4 sm:h-16 px-8 sm:mt-8">
                    Registrarse
                </Button>
            </SignUpFormContainer>
        </SignUpFormProvider>
    )
}