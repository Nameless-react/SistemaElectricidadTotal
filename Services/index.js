import CategoryService from "./categories/category.service";
import MaintenanceNotesService from "./maintenance_notes/maintenanceNotes.service";
import ProviderService from "./providers/provider.service";
import ToolService from "./tools/tool.service";
import ValidationMaintenanceNotesService from "./tools/validations/validationMaintenanceNotes.service";
import ValidationToolsService from "./tools/validations/validationTool.service";
import ImageService from "./image.service";
import MaterialService from "./materials/material.service";
import ValidationMaterialService from "./materials/validations/validationMaterial.service";
import UserService from "./users/user.service";
import ValidationUserService from "./users/validations/validationUser.service";
import TaskService from "./projects/task.service";


export {
    CategoryService,
    MaintenanceNotesService,
    ProviderService,
    ToolService,
    MaterialService,
    ValidationMaintenanceNotesService,
    ValidationToolsService,
    ValidationMaterialService,
    ImageService,
    UserService,
    ValidationUserService,
    TaskService
}