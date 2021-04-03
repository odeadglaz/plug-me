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

const getPluginPath = (plugin: string) => [
    process.cwd(),
    'dist',
    'plugins',
    `${plugin}.latest.js`
].join('/');

export const handler = (req: Request, res: Response) => {
    const { plugin } = req.query;
    if (typeof plugin !== 'string') {
        res.status(400).send()
        return;
    }

    console.log('Running on ', plugin);

    const path = getPluginPath(plugin);

    const metaData = {
        'Content-Type': 'application/octet-stream'
    }

    minioClient.fPutObject('plugins', `${plugin}.js`, path, metaData, function(err, info) {
        if (err) {
            res
                .status(500)
                .send(err.message);

            return console.log(err)
        }

        res
            .status(200)
            .send('Alright mate')
    });
};
