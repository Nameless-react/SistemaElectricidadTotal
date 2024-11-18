import React from 'react';
/**
 * FinancialFlow component renders a financial summary with a title and a grid of financial data.
 *
 * @param {Object} props - The component props.
 * @param {string} props.title - The title of the financial flow section.
 * @param {Array} props.data - An array of financial data objects.
 * @param {Object} props.data[].label - The label for the financial data item.
 * @param {number} props.data[].value - The value for the financial data item.
 * @param {string} props.data[].color - The CSS class for the color of the financial data value.
 *
 * @returns {JSX.Element} The rendered FinancialFlow component.
 */
export function FinancialFlow({ title, data }) {
    return (

        <div className="sm:w-full flex flex-col  w-[370px] mx-auto bg-gray-800 bg-opacity-20 p-6 rounded-lg shadow-lg mt-6 mb-6">
            <div className={`flex flex-col items-center text-center bg-gradient-to-r from-gray-700 to-gray-800 p-6 rounded-lg shadow-lg ${data && data.length > 0 ? 'mb-6' : 'mb-0'}`}>
                <h2 className="text-4xl font-bold text-slate-200">{title}</h2>
            </div>
            {/* Grid Container */}
            {data && data.length > 0 ? (
                <div className={`grid grid-cols-1 sm:grid-cols-2 ${title === 'Flujo de Gastos' ? 'lg:grid-cols-2' : 'lg:grid-cols-3'} gap-6 justify-center`}>
                    {/* Mapping financial elements */}
                    {data.map((item, index) => (
                        <div key={index} className="flex flex-col items-center text-center bg-gray-700 bg-opacity-80 p-6 rounded-lg shadow-lg">
                            <p className="text-xl text-white mb-2">{item.label}</p>
                            <p className={`text-2xl font-semibold ${item.color}`}>₡{item.value.toLocaleString()}</p>
                        </div>
                    ))}
                </div>
            ) : (
                <></>
            )}
        </div>
    );
}
