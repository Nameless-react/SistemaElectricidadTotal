import { Model, DataTypes, Optional } from 'sequelize';
import sequelze from '../config/databaseConnection';
import Tools from './tool.model';

class MaintenanceNotes extends Model {

}

MaintenanceNotes.init({
    id_maintenance_notes: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    expected_recover_date: {
        type: DataTypes.DATE,
        allowNull: false,
    },
    notes: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    maintenance_date: {
        type: DataTypes.DATE,
        allowNull: false
    },

    id_tools: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
}, {
    sequelize: sequelze,
    tableName: 'maintenance_notes',
    timestamps: false
});

MaintenanceNotes.belongsTo(Tools, { foreignKey: "id_tools", as: "tools" });

export default MaintenanceNotes