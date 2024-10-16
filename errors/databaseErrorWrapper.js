export default async function databaseErrorWrapper(func) {
    try {
        return await func();
    } catch (error) {
        // This logic can be improve with other custom errors, validations or operations
        if (error.name === 'SequelizeDatabaseError') {
            throw new DatabaseError("Error en la base de datos", error);
        }
        throw new Error("Error inesperado en la base de datos", error);
    }
}
