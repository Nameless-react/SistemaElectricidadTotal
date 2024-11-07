class MaintenanceNotesService {
    /**
     * Constructor for the MaintenanceNotesService class.
     *
     * @param {MaintenanceNotesRepository} maintenanceNotesRepository - The repository for interacting with the maintenance notes database.
     * @param {ValidationMaintenanceNotesService} validationMaintenanceNotesService - The service for validating maintenance notes.
     */
    constructor(maintenanceNotesRepository, validationMaintenanceNotesService) {
        this.validationMaintenanceNotesService = validationMaintenanceNotesService;
        this.maintenanceNotesRepository = maintenanceNotesRepository;
    }

/**
 * Retrieves all maintenance notes in the database.
 *
 * @return {Promise< MaintenanceNotes[] >} An array of maintenance notes. If no maintenance notes are found, it returns null.
 * @throws {Error} If an error occurs while trying to retrieve the maintenance notes.
 */
    async getMaintenanceNotes() {
        return await this.maintenanceNotesRepository.getMaintenanceNotes();
    }

/**
 * Retrieves a maintenance note by its ID from the database.
 *
 * @param {number} id The ID of the maintenance note to retrieve.
 * @return {Promise< MaintenanceNotes >} The maintenance note with the given ID, or null if not found.
 * @throws {Error} If an error occurs while trying to retrieve the maintenance note.
 */
    async getMaintenanceNoteById(id) {
        return await this.maintenanceNotesRepository.getMaintenanceNoteById(id);
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
        return await this.maintenanceNotesRepository.saveMaintenanceNote(maintenanceNote);
    }

    /**
     * Handles the creation of a new maintenance note, given the form data and tool ID.
     *
     * @param {Object} formData The form data containing the maintenance note information.
     * @param {number} toolId The ID of the tool associated with this maintenance note.
     * @throws {Error} If an error occurs during validation or saving the maintenance note.
     */
    async handleMaintenanceNotes(formData, toolId) {
        const { success, data, error } = await this.validationMaintenanceNotesService.validateToolsMaintenance(formData);
        if (!success) {
            throw new Error(error);
        }

        const { notes, recoveryDate, startMaintenanceDate } = data;
        const validatedData = {
            notes,
            expected_recover_date: recoveryDate,
            maintenance_date: startMaintenanceDate,
            id_tools: toolId
        };

        const maintenanceNote = await this.maintenanceNotesRepository.saveMaintenanceNote(validatedData);
        if (!maintenanceNote) {
            throw new Error('Error processing the maintenance note'); 
        }
    }
}

export default MaintenanceNotesService;