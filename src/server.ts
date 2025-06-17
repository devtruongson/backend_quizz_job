import 'dotenv/config';
import express, { Application } from 'express';
import configComperssion from './configs/compression.config';
import configCors from './configs/cors.config';
import configRequest from './configs/req.config';
import sequelize from './configs/db.config';
import initModels from './models';
import apiRouter from './routes';

const app: Application = express();
const PORT: number = parseInt(process.env.PORT || '8080');

// load configs
configComperssion(app);
configCors(app);
configRequest(app);

initModels();

app.use('/api', apiRouter);

async function start() {
    try {
        await sequelize.authenticate();
        await sequelize.sync();
        app.listen(PORT, () => {
            console.log('App Start Successfully With Port: ' + PORT);
        });
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
}

start();
