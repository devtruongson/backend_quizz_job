import cors from 'cors';
import 'dotenv/config';
import { Application } from 'express';

export default function configCors(app: Application) {
    const corsOption = {
        origin: ['front_end_url'],
        credentials: true,
    };

    app.use(cors(corsOption));
}
