 class MaintenanceNotesService {
     constructor(maintenanceNotesRepository) {
         this.maintenanceNotesRepository = maintenanceNotesRepository;
     }

     async getMaintenanceNotes() {
         return await this.maintenanceNotesRepository.getMaintenanceNotes();
     }

     async getMaintenanceNoteById(id) {
         return await this.maintenanceNotesRepository.getMaintenanceNoteById(id);
     }

     async saveMaintenanceNote(maintenanceNote) {
         return await this.maintenanceNotesRepository.saveMaintenanceNote(maintenanceNote);
     }
     
 }

export default MaintenanceNotesService;