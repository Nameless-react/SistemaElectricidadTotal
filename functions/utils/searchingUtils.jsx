
import { formatDate } from "./formatDate";
/**
 * Filters an array of objects based on a search string.
 *
 * @param {Array<Object>} data - The array of objects to filter.
 * @param {string} search - The search string to filter by.
 * @returns {Array<Object>} The filtered array of objects.
 *
 * The function checks each key-value pair in the objects:
 * - If the value is a string, it checks if the string includes the search string (case insensitive).
 * - If the value is a number, it converts the number to a string and checks if it includes the search string.
 * - If the value is a Date object, it formats the date as 'DD/MM/YYYY' and checks if it includes the search string.
 */
export const searchFilter = (data, search) => {
    if (search === "") {
        return data;
    } else {
        return data.filter((item) => {
            return Object.keys(item).some((key) => {
                const value = item[key];
                                
                if (typeof value === 'string') {
                    return value.toLowerCase().includes(search.toLowerCase());
                }
                
                if (typeof value === 'number') {
                    return value.toString().toLowerCase().includes(search.toLowerCase());
                }

                if (value instanceof Date) {
                    const formattedDate = formatDate(value); 
                    return formattedDate.includes(search);
                }

                return false;
            });
        });
    }
};