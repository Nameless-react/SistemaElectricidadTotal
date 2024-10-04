import { faSortDown, faSortUp } from '@fortawesome/free-solid-svg-icons';


export const getSortResults = (data, sortConfig) => {
    return data.sort((a, b) => {
        if (a[sortConfig.key] < b[sortConfig.key]) {
            return sortConfig.direction === 'ascending' ? -1 : 1;
        }
        if (a[sortConfig.key] > b[sortConfig.key]) {
            return sortConfig.direction === 'ascending' ? 1 : -1;
        }
        return 0;
    });
};

export const getSortIcon = (key, sortConfig) => {
    if (sortConfig.key === key) {
        return sortConfig.direction === 'ascending' ? faSortUp : faSortDown;
    }
    return faSortDown; 
};

export const requestSort = (key, sortConfig, setSortConfig) => {
    let direction = 'ascending';
    if (sortConfig.key === key && sortConfig.direction === 'ascending') {
        direction = 'descending';
    }
    setSortConfig({ key, direction });
};

