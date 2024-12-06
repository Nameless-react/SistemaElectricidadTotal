import { Input } from "@nextui-org/input";
import { useEmployeeForm } from "./contexts/employeeContext";
import { useMemo, useEffect, useState } from "react";
import { Dropdown, DropdownItem, DropdownMenu, DropdownTrigger } from "@nextui-org/dropdown";
import { Button } from "@nextui-org/button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretDown } from "@fortawesome/free-solid-svg-icons";
import { FormErrorsClient, FormErrorsServer } from "../../errors/form_errors/formErrors";

export const EmployeeFormContainer = ({
    children,
    classNames = {
        base: "",
        form: ""
    }
}) => {

    const { id, formData, setErrors, setServerErrors, validateEmployeeForm, handleSubmit, router } = useEmployeeForm();
    return (
        <div className={classNames.base}>
            <form className={classNames.form} 
            onSubmit={
                id ? (e) => handleSubmit(e, id  , formData, setErrors, setServerErrors, "/api/employees", "/empleados",validateEmployeeForm, router)
                : (e) => handleSubmit(e, id  , formData, setErrors, setServerErrors, "/api/employees", "/empleados",validateEmployeeForm, router)
            }
            >
                {children}
            </form>
        </div>
    )
}

export const EmployeeFormJob = ({
    classNames = {
        base: "",
        input: ""
    }

}) => {
    const { formData, handleChange, id, errors, setErrors, setFormData, serverErrors } = useEmployeeForm();
    return (
        <div className={classNames.base}>
            <Input
                className={classNames.input}
                label="Puesto"
                labelPlacement="outside"
                placeholder="Indique el puesto de trabajo"
                name="job"
                value={formData.job || ""}
                onChange={(e) => handleChange(e, setFormData, setErrors, errors)}
            />
            <FormErrorsClient errors={errors} errorName="job" />
            <FormErrorsServer serverError={serverErrors} errorName="job" />
        </div>
    )
}

export const EmployeeUsersDropDown = ({
    classNames = {
        base: "",
        button: ""
    } }) => {
    const { formData, setFormData, users, selectedUser, setSelectedUser, handleDropdownChange, errors, setErrors, serverErrors } = useEmployeeForm();
    useEffect(() => {
        console.log(formData)
    }, [formData])
    const [isStateDropdownOpen, setIsStateDropdownOpen] = useState(false);
    const selectedUserId = selectedUser.size > 0 ? Array.from(selectedUser)[0] : null;
    const selectedUserName = selectedUserId
        ? users.find(user => user.id_users.toString() === selectedUserId.toString())?.email || "Seleccionar Usuario"
        : "Seleccionar Usuario";

    const handleStateOpenChange = (isStateDropdownOpen) => {
        setIsStateDropdownOpen(isStateDropdownOpen);
    };
    useEffect(() => {
        if (formData.userId) {
            setSelectedUser(new Set([formData.userId]));
        }
    }, [formData]);
    return (
        <div className={classNames.base}>
            <Dropdown className={"dark"}
                onOpenChange={handleStateOpenChange}
            >
                <DropdownTrigger>
                    <Button variant="solid" className={classNames.button}>
                        {selectedUserName}
                        <div>
                            <FontAwesomeIcon
                                icon={faCaretDown}
                                className={`ml-1 transition-transform duration-200 ${isStateDropdownOpen ? 'rotate-180' : ''}`}
                            />
                        </div>
                    </Button>
                </DropdownTrigger>
                <DropdownMenu
                    aria-label="Usuarios"
                    variant="solid"
                    disallowEmptySelection
                    selectionMode="single"
                    selectedKeys={selectedUser}
                    emptyContent="No hay usuarios asociados a este proyecto"
                    onSelectionChange={(keys) => handleDropdownChange(keys, setSelectedUser, setFormData, "userId", errors, setErrors)}
                >
                    {users.map((user) => (
                        <DropdownItem key={user.id_users} value={user.id_users}>
                            {user.email}
                        </DropdownItem>
                    ))}
                </DropdownMenu>
            </Dropdown>
            <FormErrorsClient errors={errors} errorName="userId" />
            <FormErrorsServer serverError={serverErrors} errorName="userId" />
        </div>
    )
}
