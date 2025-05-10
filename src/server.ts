import 'dotenv/config';
import express, { Application } from 'express';
import configComperssion from './configs/compression.config';
import configCors from './configs/cors.config';
import configRequest from './configs/req.config';

const app: Application = express();
const PORT: number = parseInt(process.env.PORT || '8080');

// load configs
configComperssion(app);
configCors(app);
configRequest(app);

// router

app.listen(PORT, () => {
    console.log('App Start Successfully With Port: ' + PORT);
});
