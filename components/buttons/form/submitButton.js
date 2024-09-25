import { Button } from "@nextui-org/button";
export const SubmitButton = ({ className = "", id = null, title }) => {
    return (
        <div className={className}>
            <Button
                type="submit"
                className={`self-end ${id ? "bg-blue-700 hover:bg-blue-800" : "bg-green-700 hover:bg-green-800"}  transition duration-300 ease-in-out text-white font-bold py-2 px-8 w-full rounded-xl `}
            >
                {title}
            </Button>
        </div>
    );
};


