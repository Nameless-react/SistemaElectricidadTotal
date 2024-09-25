export const fetchTool = async (setFormData, setServerError, setImagePreview,  id) => {
    try {
        const response = await fetch(`/api/inventory/tools/tool/update?id=${id}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (!response.ok) {
            throw new Error('Failed to fetch tool');
        }
        const data = await response.json();
        setFormData(data.tool);
        setImagePreview(data.tool.image);
       
    } catch (error) {
        console.error(error);
        setServerError(error.message);
    }
}