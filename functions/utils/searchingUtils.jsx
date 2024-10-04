
export const searchFilter = (data, search) => {
    if (search === "") {
        return data;
    } else {
        return data.filter((item) => {
            return Object.keys(item).some((key) => {
                const value = item[key];
                return (
                    typeof value === 'string' &&
                    value.toLowerCase().includes(search.toLowerCase()) ||
                    typeof value === 'number' &&
                    value.toString().toLowerCase().includes(search.toLowerCase())
                )
            })
        })
    }
};


