import { Controller } from "react-hook-form";
import { Select } from "@nextui-org/select";

export default function SelectWrapper({ name, control, isMultiline = false, selectionMode = "single", items = [], errors = {}, classNames = {}, className = '', label, renderValue, children }) {
    return (
        <div className={`flex flex-col gap-2 font-bold ${className}`}>
            {label && <label htmlFor={name}>{label}</label>}
            <Controller
                control={control}
                name={name}
                render={({ field: { onChange, value, onBlur } }) => (
                    <Select
                        id={name}
                        items={items}
                        isInvalid={!!errors[name]}
                        isMultiline={isMultiline}
                        selectionMode={selectionMode}
                        errorMessage={errors[name]?.message}
                        classNames={classNames}
                        aria-label={label}
                        placeholder={label}
                        selectedKeys={value}
                        onSelectionChange={onChange}
                        onBlur={onBlur}
                        renderValue={renderValue}
                    >
                        {children}
                    </Select>
                )}
            />
        </div>
    );
}