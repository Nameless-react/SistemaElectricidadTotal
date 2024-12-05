import config from "/config/config";

/**
 * Función base para realizar solicitudes HTTP.
 * @param {string} endpoint - El endpoint al que se realizará la solicitud.
 * @param {Object} options - Configuración de la solicitud (método, encabezados, cuerpo, etc.).
 * @param {Object} extraOptions - Configuración adicional específica del endpoint (como `next`).
 * @returns {Promise<Object>} - Respuesta procesada o error.
 */
export const baseHandler = async (endpoint, options = {}, extraOptions = {}) => {
    const url = `http://${config.host}:3000/api/${endpoint}`;
    const mergedOptions = { ...options, ...extraOptions };

    try {
        const response = await fetch(url, mergedOptions);
        const result = await response.json();

        if (!response.ok) {
            return { errors: result.error || "Ocurrió un error durante la solicitud." };
        }

        return result;
    } catch (error) {
        return { errors: error.message || "Error de red." };
    }
};


/**
 * Obtener un recurso por ID.
 * @param {string} endpoint - Endpoint del recurso.
 * @param {string | number} id - ID del recurso.
 * @param {Object} extraOptions - Configuración adicional específica del endpoint.
 */
export const getHandler = (endpoint, id, extraOptions = {}) => {
    return baseHandler(`${endpoint}/${id}`, { method: "GET" }, extraOptions);
};

/**
 * Obtener todos los recursos de un endpoint.
 * @param {string} endpoint - Endpoint del recurso.
 * @param {Object} extraOptions - Configuración adicional específica del endpoint.
 */
export const getAllHandler = (endpoint, extraOptions = {}) => {
    return baseHandler(endpoint, { method: "GET" }, extraOptions);
};

/**
 * Crear un nuevo recurso.
 * @param {string} endpoint - Endpoint del recurso.
 * @param {Object} data - Datos a enviar en el cuerpo de la solicitud.
 * @param {Object} extraOptions - Configuración adicional específica del endpoint.
 */
export const postHandler = (endpoint, data, extraOptions = {}) => {
    return baseHandler(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
    }, extraOptions);
};

/**
 * Actualizar un recurso existente.
 * @param {string} endpoint - Endpoint del recurso.
 * @param {string | number} id - ID del recurso.
 * @param {Object} data - Datos a enviar en el cuerpo de la solicitud.
 * @param {Object} extraOptions - Configuración adicional específica del endpoint.
 */
export const patchHandler = (endpoint, id, data, extraOptions = {}) => {
    return baseHandler(`${endpoint}/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
    }, extraOptions);
};

/**
 * Eliminar un recurso por ID.
 * @param {string} endpoint - Endpoint del recurso.
 * @param {string | number} id - ID del recurso.
 * @param {Object} extraOptions - Configuración adicional específica del endpoint.
 */
export const deleteHandler = (endpoint, id, extraOptions = {}) => {
    return baseHandler(`${endpoint}/${id}`, { method: "DELETE" }, extraOptions);
};