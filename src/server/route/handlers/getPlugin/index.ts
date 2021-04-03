import fs from 'fs';
import {
    Request,
    Response
} from 'express';
import * as Minio from 'minio';

const minioClient = new Minio.Client({
    endPoint: '192.168.1.26',
    port: 9000,
    accessKey: 'minio-admin',
    useSSL: false,
    secretKey: 'minio-secret-key-CHANGE-ME'
});


export const handler = (req: Request, res: Response) => {
    const { plugin } = req.query;
    if (typeof plugin !== 'string') {
        res.status(400).send()
        return;
    }

    console.log('Running on ', plugin);

    minioClient.fGetObject('plugins', `${plugin}.js`, `./plugins-download/${plugin}.js`, function(err) {
        if (err) {
            res
                .status(500)
                .send(err.message);

            return console.log(err)
        }

        const file = fs.readFileSync(`./plugins-download/${plugin}.js`, 'utf-8');

        return res
            .type('js')
            .status(200)
            .send(file)
    });
};
