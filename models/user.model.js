/*************  ✨ Codeium Command 🌟  *************/
/**
 * @class User
 * @extends {import('sequelize').Model}
 * @property {number} id_users - Unique identifier for the user.
 * @property {string} name - User's name.
 * @property {string} [image] - User's image.
 * @property {string} first_sur_name - User's first surname.
 * @property {string} second_sur_name - User's second surname.
 * @property {string} email - User's email.
 * @property {string} password - User's password.
 * @property {Date} created_at - Timestamp for when the user was created.
 * @property {Date} [updated_at] - Timestamp for when the user was updated.
 * @property {string} identification - User's unique identification (DNI, passport, etc.).
 * @property {boolean} verify - Indicates if the user has verified their account.
 * @property {boolean} deleted - Indicates if the user has been deleted.
 * @property {string} [phone] - User's phone number.
 * @property {string} [address] - User's address.
 */
import { Model, DataTypes } from 'sequelize';
import sequelize from '../config/databaseConnection';

class User extends Model {}
User.init({
    id_users: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    name: {
        type: DataTypes.STRING(255),
        allowNull: false
    },
    image: {
        type: DataTypes.TEXT,
        allowNull: true
    },
    first_sur_name: {
        type: DataTypes.STRING(255),
        allowNull: false
    },
    second_sur_name: {
        type: DataTypes.STRING(255),
        allowNull: false
    },
    email: {
        type: DataTypes.STRING(255),
        allowNull: false,
        unique: true,
        validate: {
            isEmail: true,
            notEmpty: true,
            is: /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/
        }
    },
    password: {
        type: DataTypes.TEXT,
        allowNull: false,
        validate: {
            len: [8, undefined] 
        }
    },
    created_at: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW
    },
    updated_at: {
        type: DataTypes.DATE
    },
    identification: {
        type: DataTypes.STRING(12),
        allowNull: false,
        unique: true,
        validate: {
            is: /^\d{9}$/
        }
    },
    verify: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
    },
    deleted: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
    },
    phone: {
        type: DataTypes.STRING(10),
        allowNull: true,
        validate: {
            is: /^\d{8}$/ 
        }
    },
    address: {
        type: DataTypes.STRING(500),
        allowNull: true,
        defaultValue: 'Direccion no Disponible'
    }
}, {
    sequelize,
    modelName: 'User',
    tableName: 'users',
    timestamps: true, 
    createdAt: 'created_at',
    updatedAt: 'updated_at'
});

export default User;