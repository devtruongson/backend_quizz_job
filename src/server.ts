import 'dotenv/config';
import express, { Application } from 'express';
import configComperssion from './configs/compression.config';
import configCors from './configs/cors.config';
import sequelize from './configs/db.config';
import configRequest from './configs/req.config';
import initModels from './models';
import apiRouter from './routes';
import bodyParser from 'body-parser';

const app: Application = express();
const PORT: number = parseInt(process.env.PORT || '8080');

app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));

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
            console.log('App Start & Connected To Database Successfully With Port: ' + PORT);
        });
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
}

start();
