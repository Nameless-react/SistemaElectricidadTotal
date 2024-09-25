import { faBell } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";


export default function Notifications() {
    
    
    
    return (
        <div className="relative">
            <FontAwesomeIcon icon={faBell} className="ml-2 w-auto h-4" />
            <div className="absolute top-0 right-0 transform translate-x-1/2 -translate-y-1/2 bg-red-600 hover:bg-red-700 transition duration-300 ease-in-out text-white px-1.5 mt-1  rounded-full shadow-md hover:shadow-lg flex items-center justify-center">
                <p className="text-xs font-semibold">3</p>
            </div>
        </div>
)
}