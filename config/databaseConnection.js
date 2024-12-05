import pg from 'pg';
import { Sequelize } from "sequelize"

const sequelze = new Sequelize(process.env.DB_STRING, {
    dialect: "postgres",
    dialectModule: pg,
    logging: false,
}); 

export default sequelze; 


