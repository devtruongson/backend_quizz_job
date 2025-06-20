import { HttpStatusCode } from 'axios';
import 'dotenv/config';
import { Application, Request, Response, Router } from 'express';
import fs from 'fs';
import path from 'path';
import { uploadMulter } from '~/middlewares/muiter';

const route = Router();

export default function initialUploadRoute(app: Application) {
    route.post('/single', uploadMulter.single('file'), (req: Request, res: Response) => {
        if (!req.file) {
            res.status(HttpStatusCode.BadRequest).json("File is required");
        } else {
            res.status(HttpStatusCode.Ok).json(`http://localhost:${process.env.PORT}/api/upload/file/${req.file.filename}`);
        }
    });

    route.post('/pdf/single', uploadMulter.single('file'), (req: Request, res: Response) => {
        if (!req.file) {
            res.status(HttpStatusCode.BadRequest).json("File is required");
        } else {
            res.status(HttpStatusCode.Ok).json(`http://localhost:${process.env.PORT}/api/upload/pdf/file/${req.file.filename}`);
        }
    });

    route.get('/file/:filename', (req: Request, res: Response) => {
        const { filename } = req.params;
        const filePath = path.join(__dirname, '../upload', filename);
        if (!fs.existsSync(filePath)) {
            res.status(HttpStatusCode.NotFound).json("File not found");
        } else {
            res.sendFile(filePath);
        }
    });

    route.get('/pdf/file/:filename', (req: Request, res: Response) => {
        const { filename } = req.params;
        const filePath = path.join(__dirname, '../upload', filename);

        if (!fs.existsSync(filePath)) {
            res.status(404).json("File not found");
            return;
        }

        res.setHeader('Content-Type', 'application/pdf');
        res.setHeader('Content-Disposition', `inline; filename="${filename}"`);

        const fileStream = fs.createReadStream(filePath);
        fileStream.pipe(res);
    });

    app.use('/api/upload', route);
}
