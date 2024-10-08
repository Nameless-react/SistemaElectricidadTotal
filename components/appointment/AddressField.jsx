"use client"
import { useState } from 'react';

const AddressField = ({ appointment }) => {
    const [isInOffice, setIsInOffice] = useState(appointment?.isInOffice || false);

    const handleCheckboxChange = (e) => {
        setIsInOffice(e.target.checked);
    };

    return (
        <>
            <div className="flex items-center mt-4">
                <p className="text-sm">¿Desea agendar la cita en las oficinas de Electricidad Total?</p>
                <input 
                    type="checkbox" 
                    className="dark ml-2 h-4 w-4" 
                    name="isInOffice" 
                    checked={isInOffice} 
                    onChange={handleCheckboxChange} 
                />
            </div>

            {!isInOffice && (
                <Textarea label="Dirección" className="dark w-2/3" name="address" defaultValue={appointment?.address}/>
            )}
        </>
    );
};
