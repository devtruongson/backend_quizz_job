import 'dotenv/config';
import express, { Application } from 'express';

const app: Application = express();
const PORT: number = parseInt(process.env.PORT || '8080');

app.listen(PORT, () => {
    console.log('App Start Successfully With Port: ' + PORT);
});
