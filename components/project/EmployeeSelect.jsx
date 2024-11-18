import { Avatar } from "@nextui-org/avatar"

export default function EmployeeSelect({ idEmployee, name, image, email }) {
    return (
        <div className="flex items-center gap-2">
            <Avatar
                alt={name}
                className="flex-shrink-0"
                size="sm"
                src={image}
            />
            <div className="flex flex-col">
                <span>{name}</span>
                <span className="text-default-500 text-tiny">({email})</span>
            </div>
        </div>
    )
}