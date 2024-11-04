class MaintenanceNotesRepository {
    constructor(maintenanceNotes) {
        this.maintenanceNotes = maintenanceNotes;
    }

    /**
     * Retrieves all maintenance notes in the database.
     *
     * @return {Promise< MaintenanceNotes[] >} An array of maintenance notes. If no maintenance notes are found, it returns null.
     * @throws {Error} If an error occurs while trying to retrieve the maintenance notes.
     */
    async getMaintenanceNotes() {
        try {
            const maintenanceNotes = await this.maintenanceNotes.findAll();
            if (!maintenanceNotes || maintenanceNotes.length === 0) {
                //console.log('No maintenance notes found.');
                return null; // Return null if no maintenance notes are found
            }
            return maintenanceNotes;
        } catch (error) {
            console.error('An error occurred while getting maintenance notes:', error);
            throw new Error('Error al obtener las notas de mantenimiento.');
        }
    }

    /**
     * Retrieves a maintenance note by its ID from the database.
     *
     * @param {number} id The ID of the maintenance note to retrieve.
     * @return {Promise< MaintenanceNotes >} The maintenance note with the given ID, or null if not found.
     * @throws {Error} If an error occurs while trying to retrieve the maintenance note.
     */
    async getMaintenanceNoteById(id) {
        try {
            const maintenanceNote = await this.maintenanceNotes.findOne({ where: { id_maintenance_notes: id } });
            if (!maintenanceNote) {
                //console.log('Maintenance note not found.');
                return null; // Return null if the maintenance note is not found
            }
            return maintenanceNote.dataValues;
        } catch (error) {
            console.error('An error occurred while getting maintenance note:', error);
            throw new Error('Error al obtener la nota de mantenimiento.');
        }
    }

/**
 * Saves a new maintenance note to the database.
 *
 * @param {Object} maintenanceNote The maintenance note object to be saved.
 * @param {string} maintenanceNote.notes The notes for the maintenance.
 * @param {Date} maintenanceNote.expected_recover_date The expected recovery date.
 * @param {Date} maintenanceNote.maintenance_date The maintenance date.
 * @param {number} maintenanceNote.id_tools The ID of the associated tool.
 * @returns {Object} The newly saved maintenance note data.
 * @throws {Error} If an error occurs while saving the maintenance note.
 */
    async saveMaintenanceNote(maintenanceNote) {
        const { notes, expected_recover_date, maintenance_date, id_tools } = maintenanceNote;

        try {
            const newMaintenanceNote = await this.maintenanceNotes.create({ expected_recover_date, notes, maintenance_date, id_tools });
            if (!newMaintenanceNote) {
                throw new Error('Failed to save maintenance note.');
            }
            return newMaintenanceNote.dataValues;
        } catch (error) {
            console.error('An error occurred while saving maintenance note:', error);
            throw new Error('Error al guardar la nota de mantenimiento.');
        }
    }
}

export default MaintenanceNotesRepository;
