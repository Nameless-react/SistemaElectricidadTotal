import { createContext, useContext, useState, useEffect } from "react";
const ProfileContext = createContext();

export const useProfile = () => useContext(ProfileContext);
/**
 * Provider that handles the state of the user's profile.
 * It receives the children to be rendered and the user to
 * be used to initialize the profile state.
 * The value of the provider is an object with two properties:
 *  - userData: the user's profile state.
 *  - setUserData: a function to update the user's profile state.
 * The hook useProfile is used to get the provider value in the child components.
 */
export const ProfileProvider = ({ children, user }) => {
    const [userData, setUserData] = useState(user || {}); // Inicializamos con user

    useEffect(() => {
        setUserData(user);
    }, [user]); 
    
    return (
        <ProfileContext.Provider value={{ userData, setUserData }}>
            {children}
        </ProfileContext.Provider>
    );
};

