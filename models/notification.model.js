import { Model, DataTypes } from 'sequelize';
import sequelize from '/config/databaseConnection';

class Notifications extends Model {}

Notifications.init({
    idNotifications: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
        field: "id_notifications"
    },
    typeNotification: {
        type: DataTypes.STRING,
        allowNull: false,
        field: "type_notification"
    },
    title: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    shippingDateTime: {
        type: DataTypes.DATE,
        allowNull: false,
        field: "shipping_date_time",
        defaultValue: DataTypes.NOW
    },
    isRead: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
        field: "is_read"
    },
    idUsers: {
        type: DataTypes.INTEGER,
        defaultValue: false,
        field: "id_users"
    }
},
{
    sequelize: sequelize,    
    modelName: 'notifications',
    tableName: 'notifications',
    timestamps: false,
});

export default Notifications;