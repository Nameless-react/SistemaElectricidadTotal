"use client"
import { ProfileProvider } from "./compound_components/context/profileConterxt"
import { ProfileAddress, ProfileContainer, ProfileEmail, ProfileImage, ProfileName, ProfileOptions, ProfilePhone } from "./compound_components/profile"

/**
 * Component that renders a profile management page.
 *
 * It takes a user object as a prop and renders a page with the user's information.
 * The page includes the user's image, name, email, phone number, address, and options for editing the profile.
 *
 * @param {{ user: object }} props - Component properties.
 * @param {object} props.user - The user object to be rendered.
 * @returns {JSX.Element} - The rendered component.
 */
export const ManageProfile = ({ user }) => {
    return (
        <ProfileProvider user={user}>
            <div className="flex justify-center mt-8 md:mt-28">
                <h1 className="text-3xl md:text-4xl font-bold text-slate-200">Perfil de usuario</h1>
            </div>
            <ProfileContainer
                className="flex flex-col w-full md:w-3/4 mx-auto  mt-4 md:mt-10 p-4 md:p-8 bg-gray-800 bg-opacity-20 rounded-xl md:mb-28 mb-12"
            >
                <div className="flex flex-col md:flex-row items-center mb-6 md:mb-8">
                    <ProfileImage
                        className="w-[80px] h-[80px] md:w-[100px] md:h-[100px] mb-4 md:mb-0 md:mr-4"
                        size="xl"
                    />
                    <div className="md:ml-6 text-center md:text-left mt-2 md:mt-0">
                        <ProfileName
                            className="text-3xl md:text-4xl font-bold text-slate-200"
                        />
                    </div>
                </div>
                <div className="space-y-4 md:space-y-6">
                    <ProfileEmail
                        classNames={{
                            base: "p-4 md:p-6 rounded-xl shadow-md border border-gray-600 border-opacity-50",
                            label: "text-xl md:text-2xl font-semibold text-slate-200 mb-2 md:mb-4 flex items-center",
                            icon: "text-blue-400 text-xl md:text-2xl mr-2 md:mr-3"
                        }}
                    />
                    <ProfilePhone
                        classNames={{
                            base: "p-4 md:p-6 rounded-xl shadow-md border border-gray-600 border-opacity-50",
                            label: "text-xl md:text-2xl font-semibold text-slate-200 mb-2 md:mb-4 flex items-center",
                            icon: "text-green-400 text-xl md:text-2xl mr-2 md:mr-3",
                            value: "text-white text-lg md:text-xl",
                        }}
                    />
                    <ProfileAddress
                        classNames={{
                            base: "p-4 md:p-6 rounded-xl shadow-md border border-gray-600 border-opacity-50",
                            label: "text-xl md:text-2xl font-semibold text-slate-200 mb-2 md:mb-4 flex items-center",
                            icon: "text-yellow-400 text-xl md:text-2xl mr-2 md:mr-3",
                            value: "text-white text-lg md:text-xl",
                        }}
                    />
                    <ProfileOptions
                        classNames={{
                            base: "p-4 md:p-6 rounded-xl shadow-md border border-gray-600 border-opacity-50",
                            label: "text-xl md:text-2xl font-semibold text-slate-200 mb-2 md:mb-4 flex items-center",
                            icon: "text-purple-400 text-xl md:text-2xl mr-2 md:mr-3",
                            value: "text-white text-base md:text-lg",
                            button: " mt-4 bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg",
                        }}
                    />
                </div>
            </ProfileContainer>
        </ProfileProvider>
    )
}