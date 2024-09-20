class MaintenanceNotesRepository {

    constructor(maintenanceNotes) {
        this.maintenanceNotes = maintenanceNotes;
    }

    async getMaintenanceNotes() {
        try {
            const maintenanceNotes = await this.maintenanceNotes.findAll();
            if (!maintenanceNotes) {
                throw new Error('No maintenance notes found.');
            }
            return maintenanceNotes;
        } catch (error) {
            console.error('An error occurred while getting maintenance notes:', error);
            throw new Error('An error occurred while getting maintenance notes.');
        }
    }

    async getMaintenanceNoteById(id) {
        try {
            const maintenanceNote = await this.maintenanceNotes.findOne({ where: { id_maintenance_notes: id } });
            if (!maintenanceNote) {
                throw new Error('Maintenance note not found.');
            }
            return maintenanceNote;
        } catch (error) {
            console.error('An error occurred while getting maintenance note:', error);
            throw new Error('An error occurred while getting maintenance note.');
        }
    }

    async saveMaintenanceNote(maintenanceNote) {
        
        const { notes, expected_recover_date, maintenance_date, id_tools } = maintenanceNote;
 
        try {
            const newMaintenanceNote = await this.maintenanceNotes.create({ expected_recover_date, notes, maintenance_date, id_tools});
            if (!newMaintenanceNote) {
                throw new Error('Failed to save maintenance note.');
            }
            return newMaintenanceNote;
        } catch (error) {
            console.error('An error occurred while saving maintenance note:', error);
            throw new Error('An error occurred while saving maintenance note.');
        }
    }
}

export default MaintenanceNotesRepository;