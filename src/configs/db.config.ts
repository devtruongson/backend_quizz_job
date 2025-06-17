import { Sequelize } from 'sequelize';

const dbName = process.env.DB_NAME || 'quizz_eng';
const dbUser = process.env.DB_USER || 'truongsondev';
const dbPassword = process.env.DB_PASSWORD || '2003';
const dbHost = process.env.DB_HOST || 'localhost';
const dbPort = parseInt(process.env.DB_PORT || '3306');

const sequelize = new Sequelize(dbName, dbUser, dbPassword, {
    host: dbHost,
    port: dbPort,
    dialect: 'mysql',
    logging: false,
});

export default sequelize;
